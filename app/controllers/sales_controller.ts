import type { HttpContext } from '@adonisjs/core/http'
import Sale from '#models/sale'
import { newSaleValidator } from '../validators/sale.js'
import Client from '#models/client'
import Product from '#models/product'

export default class SalesController {
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(newSaleValidator)
      const client = await Client.findBy('id', data.clientId)
      if (!client) {
        response.status(400)
        return response.json({ message: 'Client does not exist' })
      }
      const product = await Product.findBy('id', data.productId)
      if (!product) {
        response.status(400)
        return response.json({ message: 'Product does not exist' })
      }
      const unitPrice = product.$getAttribute('price')
      const total = (data.quantity * unitPrice).toFixed(2)
      const sale = await Sale.create({
        ...data,
        unit_price: unitPrice,
        total: Number.parseFloat(total),
      })
      response.status(201)
      return response.json({ message: 'Success sale', data: sale })
    } catch (error) {
      response.status(500)
      return response.json({ message: error.message })
    }
  }
}
