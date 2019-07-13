const CalendarModel = require('./model')
const moment = require('moment')
class CalendarService {
  constructor(dbConn) {
    this.model = new CalendarModel(dbConn)
  }

  async createCustomer(params) {
    try {
      var event = {
        name: params.name,
        phone: params.phone,
        startDate: params.startDate,
        endDate: params.endDate,
        people: params.people,
        type: params.type
      }
      const response = await this.model.create(event)
      return Promise.resolve(response)

    }
    catch (err) {
      return Promise.reject(err)
    }
  }
}

module.exports = CalendarService