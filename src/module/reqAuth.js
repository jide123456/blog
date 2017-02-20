import { getUrl } from './utils.js'

export function getUser () {
	return new Promise((resolve, reject) => {
		$.get(getUrl('user'), res => {
			resolve(res)
		}, 'json')
	})
}

export function login (data) {
	return new Promise ((resolve, reject) => {
		$.ajax({
			url: getUrl('login'),
			type: 'post',
			data: data,
			dataType: 'json',
			success: res => { resolve(res) },
			error: err => { reject(err) }
		})
	})
}

export function logout () {
	return new Promise((resolve, reject) => {
		$.get(getUrl('logout'), res => {
			resolve(res)
		}, 'json')
	})
}