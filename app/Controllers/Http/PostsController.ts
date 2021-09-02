import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class PostsController {
  public async index({ }: HttpContextContract) {
  }

  public async create({ view }: HttpContextContract) {
    return view.render('posts/create')
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        image: schema.file({
          size: '2mb',
          extnames: ['jpg', 'png', 'jpeg']
        })
      }),
      messages: {
        "image.required": "Image is required to sign up",
      },
    });

    const image = req.image
    const post = new Post()

    post.userId = auth.user.id
    post.caption = req.caption

    const imageName = new Date().getTime().toString() + `.${req.image?.extname}`

    await image?.move(Application.publicPath('images'), {
      name: imageName,
    })

    post.image = `images/${imageName}`
    post.save()

    return response.redirect(`/${auth.user?.username}`)
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
