import vine from '@vinejs/vine'

export const newProductValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    description: vine.string().minLength(3),
    price: vine.number().min(0),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).optional(),
    description: vine.string().minLength(3).optional(),
    price: vine.number().min(0).optional(),
  })
)
