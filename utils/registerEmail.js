const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
})

const registerMail = async (email, name) => {
  transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Account created',
    html: `
      <div>
        <h3>Hi ${name}, You have successfully registered on Tunde Mobile</h3>
        <p>We've got you covered</p>
        <p>We are pleased to have you on our platform</p>
        <p>Enjoy amazing experience!</p>
      </div>
    `,
  })
}

module.exports = registerMail
