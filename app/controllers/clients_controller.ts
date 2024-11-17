import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import { newClientValidator, updateClient } from '../validators/client.js'
import BadRequestException from '#exceptions/bad_request_exception'
export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.query().orderBy('id', 'asc')
    response.status(200)
    return response.json(clients)
  }
  async show({ params, request, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    if (!client) {
      response.status(401)
      return response.json({ message: 'Client not found' })
    }
    const { month, year } = request.qs()
    const salesClients = await Client.query()
      .where('id', client.id)
      .preload('Addresses')
      .preload('Telephones')
      .preload('Sales', (query) => {
        query.orderBy('created_at', 'asc')
        if (month && year) {
          query.whereRaw(
            `extract(month from created_at) = ${month} and extract(year from created_at) = ${year}`
          )
        }
      })
    response.status(200)
    return response.json(salesClients)
  }
  async store({ request, response }: HttpContext) {
    const transaction = await db.transaction()
    try {
      const body = await request.validateUsing(newClientValidator)
      const findByCPF = await Client.findBy('cpf', body.cpf)
      if (findByCPF) {
        throw new BadRequestException('CPF already exists', { status: 400 })
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
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      })
      const address = await transaction
        .insertQuery()
        .table('addresses')
        .insert({
          ...body.address,
          client_id: client.id,
          created_at: DateTime.now(),
          updated_at: DateTime.now(),
        })
      await transaction.commit()
      response.status(201)
      return response.json({ client, telephone, address })
    } catch (err) {
      await transaction.rollback()
      response.status(400)
      return response.json({ message: err.message })
    }
  }
  async update({ params, request, response }: HttpContext) {
    const transaction = await db.transaction()
    try {
      const body = await request.validateUsing(updateClient)
      const client = await Client.findOrFail(params.id)
      await transaction
        .from('addresses')
        .where('client_id', client.id)
        .update({ ...body.address, update_at: DateTime.now() })
      await transaction.from('telephones').where('client_id', client.id).update({
        number: body.telephone,
        updated_at: DateTime.now(),
      })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      response.status(400)
      return response.json({ message: err.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      await Client.query().where('client_id', params.id).delete()
      response.status(204)
      return response.json({ message: 'Client deleted' })
    } catch (err) {
      response.status(400)
      return response.json({ message: err.message })
    }
  }
}
