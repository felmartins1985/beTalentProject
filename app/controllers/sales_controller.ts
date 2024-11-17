import type { HttpContext } from '@adonisjs/core/http'
import Sale from '#models/sale'
import { newSaleValidator } from '../validators/sale.js'
export default class SalesController {
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(newSaleValidator)
    const totalPrice = data.productId * data.unitPrice
    const sale = await Sale.create({ ...data, totalPrice })
    response.status(201)
    return response.json({ message: 'Success sale', data: sale })
  }
}
