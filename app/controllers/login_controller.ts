import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class LoginController {
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.all()

    const findUser = await User.findBy('email', email)
    if (!findUser) {
      response.status(401)
      return response.json({ message: 'Invalid User' })
    }
    const verifyPassword = await hash.verify(findUser.password, password)
    if (!verifyPassword) {
      response.status(401)
      return response.json({ message: 'Invalid Password' })
    }
    return await auth.use('jwt').generate(findUser)
  }
}
