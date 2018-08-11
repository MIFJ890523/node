import * as Utils from 'Assets/Utils'

import ClientHttpRequest from "Api/ClientHttpRequest"
import Immutable from 'immutable'
import { createModal } from 'Modules/Modal'
import {isLoading} from "Modules/Loading"

import moment from "moment"

//Estado inicial predefinido
const initialState = Immutable.Map({})
.set('date', new Immutable.Map({
  day: moment().add(1, 'day').format('YYYY-MM-DD'),
  start: moment().subtract(1, 'year').format('YYYY-MM-DD'),
  end: moment().format('YYYY-MM-DD')
})
)

/* Types */
export const REPLACE_DATA_START = 'REPLACE_DATA_START'

export const REPLACE_DATA_END = 'REPLACE_DATA_END'

/* Reducer */
export default (state = initialState, action) => {

  let date = '';

  switch (action.type) {
    case REPLACE_DATA_START:
    let start = moment(action.Obj).format('YYYY-MM-DD')
    if(start <= state.get('date').get('end') && start < state.get('date').get('day')){
      return state.updateIn([ 'date', 'start' ], value => start)
    }else {
      return state
    }

    case REPLACE_DATA_END:
    let end = moment(action.Obj).format('YYYY-MM-DD')
    if(end >= state.get('date').get('start') && end < state.get('date').get('day')){
      return state.updateIn([ 'date', 'end' ], value => end)
    }else {
      return state
    }
    
    default:
    return state
  }
}

/* Action Creators */
export const changeDataStart = date => {
  return (dispatch) => {
    dispatch({ type: REPLACE_DATA_START, Obj: date })
  }
}

export const changeDataEnd = date => {
  return (dispatch) => {
    dispatch({ type: REPLACE_DATA_END, Obj: date })
  }
}
