import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Product from './product.js'
import Client from './client.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare clientId: number

  @column()
  declare productId: number

  @column()
  declare quantity: number

  @column()
  declare unit_price: number
  @column()
  declare total: number
  @column.dateTime({ autoCreate: true })
  declare saledAt: DateTime

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
