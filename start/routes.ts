import Route from '@ioc:Adonis/Core/Route'

// HOME
Route.on('/').render('welcome')

// SignUp
Route.on('/signup').render('auth/signup').middleware('guest')
Route.post('/signup', 'AuthsController.signup')

// Login
Route.on('/login').render('auth/login').middleware('guest')
Route.post('/login', 'AuthsController.login')

// Logout
Route.post('/logout', 'AuthsController.logout')

// Email Verificatio
Route.post('/verify-email','EmailVerificationsController.index').middleware('auth') 
Route.get('/verify-email/:email','EmailVerificationsController.store').as('verifyEmail')

// POST 
Route.get('/posts/create', 'PostsController.create').middleware('auth')
Route.post('/posts/create', 'PostsController.store').middleware('auth')

// User Profile
Route.get('/account/edit', 'ProfilesController.edit').middleware('auth')
Route.post('/account/edit', 'ProfilesController.update').middleware('auth')
Route.get('/:username', 'ProfilesController.index').middleware('auth') // this is a dynamic route, it should be last