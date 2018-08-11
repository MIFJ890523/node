import React from 'react'
import { PanelGroup, Panel } from 'react-bootstrap'

const CustomPanelGroup = ({ panels, onSelect }) => {

	const data = []

	panels.map(panel => {
		data.push(<Panel
			key={ `Panel-${panel.eventKey}` }
			header={ <div>
				<h4>{ panel.title }
					{ panel.subtitle && <span className="small text-muted"> { panel.subtitle }</span> }
					{ !panel.value && panel.error && <span className="small text-danger">&emsp;{'(Este campo es requerido)'}</span> }
					<span className={ `${panel.expanded ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down"} pull-right` } />
				</h4>
			</div> }
			eventKey={ panel.eventKey }
			expanded={ panel.expanded }
			onSelect={ onSelect }
			collapsible
			>{ panel.component }</Panel>);
	})

	return(
		<PanelGroup>{ data }</PanelGroup>
	)
}

export default CustomPanelGroup
