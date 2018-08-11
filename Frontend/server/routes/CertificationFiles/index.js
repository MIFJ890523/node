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

	var LOGGER_SERVICE = CONFIG.LOGGER_FILE_CSV
	var SERVICE = CONFIG.SERVICE_FILE_CSV

	var serviceHandler = (config, map) => {
		return ( (req, res) => {
			var data = req.body

			if (Object.keys(data).length === 0 ) {
				LOGGER("ERROR", config.name+".ValidationError: Need data", LOGGER_SERVICE)
				return res.status(500).send({codigoError : "500", descripcionError : "ValidationError Need: data "})
			} else {

				var headers = { "Content-Type": "application/json"}
				var body = map ? map(data) : data;

				doRequestRest(config.protocol, config.host, config.port, config.path, config.method, headers, body, (response) => {

						LOGGER("INFO", config.name + ": Exitoso", LOGGER_SERVICE)
						return res.status(200).send(response)

				}, (err) => {
					LOGGER("ERROR", err, LOGGER_SERVICE)
					return res.status(500).send(JSON.parse(err))
				})
			}
		})
	}

	var fileCsv = serviceHandler({
		name: 'fileCsv',
		protocol: SERVICE.PROTOCOL, host: SERVICE.HOST,port: SERVICE.PORT,
		path: SERVICE.FILE_CSV,
		method: CONFIG.METHOD_GET
	}, (data) => {
		var tmp = Object.assign({}, data)
      tmp.ignoreKey = true;
		return tmp
	});

	//Link routes and functions
	router.post("/report/v1/fileCsv", fileCsv)
}
