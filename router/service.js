

//Services
const Calendar = require('../router/calendar')
const Validate = require('../router/validate')

class RouterService {
  constructor(server, dbConn) {
    this._server = server
    this.dbConn = dbConn
  }

  run() {
    new Calendar(this._server, '/calendar', this.dbConn).build()
    new Validate(this._server, '/validate').build()
  }

  listen() {
    this.run()
    this._server.listen(process.env.PORT, function () {
      console.log(`Listen at http://localhost:${process.env.PORT}`)
    })
  }

}

module.exports = RouterService