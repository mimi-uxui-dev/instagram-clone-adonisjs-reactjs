import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('welcome')

Route.on('/signup').render('auth/signup')
Route.on('/login').render('auth/login')
Route.on('/profile').render('profile').middleware('auth')

Route.post('/signup', 'AuthsController.signup')
Route.post('/login', 'AuthsController.login')
Route.post('/logout', 'AuthsController.logout')