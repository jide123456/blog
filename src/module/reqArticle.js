import { getUrl } from './utils.js'




/**
 * getArticles
 *
 * @explain		get all Article
 * @params		data|Object			请求参数
 * @return		Promise
*/

export function getArticles (data) {
	return new Promise((resolve, reject) => {
		$.get(getUrl('article'), data, res => {
			resolve(res)
		}, 'json')
	})
}




/**
 * getArticle
 *
 * @explain		get one Article
 * @params		params|Object		动态路径参数
 * @params		data|Object			请求参数
 * @return		Promise
*/

export function getArticle (params, data) {
	return new Promise((resolve, reject) => {
		$.get(getUrl('article', params), data, res => {
			resolve(res)
		}, 'json')
	})
}




/**
 * createArticle	
 *
 * @explain		create a new Article
 * @params		data|Object				请求参数
 * @return		Promise
*/

export function createArticle (data) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: getUrl('article'),
			type: 'put',
			data: data,
			dataType: 'json',
			success: res => { resolve(res) },
			error: err => { reject(err) }
		})
	})
}




/**
 * updateArticle	
 *
 * @explain		create a new Article
 * @params		data|Object				请求参数
 * @return		Promise
*/

export function updateArticle (params, data) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: getUrl('article', params),
			type: 'post',
			data: data,
			dataType: 'json',
			success: res => { resolve(res) },
			error: err => { reject(err) }
		})
	})
}




/**
 * removeArticle	
 *
 * @explain		create a new Article
 * @params		data|Object				请求参数
 * @return		Promise
*/

export function removeArticle (params, data) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: getUrl('article', params),
			type: 'delete',
			data: data,
			dataType: 'json',
			success: res => { resolve(res) },
			error: err => { reject(err) }
		})
	})
}