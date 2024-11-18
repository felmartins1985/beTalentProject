import type { HttpContext } from '@adonisjs/core/http'
import { newProductValidator, updateProductValidator } from '../validators/product.js'
import Product from '#models/product'
import BadRequestException from '#exceptions/bad_request_exception'

export default class ProductsController {
  async index({ response }: HttpContext) {
    try {
      const products = await Product.query()
        .select('name', 'price', 'description')
        .orderBy('name', 'asc')

      response.status(200)
      return response.json({ data: products })
    } catch (err) {
      response.status(500)
      return response.json({ message: err })
    }
  }
  async show({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const product = await Product.findOrFail(id)
      if (!product) {
        throw new BadRequestException('Product not exists', { status: 404 })
      }
      response.status(200)
      return response.json({ data: product })
    } catch (err) {
      response.status(500)
      return response.json({ message: err })
    }
  }
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(newProductValidator)
      const findProduct = await Product.findBy('name', data.name)
      if (findProduct) {
        throw new BadRequestException('Product already exists', { status: 400 })
      }
      const product = await Product.create(data)
      response.status(201)
      return response.json({ message: 'Success', data: product })
    } catch (err) {
      response.status(500)
      return response.json({ message: err })
    }
  }
  async update({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const data = await request.validateUsing(updateProductValidator)
      const product = await Product.findOrFail(id)
      if (!product) {
        throw new BadRequestException('Product not exists', { status: 404 })
      }
      product.merge(data)
      await product.save()
      response.status(200)
      return response.json({ message: 'Success update', data: product })
    } catch (err) {
      response.status(500)
      return response.json({ message: err })
    }
  }
  async destroy({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const product = await Product.findOrFail(id)
      if (!product) {
        throw new BadRequestException('Product not exists', { status: 404 })
      }
      await product.delete()
      response.status(200)
      return response.json({ message: 'Success delete' })
    } catch (err) {
      response.status(500)
      return response.json({ message: err })
    }
  }
}
