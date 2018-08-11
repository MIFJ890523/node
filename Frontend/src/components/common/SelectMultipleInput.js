import React from "react"
import Select from "react-select"

const SelectMultipleInput = ({name, disabled, error, label, onChange, options, required, readOnly, value, autoFocus, placeholder, multi, closeOnSelect}) => {

    let wrapperClass = "form-group ";

    if (error && required && !value) {
        wrapperClass += " has-error";
    }

    let searchable = true,
        clearable  = false;

    let data = [];

    options.map(option => {
        data.push({value: option.id, label: option.valor});
    });

    return (
        <div className={wrapperClass}>
            <label className="control-label" htmlFor={name}>
                {label}
            </label>

            <Select
							className="multiple-selection"
							autofocus={autoFocus}
							clearable={clearable}
							disabled={disabled}
							noResultsText="No existe la opción"
							name={name}
							id={name}
							onChange={onChange}
							options={data}
							placeholder={placeholder ? placeholder : "Seleccione una opción"}
							searchable={searchable}
							simpleValue
							readOnly={readOnly}
							value={value}
							multi={multi}
							closeOnSelect={closeOnSelect} />
            {error && required && !value && <p>{'Este campo es requerido'}</p>}
        </div>
    );
};

export default SelectMultipleInput
