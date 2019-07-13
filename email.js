const nodemailer = require('nodemailer')
const moment = require('moment')
class SendEmail {

  constructor(phone, name, startDate, endDate, type, people) {
    this._phone = phone,
      this._name = name,
      this._startDate = startDate,
      this._endDate = endDate,
      this._type = type,
      this._people = people
  }


  sendMail() {
    const now = moment().format('DD/MM/YYYY hh:mm:ss')
    this.transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
      },
    })
    this.mailOption = {
      from: 'iasminevellyngrocha@gmail.com',
      to: 'iasminevellyngrocha@gmail.com',
      subject: `${this._type} Recanto Quero-Quero ${now} `,
      html: `<h1>Temos um(a) solicitação de ${this._type}</h1>
      <p><b>Nome:</b>${this._name}</p>
        <p><b>Telefone: </b> ${this._phone}</p>
        <p><b>Quantidade de pessoas: </b> ${this._people}</p>
        <p><b>Data: </b> ${this._startDate} até ${this._endDate || this._startDate}</p>`
    }

    this.transporter.sendMail(this.mailOption, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email enviado: ' + info.response)
      }
    })

  }
}

module.exports = SendEmail


