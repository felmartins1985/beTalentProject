import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Telephone from './telephone.js'
import Address from './address.js'
import Sale from './sale.js'
export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare cpf: number

  @hasMany(() => Telephone)
  declare Telephones: HasMany<typeof Telephone>
  @hasMany(() => Address)
  declare Addresses: HasMany<typeof Address>
  @hasMany(() => Sale)
  declare Sales: HasMany<typeof Sale>
}
