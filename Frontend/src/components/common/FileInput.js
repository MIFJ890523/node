import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, ListGroupItem, OverlayTrigger, Popover} from 'react-bootstrap'

import * as Utils from 'Assets/Utils'

import {createModal, closeModal} from 'Modules/Modal'

class FileInput extends Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {

		const handleChange = (e) => {

			let validation = false

			Array.from(e.target.files).forEach((f) => {

				if ((!this.props.images && !this.props.xml) && f.type !== "application/pdf") {
					e.target.value = ""
					validation = true
					this.props.createModal(Utils.warningMessage("Únicamente archivos en formato PDF"))
				} else if (this.props.images && !f.type.match('image')) {
					e.target.value = ""
					validation = true
					this.props.createModal(Utils.warningMessage("Únicamente imágenes"))
				} else if (this.props.xml && f.type !== "text/xml") {
					e.target.value = ""
					validation = true
					this.props.createModal(Utils.warningMessage("Únicamente archivos xml"))
				} else {
					if (this.props.onChange && !validation)
						this.props.onChange(e)
				}
			})
		}

		return (
			<ListGroupItem className={(this.props.error && this.props.required && !this.props.value) ? "file-error" : "" }>
				<label className="control-label" htmlFor={this.props.name} style={{width: '100%', marginBottom: 0, fontWeight: 'normal'}}>
					{this.props.label}
					<div className="btn-toolbar pull-right">
						<Button 
							value={this.props.value} 
							bsSize="xsmall"
							disabled={this.props.value ? false : true}
							onClick={this.props.onClickView}>
								Ver <i className="fa fa-eye" />
						</Button>
						&nbsp;
						<span className="btn btn-primary btn-xs" disabled={this.props.disabled}> 
							<input
								style={{display: 'none'}}
								autoFocus={this.props.autoFocus}
								type="file"
								name={this.props.name}
								id={this.props.name}
								disabled={this.props.disabled}
								onChange={handleChange}
								accept={this.props.accept} />
							{!this.props.value ? "Subir " : "Actualizar "}
							{!this.props.value ? <i className="fa fa-upload" /> : <i className="fa fa-refresh" />}
						</span>
					</div>
				</label>
			</ListGroupItem>
		)
	}
}

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createModal: (modalObj) => dispatch(createModal(modalObj)),
		closeModal: (modalObj) => dispatch(closeModal(modalObj))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FileInput)