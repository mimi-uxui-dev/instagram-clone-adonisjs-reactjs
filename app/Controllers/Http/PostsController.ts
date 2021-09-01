import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({ }: HttpContextContract) {
  }

  public async create({ view }: HttpContextContract) {
    return view.render('posts/create')
  }

  public async store({ auth, request,response }: HttpContextContract) {
    const image = request.file('image')

    if (image) {
      const imageName = new Date().getTime().toString() + `.${image?.extname}`

      await image?.move(Application.publicPath('images'), {
        name: imageName,
      })

      const post = new Post()

      post.image = `images/${imageName}`
      post.caption = request.input('caption')
      post.user_id = auth.user.id

      post.save()
      
      return response.redirect(`/${auth.user?.username}`)
    }


  }

  public async show({ }: HttpContextContract) {
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
