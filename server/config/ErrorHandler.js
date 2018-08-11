/**
 * Configuration for Errors to
 * manage the logging configurations
 */

var LOGGER = require("../config/Logger").Logger

var AppError = function(err) {

    LOGGER("DEBUG", "AppError")

    var name = err.name === undefined ? "Application Error" : err.name
    var msg  = err.message === undefined ? (err.description === undefined ? "": err.description) : err.message

    if (!(err instanceof Error)) {
        msg = err
    }

    //To print the stackTrace
    Error.call(this)
    Error.captureStackTrace(this, arguments.callee)

	err.Error = ""
    err.name = name
    err.descripcionError = msg
    err.status = getErrorStatus(msg)

    LOGGER("ERROR", err)

    return
}

var getErrorStatus = (errMessage) => {

    var returned

    switch (errMessage) {

        case "Bad Request": // The request could not be understood by the server
            returned = 400
            break

        case "Unauthorized": // The request requires user authentication
            returned = 401
            break

        case "Token expired":
            returned = 401 // authorization has been refused for the credentials
            break

        case "ValidationError":
            returned = 409 //Conflict
            break

        case "Internal Server Error":
            returned = 500 //Conflict
            break

        default:
            returned = 500 // Internal server error
            break
    }

    return returned

}

/**
 * wrapper: An error wrapper for errors caught in Mongoose request.
 * It should be called has a callback function.
 * @param {type} res
 * @returns {Function}
 */
module.exports.wrapper = (res) => {
    return (err) => {
        LOGGER("DEBUG", "Wrapper...")
        new AppError(err)
        res.status(getErrorStatus(err.name)).send(err)
    }
}

/**
 * handler: It is a generic function to manage generic errors
 * It should be invoqued
 * @param {error} err
 * @param {request} res
 * @returns {router} Returns an error object to client
 */
module.exports.handler = (err, res) => {

    LOGGER("ERROR", "Handler...")
    LOGGER("ERROR", "err... " + err)
		LOGGER("ERROR", "res... " + res)

		var name = ''
    err.name.toLowerCase() === "error" ? name = err.message : name = err.name

    new AppError(err)

    if(res != undefined){
      res.status(getErrorStatus(name)).send(err)
    }
}

/**
 * errorHandler: Is the default handler defined to manage uncaught errors or exceptions
 * It shouldn"t be called by the user.
 * @returns {Function}
 */
module.exports.errorHandler = () => {
    return (err, req, res) => {
        LOGGER("DEBUG", "errorHandler...: " + err)

				var name = ''
        err.name.toLowerCase() === "error" ? name = err.message : name = err.name
        err.description = err.message
        err.code = getErrorStatus(name)

        res.status(err.code).send(err)

    }
}
