const express = require('express')
const CalendarService = require('../calendar/service')
const EmailService = require('../email')
class CustomerRouter {
  constructor(server, routeName, dbConn) {
    this.routeName = routeName
    this.server = server
    this.router = express.Router()
    this.dbConn = dbConn

  }

  async create(req, res) {
    let response = {
      error: false,
      message: "Criado com sucesso!",
      data: {}
    }

    if (!req.body) {
      res.status(400)
      response.message = "Favor enviar os parâmetros (Nome, telefone)!"
      response.error = true
    }
    else if (!req.body.name) {
      res.status(400)
      response.message = "Favor preencher o campo nome!"
      response.error = true
    }
    else if (!req.body.phone) {
      res.status(400)
      response.message = "Favor informar o telefone!"
      response.error = true
    }
    else if (!req.body.startDate) {
      res.status(400)
      response.message = "Favor preencher a data do inicio da reserva"
      response.error = true
    }
    else {
      const calendarService = new CalendarService(this.dbConn)
      try {
        const data = await calendarService.createCustomer(req.body)
        response.data = data
        new EmailService(data.phone, data.name, data.startDate, data.endDate, data.type, data.people).sendMail()
      }
      catch (err) {
        console.log(`Opss!! Something went wrong --> ${err}`)
        res.status(500)
        response.message = "Oppss!! Ocorreu um erro, tente novamente.."
        response.error = true
      }
    }
    return res.send(response)
  }

  build() {
    this.router.post('/create', this.create.bind(this))
    this.server.use(this.routeName, this.router)
  }
}

module.exports = CustomerRouter