import { Table } from 'react-bootstrap'
import SelectInput from 'Components/common/SelectInput'
import TextareaInput from 'Components/common/TextareaInput'
import React from 'react'

const TableColumnsFields = (props) => {

	const formattedCells = (item, index) => {
		let tempRow = []

		for (let i = props.columns.length - 1; i >= 0; i--) {
			let { key, validate, format, field, comment, dataAlign } = props.columns[i]

			//if (item[key]!==undefined && item[key]!==null) {
				if (typeof format == 'function') {
					tempRow[i] = <td key={i}>{format(item[key],index)}</td>
				} else if (format == 'text') {

					if ( dataAlign ) {
						tempRow[i] = <td key={i} style={{textAlign: dataAlign}} >{item[key]}</td>
					} else {
						tempRow[i] = <td key={i}>{item[key]}</td>
					}

				} else if (format == 'textarea') {
					tempRow[i] = (<td key={i}><TextareaInput rows={5} required error={props.validate && item[validate]} name={field} value={item[key] ? item[key] : ""} onChange={(e)=>{props.onChange(e,index)}}
					style={{top: -7}} /></td>)
//				} else if (format == 'check') {
//					tempRow[i] = <td key={i}><input name={field} type="checkbox" value={item[key]} onChange={(e)=>{props.onBoxToggle(e,index)}} error /></td>
//				} else if (format == 'radio') {
//					tempRow[i] = <td key={i}><input name={field} type="radio" value={item[key]} onChange={(e)=>{props.onRadioSelect(e,index)}} error /></td>
				} else if (format == 'select') {
					tempRow[i] = <td key={i}><SelectInput name={field} options={props.columns[i].options} value={item[key] === true ? 1 : item[key] === false ? 2 : ''} onChange={(v)=>{props.onSelect(v,field,index, comment)}} error /></td>
				} else {
					tempRow[i] = <td key={i}>{' - '}</td>
				}
			//} else {
			//	tempRow[i] = <td key={i} />
			//}
		}
		return (<tr key={index}>{tempRow}</tr>)
	}

	const headers = props.columns.map((item, index) => <th style={{textAlign: item.headerAlign}} key={index}>{item.description}</th>) ,
	rows = props.data.map(formattedCells)

	return (
		<Table responsive>
			<thead><tr>{headers}</tr></thead>
			<tbody>{rows}</tbody>
		</Table>
		)
}

export default TableColumnsFields
