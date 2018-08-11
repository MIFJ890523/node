import { Table } from 'react-bootstrap'
import React from 'react'

const TableColumnsFields = (props) => {

	const formattedCells = (item, index) => {
		let tempRow = []

		for (let i = props.columns.length - 1; i >= 0; i--) {
			let { key, format, field } = props.columns[i]
			if (item[key]){
				if (typeof format == 'function') {
					tempRow[i] = <td key={i}>{format(item[key])}</td>
				} else if (format == 'text') {
					tempRow[i] = <td key={i}>{item[key]}</td>
				} else if (format == 'check') {
					tempRow[i] = <td key={i}><input name={field} type="checkbox" value={item[key]} onChange={props.onBoxToggle} /></td>
				} else if (format == 'radio') {
					tempRow[i] = <td key={i}><input name={field} type="radio" value={item[key]} onChange={props.onRadioSelect} /></td>
				} else {
					tempRow[i] = <td key={i}>{' - '}</td>
				}
			}
		}
		return (<tr key={index}>{tempRow}</tr>)
	}

	const headers = props.columns.map((item, index) => <th key={index}>{item.description}</th>) ,
	rows = props.data.map(formattedCells)

	return (
		<Table responsive>
			<thead><tr>{headers}</tr></thead>
			<tbody>{rows}</tbody>
		</Table>
		)
}

export default TableColumnsFields
