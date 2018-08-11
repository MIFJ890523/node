import React from 'react'
import numeral from 'numeral'

import Labels from 'Assets/Labels'

import {ListGroup, ListGroupItem} from 'react-bootstrap'

const ListGroupInstance = ({data}) => {

	const listItems = []
	let total = 0

	listItems.push(<ListGroupItem><span>{Labels.Oportunidades.Rubros.donors}</span></ListGroupItem>)

	data.map((donor, index) => {
		listItems.push(
			<ListGroupItem key={index}>
				<span>{donor.nombreInstitucion}</span>{/*&nbsp;<span className="pull-right">{numeral(donor.monto).format("$ 0,0.00")}</span>*/}
			</ListGroupItem>
		)
		total += parseInt(donor.monto)
	})

	// listItems.push(
	// 	<ListGroupItem>
	// 		<div className="text-right">{numeral(total).format("$ 0,0.00")}</div>
	// 	</ListGroupItem>
	// )

	return (
		<ListGroup className="list-group-custom">{listItems}</ListGroup>
	)
}

export default ListGroupInstance