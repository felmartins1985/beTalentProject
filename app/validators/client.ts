import vine from '@vinejs/vine'

export const newClientValidator = vine.compile(
  // compile serve para criar um metodo
  vine.object({
    name: vine.string().minLength(3),
    cpf: vine.number().min(11).max(11),
    telephone: vine.number().min(9),
    address: vine.object({
      street: vine.string().minLength(3),
      number: vine.number().min(1),
      city: vine.string().minLength(3),
      state: vine.string().minLength(2).maxLength(2),
      postal_code: vine.number().min(8).max(8),
      country: vine.string(),
    }),
  })
)

export const updateClient = vine.compile(
  vine.object({
    telephone: vine.number().min(9).optional(),
    address: vine.object({
      street: vine.string().minLength(3).optional(),
      number: vine.number().min(1).optional(),
      city: vine.string().minLength(3).optional(),
      state: vine.string().minLength(2).maxLength(2).optional(),
      postal_code: vine.number().min(8).max(8).optional(),
      country: vine.string().optional(),
    }),
  })
)