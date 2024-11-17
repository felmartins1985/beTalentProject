import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import BadRequestException from '#exceptions/bad_request_exception'

export default class UsersController {
  async store({ request, response }: HttpContext) {
    const data = request.only(['username', 'email', 'password'])
    const userByEmail = await User.findBy('email', data.email)
    if (userByEmail) {
      throw new BadRequestException('Email already exists', { status: 400 })
    }
    data.password = await hash.make(data.password)

    const user = await User.create(data)
    response.status(200)
    return {
      message: 'Success',
      data: {
        username: user.username,
        email: user.email,
      },
    }
  }
}
