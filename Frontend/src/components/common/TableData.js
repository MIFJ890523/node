
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import CheckBoxGroup from './CheckBoxGroup'
import RadioButtonGroup from './RadioButtonGroup'
import moment from 'moment'
import {Button, Radio} from 'react-bootstrap'
import * as Utils from 'Assets/Utils'

moment.locale()

import React from 'react'
import numeral from 'numeral'

const TableData = ({id, onClickEdit, onClickRemove, onClickProcess, onClickView, onClickComponent, create, process, edit, remove, state, document, equalSize, toggleTableAll, page, cellEditCheck, onBeforeSaveCell, onAfterSaveCell, selectRowCheck, onRowSelect, onSelectAll, selected, sizePerPage, pageStartIndex, paginationSize, data, columns, disabled, search, footer, footerData, expandableRow, expandComponent, expandColumnOptions, isNoPagination, onClickEtapas, rowSpan, custom, onClickCustom, rangosAsignar, onClickRangosyAsignar, selecion, onClickSelecion, arrayLink, onClickArrayLink, arrayChange, onClickChangeLink, customStyle, certificate, onClickCertificate, ajuste, onClickAjuste, onClickArrayLinkRadioCheck, upload, onClickUpload, onClickContract, createModal}) => {

	const handleChange = (e, row) => {

		let validation = false

		Array.from(e.target.files).forEach((f) => {

			if (f.type !== "application/pdf") {
				e.target.value = ""
				validation = true

				createModal(Utils.warningMessage("Únicamente archivos en formato PDF"))
			} else {
				if (onClickUpload)
					onClickUpload(e, row)
			}
		})
	}

	const createCustomSearchField = (props) => {
		return (
			<SearchField
				className='custom-searchfield'
				placeholder='Buscar' />
		)
	}

	const renderShowsTotal = (start, to, total) => {
		return (
			<p>{ start } a {to} de { total }</p>
		)
	}

	const cellEditProp = {
		mode: 'click',
		blurToSave: true,
		beforeSaveCell: onBeforeSaveCell,
		afterSaveCell: onAfterSaveCell
	}

	const selectRowPropCheck = {
		mode: 'checkbox',
		clickToSelect: false,
		selected: selected ? selected: [],
		onSelect: onRowSelect,
		onSelectAll: onSelectAll
	}

	const tableOptions = {
		page: page || 1,
		sizePerPage: sizePerPage || 10,
		pageStartIndex: pageStartIndex || 1,
		paginationSize: paginationSize || 5,
		prePage: '<',
		nextPage: '>',
		paginationShowsTotal: renderShowsTotal,
		paginationPosition: 'bottom',
		withoutNoDataText: false,
		noDataText: create ? " " : 'No hay registros por mostrar',
		hideSizePerPage: true,
		searchField: createCustomSearchField,
		expandRowBgColor: 'rgba(201, 201, 201, 0.2)',
		expanding: toggleTableAll,
		expandBy: 'column'
	}

	let tableColumns = []

	columns.map((option, key) => {
		const itemConfig = {
			dataField: option.id,
			dataSort: option.sort,
			headerAlign: option.headerAlign ? option.headerAlign : 'left',
			dataAlign: option.dataAlign ? option.dataAlign : 'left',
			editable: option.editable ? option.editable : false,
			className: option.className ? option.className : option.index ? "table-column-id" : option.columnaTipo ? "table-column-type" : "table-column-data",
			columnClassName: option.columnClassName ? option.columnClassName: option.index ? "table-column-id" : option.columnaTipo ? "table-column-type" : "table-column-data",
			key: key,
			hidden: option.hidden,
			row: option.row,
			rowSpan: option.rowSpan,
			colSpan: option.colSpan,
			expandable: option.expandable
		}


		tableColumns.push(
			<TableHeaderColumn {...itemConfig}
				dataFormat={(cell, row) => {

					let field = ''

					if (option.type === 'simple') {
						field = row[option.id]
					} else if (option.type === 'object') {
						field = row[[option.object]] ? row[[option.object]][option.id] : ""
					} else if (option.type === 'currency') {
						field = numeral(row[option.id]).format('$ 0,0.00')
					} else if (option.type === 'date') {
						let date = row[option.id]
						field = "No existe la fecha"
						if (date) {
							if (typeof date == 'string') {
								field = moment(date.substr(0, 10),"YYYY-MM-DD").format("DD/MM/YYYY")
							}
						}
					} else if (option.type === 'doc-link') {
						field = <a href="#" onClick={()=>{onClickView(row[option.id])}}><i className="fa fa-paperclip" />&nbsp;{'Ver'}</a>
					} else if (option.type === 'checkbox') {
						field = (<CheckBoxGroup
							id={option.nameOption}
							disabled={option.disabled ? option.disabled : false}
							options={[{name: option.nameOption, checked: row[option.nameOption]}]}
							onChange={(e) => {onClickComponent(e, 'checkbox', row)}} />)
					} else if (option.type === 'radio') {
						field = (<RadioButtonGroup
							id={option.nameOption}
							disabled={option.disabled ? option.disabled : false}
							name={id ? `${id}_${option.nameOption}` : `${row.id}_${option.nameOption}`}
							value={row[option.nameOption]}
							options={[{value: row[option.nameOption], label: ""}]}
							onChange={(e) => {onClickComponent(e, 'radio', row)}} />)
					} else if (option.type === "contrato") {
						field = (<span><a href="#" onClick={() => onClickContract(row)}><i className={"fa fa-download"} /> {'Generar contrato'}</a></span>)
					} else if (option.type === 'reciboPDF') {
						field = (<div>
									{disabled && <label>
										<span className="a-href">
											<input name="reciboDocumento"
													accept="application/pdf"
													type="file"
													style={{display: 'none'}}
													onChange={(e) => {e.preventDefault(); onClickUpload(e, row)}} /> { row[option.id] ? <div><i className="fa fa-refresh" /> Actualizar</div> : <div><i className="fa fa-upload" /> Subir</div> }
										</span>
									</label>}
									&nbsp;
									<label>
										<span>
											<a href="#" className={!row[option.id] ? "a-href-disabled" : ""}
												onClick={ () => {onClickView(row[option.id])} }>
													<i className={`fa ${!row[option.id] ? 'fa fa-eye-slash' : 'fa fa-eye'}`} />&nbsp;{'Ver'}
											</a>
										</span>
									</label>
								</div>)
					} else if (option.type === 'XML') {
						field = (<div>
									{disabled && <label>
										<span className="a-href">
											<input name="xmlDocumento"
													accept="text/xml"
													type="file"
													style={{display: 'none'}}
													onChange={(e) => {e.preventDefault(); onClickUpload(e, row)}} /> { row[option.id] ? <div><i className="fa fa-refresh" /> Actualizar</div> : <div><i className="fa fa-upload" /> Subir</div> }
										</span>
									</label>}
									&nbsp;
									<label>
										<span>
											<a href="#" className={!row[option.id] ? "a-href-disabled" : ""}
												onClick={ !row[option.id] ? () => {onClickUpload(row)} : () => {onClickView(row[option.id])} }>
													<i className={`fa ${!row[option.id] ? 'fa fa-eye-slash' : 'fa fa-eye'}`} />&nbsp;{'Ver'}
											</a>
										</span>
									</label>
								</div>)
					} else if (option.type === 'href') {
						field = <span><a href="#" className={ (row.estadoCambioDestinoId == 2 || row.estadoCambioDestinoId == null) ? 'float-left' : "clean-link" } onClick={()=>{onClickView(row)}}>  {row[option.id]} </a></span>
					}

					return (field)}
				}
		>{option.name}</TableHeaderColumn>)
	})

	if (state) {

		tableColumns.push(

			<TableHeaderColumn headerAlign={'right'} dataAlign={'right'} key={2} dataField={'deleted'}
				className="table-column-state" columnClassName="table-column-state" editable={ false } dataFormat={(cell, row) => {

					let fieldDeleted = <div>{row.deleted ? 'Inactivo' : 'Activo'}</div>

					let fieldEstado = <div>{row.subestado ? row.subestado : ''}</div>

					let field = ''

					if (row.estado) {
						field = <div>{fieldEstado}</div>
					} else {
						field = <div>{fieldDeleted}</div>
					}

					return (field)}
				}
		>{'Estatus'}</TableHeaderColumn>)
	}

	if (!disabled && (edit || remove || process || document || onClickEtapas || custom || certificate || upload )) {
		tableColumns.push(
			<TableHeaderColumn
				rowSpan={rowSpan}
				headerAlign={'center'}
				dataAlign={'center'}
				key={-2}
				expandable={false}
				dataField={'actions'}
				className={equalSize ? equalSize : !document ? "assets-table-action" : ''}
				columnClassName={equalSize ? equalSize : !document ? "assets-table-action" : ""}
				dataFormat={(cell, row) => {

					let editOption = edit && <span className={!row.select ? customStyle : ''}><a href="#" onClick={(e)=>{e.preventDefault(); onClickEdit(row.id ? row.id : row)}}><i className={'fa fa-pencil'} />&nbsp;{'Editar'}</a></span>
					let removeOption = remove && <span><a href="#" onClick={(e)=>{e.preventDefault(); onClickRemove(row.id ? row.id : row)}}><i className={'fa fa-trash'} />&nbsp;{'Eliminar'}</a></span>
					let processOption = process && <span><a href="#" onClick={(e)=>{e.preventDefault(); onClickProcess(row.idTarea ? row.idTarea : row)}}><i className={'fa fa-tasks'} />&nbsp;{row.subestado == 'ADQUIRIDO' ? 'Revisar' : 'Asignar'}</a></span>
					let documentOption = document && <span><a href="#" className={!row.documento.idDocumento ? "a-href-disabled" : ""} onClick={(e)=>{e.preventDefault(); onClickView(row.documento.idDocumento)}}><i className={!row.documento.idDocumento ? 'fa fa-eye-slash ' : 'fa fa-eye'} />&nbsp;{!row.documento.idDocumento ? 'N/A' : 'Ver'}</a></span>
					let etapasOption = onClickEtapas && <span><a href="#" onClick={(e)=>{e.preventDefault(); onClickEtapas(row.id)}}><i className={'fa fa-tasks'} />&nbsp;{'Revisar'}</a></span>
					let customOption = custom && <span><a href="#" onClick={(e)=>{e.preventDefault(); onClickCustom(row.id ? row.id : row)}}><i className={`fa ${custom.fa}`} />&nbsp;{custom.label}</a></span>
					let certificateOption = certificate && <span><a href="#" onClick={(e)=>{e.preventDefault(); onClickCertificate(row.id ? row.id : row)}}><i className={'fa fa-file-pdf-o'} />&nbsp;{'Certificado'}</a></span>
					let uploadOption = upload && <label><span className="a-href"><input name={row.tipo && row.tipo.id ? row.tipo.id : "" } type="file" style={{display: 'none'}} onChange={(e) => {e.preventDefault(); handleChange(e, row)}} /> { row.documento && row.documento.idDocumento ? <div><i className="fa fa-refresh" /> Actualizar</div> : <div><i className="fa fa-upload" /> Subir</div> } </span></label>

					let field = <div>{uploadOption}&nbsp;&nbsp;{documentOption}&nbsp;&nbsp;{editOption}&nbsp;&nbsp;{removeOption}&nbsp;&nbsp;{processOption}&nbsp;&nbsp;{etapasOption}&nbsp;&nbsp;{customOption}&nbsp;&nbsp;{certificateOption}</div>

					return (field)}}
			>{'Acción'}</TableHeaderColumn>)
	}


	if ( arrayLink || onClickArrayLink ) {

		arrayLink.map( item => {
			tableColumns.splice(item.pos ? item.pos: tableColumns.length-1 , 0,
				<TableHeaderColumn
					rowSpan={rowSpan}
					headerAlign={'center'}
					dataAlign={'center'}
					key={-2}
					dataField={'actions'}
					className={equalSize ? equalSize : !document ? "assets-table-action" : ''}
					columnClassName={equalSize ? equalSize : !document ? "assets-table-action" : ""}
					dataFormat={(cell, row) => {
						let arrayLinkOption = item.goTo && <span className={row.evaluacionActiva ? customStyle : ''} ><a href="#" style={{'text-decoration': 'underline'}} onClick={(e)=>{e.preventDefault(); onClickArrayLink(e, row.id ? row.id : row, item.goTo)}}> {item.bodyColumn} </a></span>
						let arraySeleccionOption = item.titleHeader.includes("Selección") && <span><input type="checkbox" defaultChecked={row.select ? row.select : row.notificable } onChange={(e) => {onClickSelecion(e, row.id ? row.id : row)}}  /></span>
						let columnRangosAsignar= item.titleHeader=='Rangos' && <span className={!row.select ? customStyle : ''}><a href="#" onClick={(e)=>{e.preventDefault(); onClickRangosyAsignar(row.id ? row.id : row)}}><i className={'fa fa-bullseye'} />&nbsp; {item.bodyColumn} </a></span>
						let ajusteOption = item.titleHeader=='Ajustes' && <span><Button bsSize="xsmall" disabled={row.proyectoActivo ? true : false} onClick={(e)=>{e.preventDefault(); onClickArrayLink(row.id ? row.id : row)}}> <i className={'fa fa-thumb-tack'} />&nbsp; {item.bodyColumn} </Button></span>
						let radioSelectOption = item.customRadioCheck && <span><input type={ item.customRadioCheck == 'checkbox'  ? 'checkbox' : 'radio' } name="site_name" checked={row.select} onClick={(e)=>{e.preventDefault(); onClickArrayLinkRadioCheck(row.id ? row.id : row)} } /> &nbsp; {item.bodyColumn} </span>
						let changeOption = item.titleHeader=='Acción' && <span><a href="#" className={ (row.estadoCambioDestinoId == 2 || row.estadoCambioDestinoId == null)  ? '' : 'disabled'} onClick={(e)=>{e.preventDefault(); onClickArrayLink(row.id ? row.id : row)}}><i className={row.flagActive ? 'fa fa-eye' : 'fa fa-refresh'} />&nbsp; {row.flagActive ? 'Ver' : item.bodyColumn} </a></span>

						let field = <div>{arrayLinkOption}{arraySeleccionOption}{columnRangosAsignar}{ajusteOption}{radioSelectOption}{changeOption}</div>

						return (field)}}
				>{item.titleHeader}</TableHeaderColumn>
			);
		})
	}

	if ( arrayChange || onClickChangeLink ) {

		arrayChange.map( item => {
			tableColumns.splice(item.pos ? item.pos: tableColumns.length-1 , 0,
				<TableHeaderColumn
					rowSpan={rowSpan}
					headerAlign={'center'}
					dataAlign={'center'}
					key={-2}
					dataField={'actions'}
					className={equalSize ? equalSize : !document ? "assets-table-action" : ''}
					columnClassName={equalSize ? equalSize : !document ? "assets-table-action" : ""}
					dataFormat={(cell, row) => {
						let arrayLinkOption = item.goTo && <span className={row.evaluacionActiva ? customStyle : ''} ><a href="#" style={{'text-decoration': 'underline'}} onClick={(e)=>{e.preventDefault(); onClickChangeLink(e, row.id ? row.id : row, item.goTo)}}> {item.bodyColumn} </a></span>
						let arraySelecciónOption = item.titleHeader.includes("Selección") && <span><input type="checkbox" defaultChecked={row.select ? row.select : row.notificable } onChange={(e) => {onClickSelecion(e, row.id ? row.id : row)}}  /></span>
						let columnRangosAsignar= item.titleHeader=='Rangos' && <span className={!row.select ? customStyle : ''}><a href="#" onClick={(e)=>{e.preventDefault(); onClickRangosyAsignar(row.id ? row.id : row)}}><i className={'fa fa-bullseye'} />&nbsp; {item.bodyColumn} </a></span>
						let ajusteOption = item.titleHeader=='Ajustes' && <span><Button bsSize="xsmall" disabled={row.actualizarProyecto ? true : false} onClick={(e)=>{e.preventDefault(); onClickChangeLink(row.id ? row.id : row)}}> <i className={'fa fa-thumb-tack'} />&nbsp; {item.bodyColumn} </Button></span>
						let radioSelectOption = item.customRadioCheck && <span><input type={ item.customRadioCheck == 'checkbox'  ? 'checkbox' : 'radio' } name="site_name" checked={row.select} onClick={(e)=>{e.preventDefault(); onClickArrayLinkRadioCheck(row.id ? row.id : row)} } /> &nbsp; {item.bodyColumn} </span>
						let changeOption = item.titleHeader=='Acción' && <span><a href="#" onClick={(e)=>{e.preventDefault(); onClickChangeLink(row.id ? row.id : row)}}><i className={row.flagActive ? 'fa fa-eye' : 'fa fa-refresh'} />&nbsp; {row.flagActive ? 'Ver' : item.bodyColumn} </a></span>

						let field = <div>{arrayLinkOption}{arraySelecciónOption}{columnRangosAsignar}{ajusteOption}{radioSelectOption}{changeOption}</div>

						return (field)}}
				>{item.titleHeader}</TableHeaderColumn>
			);
		})
	}

  	return (
		<BootstrapTable
			striped
			tableContainerClass="table-responsive"
			bordered={false}
			pagination={!isNoPagination ? true : false}
			data={data}
			options={tableOptions}
			remote={false}
			selectRow={ selectRowCheck ? selectRowPropCheck : {} }
			cellEdit={ cellEditCheck ? cellEditProp: {} }
			keyField='id'
			search={search}
			footer
			footerData={footerData || []}
			expandableRow={expandableRow}
        	expandComponent={expandComponent}
        	expandColumnOptions={expandColumnOptions}>
				{tableColumns}
		</BootstrapTable>
  	)
}

export default TableData
