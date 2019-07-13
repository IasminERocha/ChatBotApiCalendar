const moment = require('moment')
require("moment/min/locales.min")

moment.updateLocale('pt-BR')

const _userModelSchema = {
  name: {
    type: String
  },
  phone: {
    type: String
  },
  people: {
    type: Number
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  type: {
    type: String
  },
  createdAt: {
    type: Date
  }
}


class CalendarModel {
  constructor(db) {
    this.db = db
    this.schema = new db.Schema(_userModelSchema, {
      timestamps: true
    })
    try {
      this.model = db.model('calendar')
    } catch (err) {
      this.model = db.model('calendar', this.schema)
    }
  }

  create(props) {
    if (!props) {
      props = {}
    }
    return this.model.create(props)
  }

  update(id, props) {
    return this.model.updateOne({ _id: id }, props, { updateTimestamps: true })
  }

  async find(params) {
    const res = await this.model.find({ params })
    return Promise.resolve(res)
  }


}

module.exports = CalendarModel