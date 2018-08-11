
const [PROTOCOL_SERVICE, HOST_SERVICE, PORT_SERVICE] = process.env.BACKEND_SERVICE.split("#")
//https:#invd-pxy-nory-01.invexbt.com#443

module.exports = {

	LEVEL_LOG: process.env.LEVEL_LOG === undefined ? "TRACE" : process.env.LEVEL_LOG,


	CATEGORIES: new Array(
		"App",
		"Utils.HTTPRequest",
		"Routes.Report",
		"Routes.CertificationFiles",
		"Routes.Authentication"),

	LOGGER_DEFAULT :  0,
	LOGGER_REQUEST :  1,
	LOGGER_REPORT : 2,
	LOGGER_FILE_CSV :     3,
	LOGGER_AUTHENTICATION :     4,

	METHOD_POST : 'POST',
	METHOD_GET : 'GET',
	METHOD_PUT : 'PUT',
	METHOD_DELETE : 'DELETE',

	SERVICE_REPORT: {
		PROTOCOL: PROTOCOL_SERVICE,
		HOST: HOST_SERVICE,
		PORT: PORT_SERVICE,
		CLIENT_CLABE:	"/account-certification/api/report/v1/clientClabe"
	},
	SERVICE_FILE_CSV: {
		PROTOCOL: PROTOCOL_SERVICE,
		HOST: HOST_SERVICE,
		PORT: PORT_SERVICE,
		FILE_CSV:	"/account-certification/api/file/vi/getFileCsvSolicitud",
	},
	SERVICE_AUTHENTICATION: {
		PROTOCOL: PROTOCOL_SERVICE,
		HOST: HOST_SERVICE,
		PORT: PORT_SERVICE,
		AUTHENTICATE:	"/account-certification/api/auth/v1/authenticate"
	},

};
