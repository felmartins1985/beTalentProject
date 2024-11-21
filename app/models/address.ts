import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Client from './client.js'
export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare clientId: number
  @column()
  declare street: string
  @column()
  declare city: string
  @column()
  declare state: string
  @column()
  declare postal: string
  @column()
  declare country: string

  @belongsTo(() => Client)
  declare Client: BelongsTo<typeof Client>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
