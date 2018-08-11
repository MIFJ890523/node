const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const fs = require("fs")
const { isHTML } = require("../../utils/Validation")
const { doRequestRest } = require("../../utils/HTTPRequest")

const LOGGER = require("../../config/Logger").Logger
const CONFIG = require("../../config")

module.exports = (router) => {

	var LOGGER_SERVICE = CONFIG.LOGGER_AUTHENTICATION

	var SERVICE = CONFIG.SERVICE_AUTHENTICATION

	var serviceHandler = (config, map) => {
		return ( (req, res) => {
			var data = req.body

			if (Object.keys(data).length === 0 ) {
				LOGGER("ERROR", config.name+".ValidationError: Need data", LOGGER_SERVICE)
				return res.status(500).send({codigoError : "500", descripcionError : "ValidationError Need: data "})
			} else {

				var headers = { "Content-Type": "application/json"}
				var body = map ? map(data) : data;

				LOGGER("INFO", config.name + ".BODY: " + JSON.stringify(body), LOGGER_SERVICE)

				doRequestRest(config.protocol, config.host, config.port, config.path, config.method, headers, body, (response) => {

					if(isHTML(response)) {

						LOGGER("ERROR", "message response invalid", LOGGER_SERVICE)

						var dataResponse = {}

						dataResponse.code = 500
						dataResponse.codigo = 500
						dataResponse.mensaje = "Datos Incorrectos"
						dataResponse.data = response

						return res.status(500).send(dataResponse)
					} else {
						var responseJSON = JSON.parse(response)
						LOGGER("INFO", config.name + ": Exitoso", LOGGER_SERVICE)
						return res.status(200).send(responseJSON)
					}
				}, (err) => {
					LOGGER("ERROR", err, LOGGER_SERVICE)
					return res.status(500).send(JSON.parse(err))
				})
			}
		})
	}

	var authenticate = serviceHandler({
		name: 'authenticate',
		protocol: SERVICE.PROTOCOL, host: SERVICE.HOST,port: SERVICE.PORT,
		path: SERVICE.AUTHENTICATE,
		method: CONFIG.METHOD_POST
	}, (data) => {
		var tmp = Object.assign({}, data)
		return tmp
	});

	//Link routes and functions
	router.post("/auth/v1/authenticate", authenticate)


}
