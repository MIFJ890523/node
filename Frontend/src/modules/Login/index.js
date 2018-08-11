import * as Utils from 'Assets/Utils'

import ClientHttpRequest from "Api/ClientHttpRequest"
import Immutable from 'immutable'
import { createModal } from 'Modules/Modal'
import {isLoading} from "Modules/Loading"

//Estado inicial predefinido
const initialState = Immutable.Map({}).set('dataUser', new Immutable.Map({user: '', pass:'', loggedIn: true}))

/* Types */
export const CHANGE_DATA_USER = 'CHANGE_DATA_USER'

export const CLICK_LOGIN = 'CLICK_LOGIN'

export const CLICK_LOGIN_OUT = 'CLICK_LOGIN_OUT'

/* Reducer */
export default (state = initialState, action) => {

	switch (action.type) {
		case CHANGE_DATA_USER:
      return state
		case CLICK_LOGIN:
      return state.set('dataUser', new Immutable.Map({user: '', pass:'', loggedIn: true}))
    case CLICK_LOGIN_OUT:
      return state.set('dataUser', new Immutable.Map({user: '', pass:'', loggedIn: false}))
		default:
			return state
	}
}

/* Action Creators */
export const clickLogin = state => {

  return (dispatch) => {
		dispatch(isLoading(true))
		return new ClientHttpRequest({
			service: 'api/auth/v1/authenticate',
			method: "POST",
			data: {
				username: state.username,
				password: state.password
			},
			headers: {}
		}).request().then( response => {
			dispatch(isLoading(false))
      dispatch({ type: CLICK_LOGIN, Obj: response});
		}).catch(error => {
			dispatch(isLoading(false))
			dispatch(createModal(Utils.errorMessage(Utils.getMessageResponse(error.response.data))))
			throw error
		})
	}
}

export const clickLoginOut = () => {
	return (dispatch) => {
		dispatch({ type: CLICK_LOGIN_OUT, Obj: false })
	}
}

export const changeDataUser = state => {
	return (dispatch) => {
		dispatch({ type: CHANGE_DATA_USER, Obj: state})
	}
}
