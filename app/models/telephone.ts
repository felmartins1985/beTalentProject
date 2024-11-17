import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Telephone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare number: number

  @column()
  declare clientId: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
