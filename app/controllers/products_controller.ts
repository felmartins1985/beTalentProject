import type { HttpContext } from '@adonisjs/core/http'
import { newProductValidator, updateProductValidator } from '../validators/product.js'
import Product from '#models/product'
import BadRequestException from '#exceptions/bad_request_exception'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const products = await Product.query()
      .select('name', 'price', 'description')
      .orderBy('name', 'asc')

    response.status(200)
    return response.json({ data: products })
  }
  async show({ request, response }: HttpContext) {
    const { id } = request.params()
    const product = await Product.findOrFail(id)
    if (!product) {
      response.status(401)
      return response.json({ message: 'Product not found' })
    }
    response.status(200)
    return response.json({ data: product })
  }
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(newProductValidator)
    const findProduct = await Product.findBy('name', data.name)
    if (findProduct) {
      throw new BadRequestException('Product already exists', { status: 400 })
    }
    const product = await Product.create(data)
    response.status(201)
    return response.json({ message: 'Success', data: product })
  }
  async update({ request, response }: HttpContext) {
    const { id } = request.params()
    const data = await request.validateUsing(updateProductValidator)
    const product = await Product.findOrFail(id)
    product.merge(data)
    await product.save()
    response.status(200)
    return response.json({ message: 'Success update', data: product })
  }
  async destroy({ request, response }: HttpContext) {
    const { id } = request.params()
    const product = await Product.findOrFail(id)
    await product.delete()
    response.status(200)
    return response.json({ message: 'Success delete' })
  }
}
