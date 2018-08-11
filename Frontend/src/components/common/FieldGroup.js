import React from 'react'
import {FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap'
import numeral from "numeral"

const FieldGroup = (props) => {

	let texto = props.text

	if (props.currency)
		texto = numeral(texto).format('$ 0,0.00')

	return(
		<FormGroup>
			<ControlLabel className={props.className}>{props.label}</ControlLabel>
			<HelpBlock className={props.underlined ? "underlined" : ""}>{texto}</HelpBlock>
		</FormGroup>
	)
}

export default FieldGroup