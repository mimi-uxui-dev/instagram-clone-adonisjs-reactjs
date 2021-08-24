import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Mail from '@ioc:Adonis/Addons/Mail'


export default class AuthsController {
    public async signup({ request, response }: HttpContextContract) {

        const req = await request.validate({
            schema: schema.create({
                name: schema.string(),
                email: schema.string({}, [rules.email()]),
                password: schema.string({}),
            }),
            messages: {
                "name.required": "Name is required to sign up",
                "email.required": "Email is required to sign up",
                "password.required": "Password is required to sign up",
            },
        });

        // Create & save the user to DB
        const user = new User();
        
        user.name = req.name
        user.email = req.email
        user.password = req.password
        
        await user.save()
        
        // Send verification email
        user?.sendVerificationEmail()

        return response.redirect('/')

    }

    public async login({ request, response, auth }: HttpContextContract) {
        const req = await request.validate({
            schema: schema.create({
                email: schema.string({}, [rules.email()]),
                password: schema.string({}, [rules.minLength(8)]),
            }),
            messages: {
                "email.required": "Email is required to sign up",
                "password.required": "Password is required to sign up",
                "password.minLength": "Password must be atleast 8 cara",
            },
        })

        // const user = await User.findByOrFail('email', req.email)

        const email = req.email
        const password = req.password

        await auth.attempt(email, password)

        return response.redirect('/profile')
    }

    public async logout( {auth, response} : HttpContextContract ) {
        await auth.use('web').logout()
        response.redirect('/login')
    }
}