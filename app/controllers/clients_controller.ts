import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import { newClientValidator, updateClient } from '../validators/client.js'

export default class ClientsController {
  async index({ response }: HttpContext) {
    try {
      const clients = await Client.query().orderBy('id', 'asc')
      response.status(200)
      return response.json(clients)
    } catch (err) {
      response.status(500)
      return response.json({ message: err })
    }
  }
  async show({ params, request, response }: HttpContext) {
    try {
      const clientId = params.id
      if (!clientId) {
        response.status(404)
        return response.json({ message: 'Client not exists' })
      }
      const { month, year } = request.qs()
      const salesClients = await Client.query()
        .where('id', clientId)
        .preload('Addresses')
        .preload('Telephones')
        .preload('Sales', (query) => {
          query.orderBy('saled_at', 'desc')
          if (month && year) {
            query.whereRaw(
              `extract(month from saled_at) = ${month} and extract(year from saled_at) = ${year}`
            )
          }
        })
      response.status(200)
      return response.json(salesClients)
    } catch (err) {
      response.status(500)
      return response.json({ message: err })
    }
  }
  async store({ request, response }: HttpContext) {
    const transaction = await db.transaction()
    try {
      const body = await request.validateUsing(newClientValidator)
      const findByCPF = await Client.findBy('cpf', body.cpf)
      if (findByCPF) {
        response.status(400)
        return response.json({ message: 'CPF already exists' })
      }
      const client = await Client.create(
        {
          name: body.name,
          cpf: body.cpf,
        },
        { client: transaction }
      )
      const telephone = await transaction.insertQuery().table('telephones').insert({
        number: body.telephone,
        client_id: client.id,
        created_at: DateTime.now().toISO(),
        updated_at: DateTime.now().toISO(),
      })
      const address = await transaction
        .insertQuery()
        .table('addresses')
        .insert({
          ...body.address,
          client_id: client.id,
          created_at: DateTime.now().toISO(),
          updated_at: DateTime.now().toISO(),
        })
      await transaction.commit()
      response.status(201)
      return response.json({ message: 'Client created', client, telephone, address })
    } catch (err) {
      await transaction.rollback()
      response.status(500)
      return response.json({ message: err })
    }
  }
  async update({ params, request, response }: HttpContext) {
    const transaction = await db.transaction()
    try {
      const body = await request.validateUsing(updateClient)
      const client = await Client.findOrFail(params.id)
      if (!client) {
        response.status(400)
        return response.json({ message: 'Client not exists' })
      }
      await transaction
        .from('addresses')
        .where('client_id', client.id)
        .update({ ...body.address, updated_at: DateTime.now().toISO() })
      await transaction.from('telephones').where('client_id', client.id).update({
        number: body.telephone,
        updated_at: DateTime.now().toISO(),
      })
      await transaction.commit()
      response.status(200)
      return response.json({ message: 'Client updated' })
    } catch (err) {
      await transaction.rollback()
      response.status(500)
      return response.json({ message: err })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      await Client.query().where('id', params.id).delete()
      response.status(204)
      return response.json({ message: 'Client deleted' })
    } catch (err) {
      response.status(500)
      return response.json({ message: err })
    }
  }
}
