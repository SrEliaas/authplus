'use strict'

const Account = use('App/Models/Account')
const mojang = require('mojang')

class AccountController {

    async create({ request, response, session }) {
        const { email, password } = request.all()

        const mLogin = await mojang.authenticate(email, password)

        if (!mLogin) {
            session.flash({ addedError: 'NOT WAS POSSIBLE ADD THE ALT' })
        } else {
            await Account.create(email, password)
            session.flash({ addedSuccess: 'ALT ADDED!' })
        }

        return response.redirect('back')
    }

}

module.exports = AccountController
