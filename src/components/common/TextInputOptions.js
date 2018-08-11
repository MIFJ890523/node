import React from "react"
import {Collapse} from 'react-bootstrap'
import SelectInput from "Components/common/SelectInput"

const TextInputOptions = ({error, noupper, lower, label, name, onChange, placeholder, readOnly, disabled, required, value, maxLength, alpha, alphanum, alphaQuestion, rows, onClickButton,
							nameSelect, valueSelect, options, subLabel, handleSelect, selectToggle}) => {
	let wrapperClass = "form-group";

	if (error && required && (valueSelect === '' || valueSelect === undefined || valueSelect === null || isNaN(valueSelect))) {
		wrapperClass += " has-error";
	}

	let handleChange = (e) => {
		let selTemp = e.target.selectionStart,
			lengthTemp = e.target.value.length,
			ival = e.target.value.replace(/[^0-9A-Za-záéíóúÁÉÍÓÚÜüñÑ'_=/%&+\ \@\.\-¿\?,:;&#\(\)\[\]\"¡!]/g,'');

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

		if (lengthTemp === ival.length) {
			e.target.selectionStart = selTemp;
			e.target.selectionEnd = selTemp;
		} else {
			e.target.selectionStart = selTemp-1;
			e.target.selectionEnd = selTemp-1;
		}
		onChange(e)
	};

	let estilo;
	if(rows === 1) {
		estilo = { height: '6vh', minHeight: '40px' }
	} else {
		estilo = { height: '13vh', minHeight: '40px' }
	}

	return (
		<div className={wrapperClass}>
			{label && <label className="control-label" htmlFor={name}>
				{label}&nbsp;{subLabel && <span className="small text-muted">{subLabel}</span>}
			</label>}

			<div className="input-group" style={{zIndex: '0'}}>
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
					style={estilo} />
				<span className="input-group-btn">
					<button name={nameSelect} className="btn btn-default" style={estilo} type="button" onClick={() => onClickButton(nameSelect)}><i className={`fa ${selectToggle ? "fa-window-close" : "fa-inbox"}`} /></button>
				</span>
			</div>
			{error && required && (!value || value === '' || value === ' ' || value === undefined || value === null) && <p>{'Este campo es requerido'}</p>}

			<Collapse in={selectToggle}>
				<div>
					<SelectInput
						name={nameSelect}
						value={valueSelect}
						options={options}
						onChange={(v)=>{handleSelect(v, nameSelect)}} />
				</div>
			</Collapse>

		</div>
	)
}

export default TextInputOptions
