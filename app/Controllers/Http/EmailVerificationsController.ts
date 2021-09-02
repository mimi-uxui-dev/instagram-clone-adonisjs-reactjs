import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class EmailVerificationsController {
    public async index({response, auth} : HttpContextContract){
        auth.user?.sendVerificationEmail()
        return response.redirect().back()
    }

    public async store({response,params, request}: HttpContextContract){
       if(request.hasValidSignature()){
            const user = await User.findByOrFail('email', params.email)
            user.email_varified_at = DateTime.local()
            user.save()
            return response.redirect(`/${user.username}`)
       }else {
           return 'Invalid Token'
       }
    }
}