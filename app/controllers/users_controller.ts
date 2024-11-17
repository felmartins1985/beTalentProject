import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  async store({ request, response }: HttpContext) {
    const data = request.only(['username', 'email', 'password'])

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
