import * as Utils from 'Assets/Utils'

import ClientHttpRequest from "Api/ClientHttpRequest"
import Immutable from 'immutable'
import { createModal } from 'Modules/Modal'
import {isLoading} from "Modules/Loading"

import moment from "moment"

//Estado inicial predefinido
const initialState = Immutable.Map({})
	.set('statusActive', new Immutable.Map({
    statusActive: '1'
  })
)

/* Types */
export const REPLACE_STATUS_ACTIVE = 'REPLACE_STATUS_ACTIVE'


/* Reducer */
export default (state = initialState, action) => {

	switch (action.type) {
		case REPLACE_STATUS_ACTIVE:
      return state.set('statusActive', new Immutable.Map({statusActive: action.Obj}))
		default:
			return state
	}
}

/* Action Creators */
export const changeStatus = status => {
	return (dispatch) => {
		dispatch({ type: REPLACE_STATUS_ACTIVE, Obj: status })
	}
};
