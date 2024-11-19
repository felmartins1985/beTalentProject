import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['username', 'email', 'password'])
      const userByEmail = await User.findBy('email', data.email)
      if (userByEmail) {
        response.status(404)
        return response.json({ message: 'Email already exists' })
      }
      data.password = await hash.make(data.password)

      const user = await User.create(data)
      response.status(201)
      return {
        message: 'Success',
        data: {
          username: user.username,
          email: user.email,
        },
      }
    } catch (error) {
      response.status(500).json({ message: error.message })
    }
  }
}
