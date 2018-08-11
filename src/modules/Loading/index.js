import Immutable from 'immutable'

const initialState = Immutable.Map({}).set('isLoading', false).set('counter',0)

/* Types */
export const INC_COUNTER = 'INC_COUNTER'
export const DEC_COUNTER = 'DEC_COUNTER'

/* Reducer */
export default (state = initialState, action) => {
	let counter
	switch (action.type) {
		case INC_COUNTER:
			counter = state.get('counter') + 1
			if (counter) {
				return state.set('counter', counter).set('isLoading',true)
			} else {
				return state.set('counter',counter)
			}
		case DEC_COUNTER:
			counter = state.get('counter') - 1
			if (!counter) {
				return state.set('counter', counter).set('isLoading',false)
			} else {
				return state.set('counter',counter)
			}
		default:
			return state
	}
}

/* Action Creators */
export const isLoading = (flag) => {
	return  (dispatch) => {
		if (flag) {
			dispatch({type: INC_COUNTER})
		} else {
			dispatch({type: DEC_COUNTER})
		}
	}
}
