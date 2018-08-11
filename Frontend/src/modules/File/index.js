import * as Utils from 'Assets/Utils'

import ClientHttpRequest from "Api/ClientHttpRequest"
import Immutable from 'immutable'
import { createModal } from 'Modules/Modal'
import {isLoading} from "Modules/Loading"

import FileDownload  from 'js-file-download'

//Estado inicial predefinido
const initialState = Immutable.Map({}).set('statusFile', false)

/* Types */
export const REPLACE_STATUS_FILE = 'REPLACE_STATUS_FILE'

/* Reducer */
export default (state = initialState, action) => {

	switch (action.type) {
		case REPLACE_STATUS_FILE:
			return state.set('statusFile', new Immutable.List(action.Obj))
		default:
			return state
	}
}

/* Action Creators */
export const downloadFile = (typeFile) => {
	return (dispatch) => {

		dispatch(isLoading(true))

		return new ClientHttpRequest({
			service: 'api/report/v1/fileCsv/',
			method: "POST",
			data: {
				typeFile: typeFile
			},
			headers: {}
		}).request().then( response => {
			dispatch(isLoading(false))
		
			if(typeFile === 'CERTIFICATION'){
				FileDownload(response.data.file, 'Certificacion_SPEIDisp_cta_chq_'+response.data.date+'.csv')
			}else {
				FileDownload(response.data.file, 'Debito_Certificacion_DDA_'+response.data.date+'.csv')
			}

		}).catch(error => {
			dispatch(isLoading(false))
			dispatch(createModal(Utils.errorMessage(Utils.getMessageResponse(error.response.data))))
			throw error
		})
	}
}
