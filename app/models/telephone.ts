import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Client from './client.js'
export default class Telephone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare number: string

  @column()
  declare clientId: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>
}
