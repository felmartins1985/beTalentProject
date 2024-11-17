import User from '#models/user'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// >VERIFICAR SOBRE O TOKEN<
import hash from '@adonisjs/core/services/hash'

export default class LoginController {
  async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()

    const findUser = await User.findBy('email', email)
    if (!findUser) {
      response.status(401)
      return response.json({ message: 'Invalid User' })
    }
    const verifyPassword = await hash.verify(findUser.password, password)
    if (!verifyPassword) {
      response.status(401)
      return {
        message: 'Invalid credentials',
      }
    }

    // Gera o token JWT
    const token = await auth.use('jwt').generate(findUser)

    // Retorna o token
    return {
      message: 'Login successful',
      token,
    }
  }
}
