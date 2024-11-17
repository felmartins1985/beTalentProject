import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeDelete,
  column,
  hasMany,
  beforeFind,
  beforeFetch,
} from '@adonisjs/lucid/orm'
import Sale from './sale.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime
  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>

  @beforeDelete()
  static async productDeleted(product: Product) {
    product.deletedAt = DateTime.now()
    await product.save()
  }
  @beforeFind()
  @beforeFetch()
  static notShowProductDeleted(search: ModelQueryBuilderContract<typeof Product>) {
    search.whereNull('deleted_at')
  }
}
