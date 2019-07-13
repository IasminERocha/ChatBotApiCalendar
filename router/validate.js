const express = require('express')
const moment = require('moment')

class Validate {
    constructor(server, routeName) {
        this.routeName = routeName
        this.server = server
        this.router = express.Router()
    }

    async validatePhone(req, res) {

        var isValid = true
        var phoneRegex = /^\d{11}$/

        if (req.params.phone.match(phoneRegex)) {
            isValid = true
        }
        else {
            isValid = false
        }

        return res.send(isValid)
    }

    async validateDate(req, res) {

        let response = {
            error: false,
            message: "Data inserida com sucesso!",
            data: {}
        }

        var today = moment()
        var date = moment(req.params.date, 'DD-MM-YYYY')

        if (date.diff(today) > 1) {
            response.error = true
            response.message = 'Selecione uma data com prazo de um dia a mais do que a de hoje'
        }
        return res.send(response)
    }

    build() {
        this.router.get('/phone/:phone', this.validatePhone.bind(this))
        this.router.get('/date/:date', this.validateDate.bind(this))
        this.server.use(this.routeName, this.router)
    }
}

module.exports = Validate