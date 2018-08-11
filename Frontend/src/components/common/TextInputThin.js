import React, {Component} from "react";

import {connect} from "react-redux";
import numeral from "numeral";

class CurrencyInput extends Component {

	onBlur(e){
		this.setState({ value: numeral(this.props.value).format('$ 0,0.00'), modified: false });
		if (this.props.onBlur) this.props.onBlur(e);
	}

	onFocus(e){
		this.setState({ value: Number(this.props.value)? numeral(this.props.value).value() : '' , modified: true });
		if (this.props.onFocus) this.props.onFocus(e);
	}

	onChange(e){

		let selTemp = e.target.selectionStart

		let ival

		if (this.props.minus)
			ival = e.target.value.replace(/[a-zA-ZáéíóúÁÉÍÓÚÄËÏÖÜäëïöüñÑ!*#$%&()=",+_{}´¨~¿?'¡!;:\|\ \/\[\]]/g,'')
		else
			ival = e.target.value.replace(/[a-zA-ZáéíóúÁÉÍÓÚÄËÏÖÜäëïöüñÑ!*#$%&()=",+_{}´¨~¿?'¡!;:\|\-\ \/\[\]]/g,'')

		if ((ival.match(/\./g)||[]).length < 2 && (ival.split(".")[1]||[]).length <= 2  && ival.split(".")[0].length < 16 ) {
			e.target.value = ival;
			e.target.selectionStart = selTemp;
			e.target.selectionEnd = selTemp;
			this.setState({ value:e.target.value });
			if (this.props.onChange) {
				this.props.onChange(e);
			}
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			value: numeral(this.props.value).format('$ 0,0.00'),
			modified: false
		};

		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		if(nextProps.value!==this.props.value && !this.state.modified) {

			this.setState({ value: numeral(nextProps.value).format('$ 0,0.00') });

		}
	}

	render(){
		let _value = '';
		if (this.state.value !== '') {
			_value = numeral(this.state.value);
		}
		let wrapperClass = "";
		if (this.props.error) {
			if ((this.props.max && (_value > this.props.max)) ||
					(this.props.min && (_value < this.props.min)) ||
					(this.props.required && _value==='')) {
				wrapperClass += " has-error";
			}
		}

		return (
			<div className={wrapperClass}>
				<label className="control-label" htmlFor={this.props.name}>
					{this.props.label}
					{this.props.required && <i className={'fa fa-circle requerido'} />}
					<br />
					{this.props.subLabel && <span>{this.props.subLabel}</span>}
				</label>

				<input
					type="text"
					name={this.props.name}
					className="text-input-table"
					placeholder={this.props.placeholder}
					value={this.state.value}
					disabled={this.props.disabled}
					autoComplete="off"
					onChange={this.onChange}
					onBlur={this.onBlur}
					maxLength={this.props.maxLength}
					readOnly={this.props.readOnly}
					onFocus={this.onFocus} />
				{(!!this.props.max && _value!=='') && (_value > this.props.max) && <p>{'El valor introducido es mayor al máximo permitido'}</p>}
				{(!!this.props.min && _value!=='') && (_value < this.props.min) && <p>{'El valor introducido es menor al mínimo permitido'}</p>}
				{(this.props.error && this.props.required && _value==='') && <p>{'Este campo es requerido'}</p>}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		min: Number(ownProps.min),
		max: Number(ownProps.max),
		error: ownProps.error,
		name: ownProps.name,
		label: ownProps.label,
		subLabel: ownProps.subLabel,
		onChange: ownProps.onChange,
		onBlur: ownProps.onBlur,
		onFocus: ownProps.onFocus,
		placeholder: ownProps.placeholder,
		readOnly: ownProps.readOnly,
		required: ownProps.required,
		value: ownProps.value,
		maxLength: ownProps.maxLength,
		disabled: ownProps.disabled
	};
}



export default connect(mapStateToProps)(CurrencyInput);
