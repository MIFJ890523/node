import React from "react";

const TextInput = ({error, noupper, lower, name, label, integerDecimalObj, subLabel, onChange, onKeyDown, placeholder, readOnly, required, value, disabled, maxLength, num, float, alpha, alphanum, alphaquestion, email, rfc, autoFocus, facebook, floatValues, style, onKeyUp}) => {

	let wrapperClass = "form-group";
	if (error && required && (!value || (typeof value == "string" && !value.trim()) || rfc || email)) {
		wrapperClass += " has-error";
	}

	let handleChange = (e) => {

		e.preventDefault()
		let selTemp = e.target.selectionStart,
		lengthTemp = e.target.value.length

		let ival = e.target.value.replace(/[^0-9A-Za-záéíóúÁÉÍÓÚÜüñÑ'_=/%&+\ \@\.\-¿\?,:;&#\(\)\"¡!]/g,'')

		if (alpha) {
			ival = ival.replace(/[0-9,\@#_=/%+\n\r¿\?]/g,'')
		} else if (integerDecimalObj) {

			if (integerDecimalObj.negative && ival.includes('-'))
				ival = ival.replace(/[A-Za-záéíóúÁÉÍÓÚÜüñÑ'_=/%&+\ \@\¿\?,:;&#\(\)\"¡!]/g,'')
			else
				ival = ival.replace(/[A-Za-záéíóúÁÉÍÓÚÜüñÑ'_=/%&+\ \@\-¿\?,:;&#\(\)\"¡!]/g,'')
			
			if (ival.match(/(\..*){2,}/) !== null) 
				ival = ival.replace(/.([^.]*)$/,'$1')

			if (integerDecimalObj.negative && ival.includes('-') && ival.match(/(\--*){2,}/) !== null) 
				ival = ival.replace(/-([^-]*)$/,'$1')

			if (!ival.includes('.') && ival.replace('-', '').length > integerDecimalObj.int) {

				if (integerDecimalObj.negative && ival.includes('-')) {
					ival = `-${ival.replace('-', "").substr(0, integerDecimalObj.int)}`
				} else {
					ival = ival.substr(0, integerDecimalObj.int)
				}
			}

			let regex = /^-?[0-9]{0,10}[.]?[0-9]{0,2}$/

			if (integerDecimalObj.negative && ival.includes('-') && ival.includes('-'))
				regex = /^[0-9]{0,10}[.]?[0-9]{0,2}$/

			if (ival.match(regex) === null && ival.length >= 2) {

				let point = false
				if (ival.includes('.'))
					point = true

				ival = ival.split('.')

				if (integerDecimalObj.negative && ival[0].includes('-')) {
					ival = `-${ival[0].replace('-', '').substr(0, integerDecimalObj.int)}${point ? '.' : ''}${ival[1] ? `${ival[1].replace('-', '').substr(0, integerDecimalObj.dec)}` : ''}`
				} else {
					ival = `${ival[0].replace('-', '').substr(0, integerDecimalObj.int)}${point ? '.' : ''}${ival[1] ? `${ival[1].replace('-', '').substr(0, integerDecimalObj.dec)}` : ''}`
				}
			}

		}else if (num) {
			ival = ival.replace(/[A-Za-záéíóúÁÉÍÓÚÜüñÑ'_=/%&+\ \@\.\-¿\?,:;&#\(\)\"¡!]/g,'')
		} else if (float) {
			ival = ival.replace(/[A-Za-záéíóúÁÉÍÓÚÜüñÑ'_=/%&+\ \@\-¿\?,:;&#\(\)\"¡!]/g,'')
			if (ival.match(/(\..*){2,}/) !== null)
				ival = ival.replace(/.([^.]*)$/,'$1')
		} else if (alphanum) {
			ival = ival.replace(/[#_=/%&+\n\r,\@\.\-¿\?]/g,'')
		} else if (alphaquestion) {
			ival = ival.replace(/[#_=/%&+\n\r\.\-]/g,'')
		} else if (email) {
			ival = ival.replace(/[#=/%&+\n\r,\?¿]/g,'')
		} else if (rfc) {
			ival = ival.replace(/[,\@#_=/%&+\n\r¿\?\.\-]/g,'')
		} else if (facebook) {
			ival = ival.replace(/[,=/%&+\n\r@\¿\s]/g,'')
			ival = `/${ival}`
		} else if (facebook) {
			ival = ival.replace(/[,\n\r\¿\s]/g,'')
		} else if (floatValues) {

			ival = ival.replace(/[A-Za-záéíóúÁÉÍÓÚÜüñÑ'_=/%&+\ \@\-¿\?,:;&#\(\)\"¡!]/g,'')
			
			if (ival.match(/(\..*){2,}/) !== null)
				ival = ival.replace(/.([^.]*)$/,'$1')

			if (!ival.includes('.') && ival.length > 10)
				ival = ival.substr(0, 10)

			if (ival.match(/^[0-9]{0,10}[.]?[0-9]{0,20}$/) === null && ival.length >= 2) {
				ival = ival.split('.')
				ival = `${ival[0].substr(0, 10)}.${ival[1].substr(0, 20)}`
			}

		} if (lower) {
			e.target.value = ival.toLowerCase()
		} else if (noupper) {
			e.target.value = ival
		} else {
			e.target.value = ival.toUpperCase()
		}

		if (lengthTemp == ival.length) {
			e.target.selectionStart = selTemp;
			e.target.selectionEnd = selTemp;
		} else {
			e.target.selectionStart = selTemp-1;
			e.target.selectionEnd = selTemp-1;
		}
		onChange(e)
	}


	return (

		<div className={wrapperClass}>

			{ label && <label className="control-label" htmlFor={name}>
				{label}&nbsp;{subLabel && <span className="small text-muted" >{subLabel}</span>}
			</label>}

			<input
				autoFocus={autoFocus}
				type="text"
				name={name}
				id={name}
				className="form-control"
				placeholder={placeholder}
				value={value}
				readOnly={readOnly}
				maxLength={maxLength}
				autoComplete="off"
				disabled={disabled}
				onChange={handleChange}
				onKeyDown={onKeyDown}
				onKeyUp={onKeyUp}
				style={style} />
			{error && email && required && value && <p>{'Formato de E-mail incorrecto'}</p>}
			{error && rfc && required && value && <p>{'Formato de RFC incorrecto'}</p>}
			{error && required && (!value ||  (typeof value == "string" && !value.trim()) ) && <p>{'Este campo es requerido'}</p>}
		</div>
	)
};

export default TextInput;
