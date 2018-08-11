const http = require('http')
const https = require('https')
const querystring = require('querystring')
const fs = require('fs')
const request = require('request')

const HANDLER = require("../config/ErrorHandler").handler
const LOGGER = require("../config/Logger").Logger
const CONFIG = require("../config")

const LOGGER_REQUEST = CONFIG.LOGGER_REQUEST

module.exports.doRequestRest = (protocol, host, port, endpoint, method, headers, body, onSuccess, onError) => {

  var dataString

  var options = {
    protocol: protocol,
    host: host,
    port: port,
    path: endpoint,
    method: method,
    headers: headers,
    query: dataString
  }

  var link

  if (protocol === "https:"){
    options.requestCert = true
    options.rejectUnauthorized = false
    link = https

  } else {
    link = http
  }

  if (method === "GET" || method === "DELETE"){
    if(body.ignoreKey){
      delete body.ignoreKey
      for(var key in body){
        options.path = options.path + '/' + body[key]
      }
    }else{
      dataString = querystring.stringify(body)
      options.path = options.path + "?" + dataString
    }
  } else {
    dataString = JSON.stringify(body)
  }

  LOGGER("DEBUG", "OPTIONS: " + JSON.stringify(options), LOGGER_REQUEST)

  LOGGER("DEBUG", "BODY: " + dataString, LOGGER_REQUEST)

  var req = link.request(options, (res) => {

    res.setEncoding("utf8")
    var responseString = "";

    res.on("data", (chunk) => {
      responseString += chunk
    })

    res.on("end", () => {

      LOGGER("DEBUG", "RESPONSE: " + responseString, LOGGER_REQUEST)

      if (res.statusCode == 400) {

        const message = res.headers['x-donatarias-error'];

        let responseError = {}

        let error

        try {
          responseError = JSON.parse(responseString)

          error = Object.assign({
            status: res.statusCode,
            error: "Internal Server Error",
            message: message,
            path: options.path
          }, responseError)

        } catch(e) {
          LOGGER("ERROR", e, LOGGER_REQUEST)

          error = Object.assign({
            status: 500,
            error: "Internal Server Error",
            message: message,
            path: options.path
          }, responseError)

        }


        onError(JSON.stringify(error))
      } else if (res.statusCode == 404) {

        const error = {
          status: res.statusCode,
          error: "Server Error",
          message: responseString,
          path: options.path
        }

        onError(JSON.stringify(error))

      } else if (res.statusCode == 200 || res.statusCode == 201) {
        try {
          if(body.typeFile){
            var moment = require('moment');
            
            let date = moment().format('YYYY-MM-DD')
            let dataFile = {"file": responseString,
                            "date": date}

            responseString = dataFile
          }
          onSuccess(responseString)
        } catch (e) {

          const error = {
            status: 500,
            error: "Server Error",
            message: "Error en Negocio",
            path: options.path
          }

          onError(JSON.stringify(error))
        }
      } else {
        try {
          onError(responseString)
        } catch (e) {

          const error = {
            status: 500,
            error: "Server Error",
            message: "Error en Negocio",
            path: options.path
          }

          onError(JSON.stringify(error))
        }
      }
    })
  })

  if (method !== "GET"){ req.write(dataString) }

  req.on('error', (e) => {
    HANDLER(e)
    onError(JSON.stringify(e))
  })
  req.end()
};

module.exports.doRequestRestURLEncoded = (protocol, host, port, endpoint, method, headers, body, onSuccess, onError) => {

  var data = querystring.stringify(body)

  var options = {
    protocol: protocol,
    host: host,
    port: port,
    path: endpoint,
    method: method,
    headers: headers
  };

  var link

  if (protocol === "https:"){
    options.requestCert = true;
    options.rejectUnauthorized = false;

    link = https
  } else {
    link = http
  }

  LOGGER("DEBUG", "OPTIONS: " + JSON.stringify(options), LOGGER_REQUEST)

  LOGGER("DEBUG", "BODY: " + data, LOGGER_REQUEST)

  var req = link.request(options, (res) => {

    res.setEncoding("utf8")
    var responseString = ""

    res.on("data", (chunk) => {
      responseString += chunk
    })

    res.on("end", () => {

      LOGGER("DEBUG", "RESPONSE: " + responseString, LOGGER_REQUEST)

      if (res.statusCode == 400) {

        const message = res.headers['x-donatarias-error'];

        const error = {
          status: res.statusCode,
          error: "Internal Server Error",
          message: message,
          path: options.path
        }

        onError(JSON.stringify(error))

      } else if (res.statusCode == 404) {

        const error = {
          status: res.statusCode,
          error: "Server Error",
          message: responseString,
          path: options.path
        }

        onError(JSON.stringify(error))

      } else if (res.statusCode == 200 || res.statusCode == 201) {
        onSuccess(responseString)
      } else {
        onError(responseString)
      }
    })
  })

  req.write(data)
  req.on('error', (e) => {
    HANDLER(e)
    onError(e)
  })
  req.end()
};

module.exports.doRequestRestFormData = (uri, method, headers, data, onSuccess, onError) => {

  var arr =  []

  let obj = JSON.parse(data.body.json)
  , tmpIndex = obj.nombre.lastIndexOf(".")
  , tmpNombre = obj.nombre.substr(0,tmpIndex)
  , tmpExt = obj.nombre.substr(tmpIndex)
  obj.nombre = tmpNombre + "_" + new Date().toISOString().slice(0,10) + tmpExt
  obj.nombre = encodeURI(obj.nombre)
  obj = Object.assign({}, obj, { usuarioModifica: headers.usuario })

  arr.push({
    'Content-Type': 'multipart/form-data; charset=utf-8',
    'Content-Transfer-Encoding': '8bit',
    body: JSON.stringify(obj)
  })

  data.files.map(file => {

    arr.push({
      'Content-Type': 'application/octet-stream; charset=utf-8; name="' + file.originalname + '"',
      'Content-Transfer-Encoding': 'binary',
      'Content-Disposition': 'form-data; name="' + file.originalname + '"; filename="' + file.originalname + '"',
      body: fs.createReadStream(file.path)
    })

    headers = Object.assign({}, headers, {'Content-Length': file.size })
  })

  var options = {
    method: method,
    preambleCRLF: true,
    postambleCRLF: true,
    uri: uri,
    headers: headers,
    multipart: {
      chunked: false,
      data: arr
    }
  }

  options.requestCert = true
  options.rejectUnauthorized = false

  LOGGER("DEBUG", "OPTIONS: " + JSON.stringify(options), LOGGER_REQUEST)

  LOGGER("DEBUG", "BODY: " + data, LOGGER_REQUEST)

  request(options, function (error, response, body) {

    if (error) {
      LOGGER("ERROR","Upload failed:" + error, LOGGER_REQUEST)
      onError({"Error": "Error enviando los archivos"});
    }

    LOGGER("DEBUG","Server responded with:" + body, LOGGER_REQUEST)

    try {
      onSuccess(body)
    } catch (e) {

      const error = {
        status: 500,
        error: "Server Error",
        message: "Error en Negocio",
        path: options.uri
      }

      onError(JSON.stringify(error))
    } finally {

      data.files.map(file => {
        fs.unlink(file.path);
      });

    }
  })
};
