import React from "react";

const PasswordInput = ({error, errorPassword, name, label, subLabel, onChange, onKeyDown, placeholder, readOnly, required, value, disabled, maxLength, autoFocus}) => {

		let wrapperClass = "form-group";
		if (error && required && (!value)) {
			wrapperClass += " has-error";
		} else if (errorPassword && required) {
			wrapperClass += " has-error-email";
		}
		
		return (
			<div className={wrapperClass}>
				{ label && <label className="control-label" htmlFor={name}>
					{label}{subLabel && <span className="small text-muted" >{subLabel}</span>}
				</label>}
				<input
					autoFocus={autoFocus}
					type="password"
					name={name}
					id={name}
					className="form-control"
					placeholder={placeholder}
					value={value}
					readOnly={readOnly}
					maxLength={maxLength}
					autoComplete="off"
					disabled={disabled}
					onChange={onChange}
					onKeyDown={onKeyDown} />
				{error && required && (!value) && <p>{'Este campo es requerido'}</p>}
				{errorPassword && required && <p>{'Las contraseñas no coinciden. ¿Quieres volver a intentarlo?'}</p>}
			</div>
		)
};

export default PasswordInput;
