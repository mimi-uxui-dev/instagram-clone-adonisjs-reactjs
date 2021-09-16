import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Post extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public caption: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(()=> User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
