'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')



// USER ROUTES
Route.on('/').render('index')


// ADMIN ROUTES
Route.on('/admin').render('admin')
Route.post('/admin', 'UserController.token')

Route.on('/admin/pass').render('admin_pass')
Route.post('/admin/pass', 'UserController.authenticate')

Route.on('/dashboard').render('auth.dashboard').middleware(['auth'])

// ALTS - ADMIN
Route.post('/add/minecraft/alt', 'AccountController.create').middleware(['auth'])

Route.get('/logout', async ({ auth, response }) => {
    await auth.logout()
    return response.redirect('/')
})


