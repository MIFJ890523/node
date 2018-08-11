import React from "react";

const TextareaInput = ({error, noupper, lower, label, name, onChange, placeholder, readOnly, disabled, required, value, maxLength, alpha, alphanum, alphaQuestion, rows, style, curlyBraces}) => {

	let wrapperClass = "form-group ";

	if (error && required && !value) {
		wrapperClass += " has-error";
	}

	let handleChange = (e) => {
		let selTemp = e.target.selectionStart,
		lengthTemp = e.target.value.length

		let ival

		if (curlyBraces) {
			ival = e.target.value.replace(/[^0-9A-Za-záéíóúÁÉÍÓÚÜüñÑ'_=/%&+\[\\]\\ \@\.\-¿\?,:;&#\(\)\"¡!]/g,'')
		} else {
			ival = e.target.value.replace(/[^0-9A-Za-záéíóúÁÉÍÓÚÜüñÑ'_=/%&+\ \@\.\-¿\?,:;&#\(\)\"¡!]/g,'')
		}
		

		if (alpha) {
			ival = ival.replace(/[0-9#_\.\-]/g,'')
		} else if (alphanum) {
			ival = ival.replace(/[#_\@\.\-]/g,'')
		} else if (alphaQuestion) {
			ival = ival.replace(/[#_\@\-]/g,'')
		}

		if (lower) {
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
			{label && <label className="control-label" htmlFor={name}>
				{label}
			</label>}
			<textarea
				name={name}
				id={name}
				value={value}
				disabled={disabled}
				onChange={handleChange}
				readOnly={readOnly}
				maxLength={maxLength}
				autoComplete="off"
				rows={rows}
				className="form-control"
				placeholder={placeholder}
				style={style} />
				{(error && required && !value) && <p>{'Este campo es requerido'}</p>}
				{maxLength && <span className="counter">{(maxLength-(value?value.length:0))+'/'+maxLength}</span>}
</div>
	)
};

export default TextareaInput;
