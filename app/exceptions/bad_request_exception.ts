import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
export default class BadRequestException extends Exception {
  code = 'BAD_REQUEST'
  async handle(error: this, ctx: HttpContext) {
    return ctx.response
      .status(error.status)
      .send({ code: error.code, message: error.message, status: error.status })
  }
}
