import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class ProfilesController {
    public async index({ view, params} : HttpContextContract){
        const username = params.username
        const user = await User.findBy('username', username)

        if(!user){
            return view.render('errors.not-found.edge')
        }

        return view.render('profile')
        
    }
}
