'use strict'

const User = use('App/Models/User')
const randomString = require('randomstring')
const nodemailer = require("nodemailer");

async function sendMail(from, to, subject, html) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'sailemundo2@gmail.com',
            pass: 'elias123abqj6768'
        }
    })

    await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    })
}

class UserController {
    

   async token({ response }) {
        const token = randomString.generate(20)
        const user = await User.findBy('email', 'sreliaas@gmail.com')
        if (user) {
            user.password = token
            user.save()
            sendMail("freePLUS, '<noreply@freeplus.com>'", user.email, '✔ Sua senha admin ✔', '<b>' + token + '</b>')
        }

        return response.redirect('admin/pass')
   }

   async authenticate({ request, response, auth, session }) {
        try {
            const { token } = request.all()
            await auth.attempt('sreliaas@gmail.com', token)

            return response.redirect('/dashboard')
        } catch (error) {
            session.flash({ loginError: 'Bro WTF ? Invalid token!'})
            return response.redirect('back')
        }
   }

}

module.exports = UserController
