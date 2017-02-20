import { getUrl } from './utils.js'




/**
 * getCategory
 *
 * @explain		get all aritcle category
 * @return		Promise
*/

export function getCategory () {
	return new Promise((resolve, reject) => {
		$.get(getUrl('category'), res => {
			resolve(res)
		}, 'json')
	})
}





/**
 * createCategory
 *
 * @explain		create a new category
 * @return		Promise
*/

export function createCategory (data) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: getUrl('category'),
			type: 'put',
			data: data,
			dataType: 'json',
			success: res => resolve(res)
		})
	})
}





/**
 * changeCategory
 *
 * @explain		change a  category
 * @return		Promise
*/

export function changeCategory (params, data) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: getUrl('category', params),
			type: 'post',
			data: data,
			dataType: 'json',
			success: res => resolve(res)
		})
	})
}
