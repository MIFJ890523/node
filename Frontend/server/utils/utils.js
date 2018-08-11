const imageFilter = function (req, file, cb) {
    
	if (["application/pdf", "image/jpeg", "image/png", "text/xml"].indexOf(file.mimetype) === -1) {
		req.fileValidationError = 'Formato de archivo no permitido';
		return cb(null, false, new Error('Formato de archivo no permitido'));
	} else {
		cb(null, true)
	}
};

module.exports = { imageFilter }
