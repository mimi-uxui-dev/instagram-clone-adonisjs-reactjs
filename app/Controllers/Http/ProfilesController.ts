import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

export default class ProfilesController {
    public async index({ view, params, auth} : HttpContextContract){
        const username = params.username
        const user = await User.findBy('username', username)

        // this will create 10 users with 5 posts each
        // await UserFactory.with('posts', 5).createMany(10)

        if(!user){
            return view.render('errors.not-found.edge')
        }
        
        await user.preload('posts')
        await auth.user.preload('followings')
        // return auth.user

        const followers = await auth.user?.followers()

        return view.render('profile', {user, followers})
    }

    public async edit({ view} : HttpContextContract){
        return view.render('account.edit')
    }

    public async update({auth, request, response } : HttpContextContract){
        const user = auth.user

        const avatar = request.file('avatar')

        if(avatar){
            const imageName = new Date().getTime().toString() + `.${avatar.extname}`
    
            await avatar.move(Application.publicPath('images'), {
                name : imageName,
            })
    
            user.avatar = `images/${imageName}`
        }
        
        user.bio = request.input('bio')

        await user?.save()

        return response.redirect(`/${user?.username}`)
        
    }
}