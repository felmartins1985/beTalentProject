import type { HttpContext } from '@adonisjs/core/http'
import Sale from '#models/sale'
import { newSaleValidator } from '../validators/sale.js'
export default class SalesController {
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(newSaleValidator)
      const total = data.quantity * data.unit_price
      const sale = await Sale.create({ ...data, total })
      response.status(201)
      return response.json({ message: 'Success sale', data: sale })
    } catch (error) {
      response.status(500)
      return response.json({ message: error.message })
    }
  }
}
