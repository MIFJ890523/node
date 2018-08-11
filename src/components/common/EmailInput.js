import React from "react";

const emailInput = (props) => {

	const exp = /[\w-]+(\.?[\w-]){0,}@[\w-]+(\.[\w-]{2,})+/g

	let wrapperClass = "form-group"
	if (props.error) {
		if ((props.required && !props.value) ||
			props.value.match(exp) === null) {
			wrapperClass += " has-error";
		}
	}

	let handleChange = (e) => {

		e.preventDefault()

		let ival = e.target.value

		if (props.lower) {
			e.target.value = ival.toLowerCase()
		} else if (props.noupper) {
			e.target.value = ival
		} else {
			e.target.value = ival.toUpperCase()
		}

		props.onChange(e)
	}

	return (
		<div className={wrapperClass}>

			{props.label && <label className="control-label" htmlFor={props.name}>
				{props.label}{props.subLabel && <span className="small text-muted" >{props.subLabel}</span>}
			</label>}
			
			<input
				type="text"
				maxLength={props.maxLength}
				name={props.name}
				className="form-control"
				placeholder={props.placeholder}
				value={props.value}
				onChange={handleChange}
				autoComplete="off"
				disabled={props.disabled} />
				{(props.error && props.required && !props.value) && <p> {'Este campo es requerido'} </p>}
				{(props.error && props.value && props.value.match(exp) === null) && <p> {'Introduzca una dirección de e-Mail válida'} </p>}
		</div>

	)
}

export default emailInput
