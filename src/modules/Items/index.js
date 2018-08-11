import * as Utils from 'Assets/Utils'

import ClientHttpRequest from "Api/ClientHttpRequest"
import Immutable from 'immutable'
import { createModal } from 'Modules/Modal'
import {isLoading} from "Modules/Loading"

//Estado inicial predefinido
const initialState = Immutable.Map({}).set('items', new Immutable.List([]))
																			.set('countStatus', new Immutable.List([ [], [], [], [], [] ]))

/* Types */
export const FILTER_ITEMS = 'FILTER_ITEMS'

export const REPLACE_COUNT_STATUS = 'REPLACE_COUNT_STATUS'

/* Reducer */
export default (state = initialState, action) => {
	switch (action.type) {
		case FILTER_ITEMS:
		action.Obj.map((item, i) =>{
			action.Obj[i].lastClabe = '*************'+action.Obj[i].lastClabe;
			action.Obj[i].lastCardNumber = '************'+action.Obj[i].lastCardNumber
		})
		return state.set('items', new Immutable.List(action.Obj))
		case REPLACE_COUNT_STATUS:
			if(action.restart === false){
				let temp = state.get('countStatus').toArray()
				action.Obj.map((countStatus, i) =>{
					(countStatus.length !== 0)?(temp[i] = countStatus):(console.info())
				})
				return state.set('countStatus', new Immutable.List(temp))
			}else {
				return state.set('countStatus', new Immutable.List(action.Obj))
			}
		default:
		return state
	}
}

/* Action Creators */
export const loadItems = (statusActive, date, restart) => {
	return (dispatch) => {

		dispatch(isLoading(true))

		return new ClientHttpRequest({
			service: 'api/report/v1/clientClabe',
			method: "POST",
			data: {
				status:statusActive,
				start: date.start.split(/-/).join(''),
				end: date.end.split(/-/).join('')
			},
			headers: {}
		}).request().then( response => {
			dispatch(isLoading(false))
			dispatch({ type: FILTER_ITEMS, Obj: response.data})

			dispatch({
				type: REPLACE_COUNT_STATUS,
				Obj: [  response.data.filter((item) => item.status === 5 ),
					response.data.filter((item) => item.status === 4 ),
					response.data.filter((item) => item.status === 1 ),
					response.data.filter((item) => item.status === 2 ),
					response.data.filter((item) => item.status === 6 )
				],
				restart: restart
			})

		}).catch(error => {
			dispatch(isLoading(false))
			dispatch(createModal(Utils.errorMessage(Utils.getMessageResponse(error.response.data))))
			throw error
		})
	}
}
