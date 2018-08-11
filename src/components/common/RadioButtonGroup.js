import { FormGroup, Radio } from 'react-bootstrap'

import React from 'react'

const RadioButtonGroup = ({ id, options, label, error, value, required, name, onChange, disabled }) => {

	let wrapperClass = "form-group ";

	if (error && required && (value === undefined || value === null)) {
		wrapperClass += " has-error";
	}

	const handleChange = (e,type) => {
		if (type === 'number') {
			let name = e.target.name
			let value = Number(e.target.value)
			onChange({target:{name, value}})
		} else {
			let name = e.target.name
			let value = e.target.value
			let id = e.target.id
			onChange({target:{name, value, id}})
		}
	}

	const mapOptions = option => (<Radio
			id={ id }
			key={ option.value }
			readOnly={ option.readOnly }
			disabled={ disabled }
			name={ name }
			value={ option.value }
			checked={ option.value ? option.value === value : false }
			onChange={ (e) => { if (onChange) handleChange(e,typeof option.value)} }
			inline>{ option.label }</Radio>)

	return (
		<FormGroup><div className={wrapperClass}>

			{ label && <label className="control-label" style={{width: '100%'}} > {label} </label>}
			{ options.map(mapOptions) }
			{(error && required && (value === undefined || value === null )) && <p>{'Este campo es requerido'}</p>}
		</div></FormGroup>
	)
}

export default RadioButtonGroup
