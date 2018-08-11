import { each, extend, filter, findWhere, indexOf, isArray, isEqual, map, omit, sortBy, groupBy, union, where, without, uniq, clone } from 'underscore'

import Labels from 'Assets/Labels'
import React from 'react'
import moment from 'moment'

const styles = {
	msg: {
		body: {display: "flex", alignItems: 'center', justifyContent: 'center', textAlign: 'justify'},
		icon: {marginRight: '14px', fontSize: '36px'}
	}
}

const uuidv4 = require('uuid/v4')

export const infoMessage = (message) => {
	let modalObj = {
		body: <div style={styles.msg.body}>
			<i style={styles.msg.icon} className="fa fa-envelope mb12" />
			<p>{message}</p>
		</div>
	}
	return modalObj
}

export const uniqArray = (list, item) => {
	return uniq(list, item)
}

export const groupedBy = (list, item) => {
	return map(groupBy(list, item), clist => clist.map(i => omit(i, item)))
}

export const isValidEmail = (mail) => {
	return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(mail)
}

export const isValidRFC = (rfc) => {
	return /^([A-ZÑ]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z\d][A-Z\d][A-Z\d]))$/.test(rfc)
}

export const getItems = (list, item) => {
	return where(list, item)
}

export const removeItem = (list, item) => {

	let elements = where(list, item)

	if (elements && elements.length > 0) {

		let listElements = list

		elements.map( item => {
			listElements = without(listElements, item)
		})

		return listElements

	} else {
		return list
	}
}

export const removeItemByPositions = (list, ini, end) => {
	return list.filter( (item, index) => {
		if ( index < ini || index > end ) return item
	} );
}

export const cleanPositionInArray = (list, ini, end, key, value) => {
	const newList = list.map(a => Object.assign({}, a));

	return newList.map( (item, index) => {
		if( index >= ini && index <= end ){ item[key] = value; return item; }
		else return item
	} );
}

export const filterItem = (list, item) => {
	return filter(list, function(value){ return value.cp.includes(item.cp) })
}

export const unionArray = (list1, list2) => {
	return union(list1, list2)
}

export const getUUID = () => {
	return uuidv4()
}

export const isChange = (object, other) => {
	return isEqual(object, other)
}

export const sortByAttr = (list, attr) => {
	return sortBy(list, attr)
}

export const containsItem = (list, item) => {
	return findWhere(list, item) ? true : false
}

export const getItem = (list, item) => {
	return findWhere(list, item)
}

export const indexOfItem = (list, item) => {
	return indexOf(list, item)
}

export const getListPropsOmit = (list, props) => {
	return map(list, function(o) { if (o.tmp || o.custom || o.id) { return omit(o, props) } else { return o }})
}

export const getObjPropsRemove = (obj, props) => {
	return omit(obj, props)
}

export const replaceObject = (list, item, newItem) => {
	return extend(findWhere(list, item), newItem)
}

export const getMessageResponse = (response) => {

	let message = Labels.errorMessage

	if (response.message) {
		message = response.message
	} else if (response.descripcionError) {
		message = response.descripcionError
	} else if (response.errorMessage){
		message = response.errorMessage
	}

	return message
}

export const questionMessage = (message, okClick, cancelClick) => {
	let modalObj = {
		body: <div style={styles.msg.body}>
			<i style={styles.msg.icon} className="fa fa-question-circle text-info mb12" />
			<p>{message}</p>
		</div>,
		footer: [{
			txt: "No",
			type: "default",
			onClick: cancelClick
		},
		{
			txt: "Si",
			type: "success",
			onClick: okClick
		}]
	}

	return modalObj
}

export const warningMessage = (message) => {
	let modalObj = {
		body: <div style={styles.msg.body}>
			<i style={styles.msg.icon} className="fa fa-exclamation-triangle or mb12" />
			<p>{message}</p>
		</div>
	}
	return modalObj
}

export const showMessage = (message) => {
	let modalObj = {
		closeButton: true,
		body: <div style={styles.msg.body}>
			<i style={styles.msg.icon} className="fa fa-check gr mb12" />
			<p>{message}</p>
		</div>
	}

	return modalObj
}

export const customMessage = (title, message, closeButton) => {
	let modalObj = {
		closeButton,
		body: <p>{ message }</p>
	}

	return modalObj
}

export const errorMessage = (message) => {
	let modalObj = {
		body: <div style={styles.msg.body}>
			<i style={styles.msg.icon} className="fa fa-times-circle rd mb12" />
			<p className={message.length > 52 ? "textOverflow" : ""}>{message}</p>
		</div>
	}

	return modalObj
}

export const successMessage = () => {
	let modalObj = {
		body: <div style={styles.msg.body}>
			<i style={styles.msg.icon} className="fa fa-check gr mb12" />
			<p>{Labels.successMessage}</p>
		</div>
	}

	return modalObj
}

export const clearNullAndEmpty = (jsonObj) => {

   each(jsonObj, function(value, key){
        if (value === "" || value === null){
            delete jsonObj[key]
        } else if (Object.prototype.toString.call(value) === '[object Object]') {
            clearNullAndEmpty(value)
        } else if (isArray(value)) {
            each(value, function (k,v) { clearNullAndEmpty(v) })
        }
    })
}

export const isNullOrEmpty = (jsonObj) => {

	let result = false

	each(jsonObj, function(value){
		if (value === "" || value === null){
			result = true
		} else if (Object.prototype.toString.call(value) === '[object Object]') {
			isNullOrEmpty(value)
		} else if (isArray(value)) {
			each(value, function (k,v) { isNullOrEmpty(v) })
		}
	})

	return result
}

export const setDefaultValues = (object) => {

	let jsonObj = Object.assign({}, object)

	each(jsonObj, function(value, key){
		if (typeof value === "string"){
			jsonObj[key] = ''
		} else if (typeof value === "number"){
			jsonObj[key] = ''
		} else if (typeof value === "boolean"){
			jsonObj[key] = false
		} else if (Object.prototype.toString.call(value) === '[object Object]') {
			clearNullAndEmpty(value)
		} else if (isArray(value)) {
			jsonObj[key] = []
		}
	})

	return jsonObj
}

export const isBefore = (date1, date2) => {
	return moment(date1).isBefore(date2)
}

export const isAfter = (date1, date2) => {
	return moment(date1).isAfter(date2)
}

export const formatDate = (date) => {
	return moment(new Date(date).toISOString()).format('YYYY-MM-DD')
}

export const getToday = () => {
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1;
	let yyyy = today.getFullYear();

	if(dd<10)
		dd = '0'+dd
	if(mm<10)
		mm = '0'+mm

	today = mm + '/' + dd + '/' + yyyy;
	return today
}
