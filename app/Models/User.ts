import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, beforeSave, hasMany, HasMany, Has } from '@ioc:Adonis/Lucid/Orm'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import Post from './Post'
import Following from './Following'

export default class User extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public username: string

  @column()
  public bio: string

  @column()
  public avatar: string

  @column.dateTime()
  public email_varified_at: DateTime

  @column()
  public password: string
    user: Date

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @hasMany(() => Following)
  public followings: HasMany<typeof Following>

  public async followers(){
    const followers = await Following.query().where('following_id', this.id)
    return followers.length
  }


  @beforeSave()
  public static async hashPassword(user: User) {
    if(user.$dirty.password){
      user.password = await Hash.make(user.password)
    }
  }

  public async sendVerificationEmail(){
    const url = Env.get('APP_URL') + Route.makeSignedUrl('verifyEmail', {params: { email: this.email, expiresIn: "30m" }})

    await Mail.send((message) => {
      message
        .from('verify@instagramclone.come')
        .to(this.email)
        .subject('Verify your email')
        .htmlView('emails/verify', { user : this, url })
    })
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
}