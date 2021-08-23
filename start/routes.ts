import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.on('/signup').render('auth/signup')
Route.on('/login').render('auth/login')
Route.post('/signup', 'AuthsController.signup')
Route.post('/login', 'AuthsController.login')