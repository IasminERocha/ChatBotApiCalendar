const Dotenv = require('dotenv').config({ path: '.env' })
const express = require('express')
const server = express()
const helmet = require('helmet');
const compression = require('compression')
const bodyParser = require('body-parser')

const db = require('./database/service')
const dbConnection = process.env.DB_MONGO
const RouterService = require('./router/service')

console.log(dbConnection)
//Server 
server.use(helmet())
server.use(compression())
server.use(bodyParser.json({ limit: '10mb', extended: true }))
server.use(bodyParser.urlencoded({ extended: true }))
server.all('*', function (req, res, next) {

  const responseSettings = {
    "AccessControlAllowOrigin": req.headers.origin,
    "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
    "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
    "AccessControlAllowCredentials": true
  }

  res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials)
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token")
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  res.header()
  next()

})


const start = async () => {
  try {
    const dbConn = await db.connect(dbConnection, { useNewUrlParser: true })
    new RouterService(server, dbConn).listen()

  } catch (err) {
    console.log(err)
  }
}

start()