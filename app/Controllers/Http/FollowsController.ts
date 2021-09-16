import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Following from 'App/Models/Following'

export default class FollowsController {
    public async store({params, response, auth} : HttpContextContract){
        // store follow user id with auth user id

        const follow = new Following
        follow.userId = auth.user?.id
        follow.followingId = params.userId
        await follow.save()

        return response.redirect().back()
    }

}
