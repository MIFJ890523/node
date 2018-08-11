'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require("fs")
var server = require('http').createServer(app)

const LOGGER = require("./config/Logger").Logger

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const routerApi = express.Router()

app.use("/"+process.env.APP+"/api", routerApi)

routerApi.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

    // decode token
    if (req.method !== "OPTIONS") {
      next() // make sure we go to the next routes and don't stop here
    } else {
    	next() // make sure we go to the next routes and don"t stop here
    }
})

fs.readdirSync(path.join(__dirname, '.', "routes/Authentication/")).forEach(function(file) {
	require("./routes/Authentication/" + file)(routerApi)
})

fs.readdirSync(path.join(__dirname, '.', "routes/Report/")).forEach(function(file) {
	require("./routes/Report/" + file)(routerApi)
})

fs.readdirSync(path.join(__dirname, '.', "routes/CertificationFiles/")).forEach(function(file) {
	require("./routes/CertificationFiles/" + file)(routerApi)
})

app.use(express.static(path.join(__dirname, '..', 'dist')))

app.get(`/${process.env.APP}*`, function (req, res) {
	res.header("Cache-Control", "no-cache, no-store, must-revalidate")
	res.header("Pragma", "no-cache")
	res.header("Expires", 0)

	res.sendFile(path.join(__dirname, "../dist/index.html"))
})

var port = process.env.PORT

server.listen(port,  function() {
	LOGGER("INFO","Node server running")
})
