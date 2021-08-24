import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('welcome')

Route.on('/signup').render('auth/signup')
Route.post('/signup', 'AuthsController.signup')

Route.on('/login').render('auth/login')
Route.post('/login', 'AuthsController.login')

Route.on('/profile').render('profile').middleware('auth')

Route.post('/logout', 'AuthsController.logout')

Route.post('/verify-email','EmailVerificationsController.index').middleware('auth') 
Route.get('/verify-email/:email','EmailVerificationsController.store').as('verifyEmail')