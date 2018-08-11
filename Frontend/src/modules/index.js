import Items from './Items/'
import Date from './Date/'
import File from './File/'
import Login from './Login/'
import Status from './Status/'
import Loading from './Loading'
import Modal from './Modal'

import {combineReducers} from 'redux'

const rootReducer = combineReducers({
	Date,
	File,
	Items,
	Loading,
	Login,
	Modal,
	Status,
});

export default rootReducer
