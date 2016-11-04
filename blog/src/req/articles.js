import { getUrl } from './url'

let articles = {}

articles.get = ( data = {} ) => {
	return new Promise((resolve, reject) => {

		$.get(getUrl('articles'), data, res => {
			resolve(res)
		},'json')

	})
}

articles.getOne = params => {
	return new Promise((resolve, reject) => {

		$.get(getUrl('articlesOne', params), res => {
			resolve(res)
		},'json')

	})
}

articles.update = ( params, data ) => {
	return new Promise((resolve, reject) => {

		$.post(getUrl('articlesOne', params), data, res => {
			resolve(res)
		},'json')

	})
}

articles.put = data => {
	return new Promise((resolve, reject) => {

		$.ajax({
			url: getUrl('articles'),
			type: 'put',
			data: data,
			dataType: 'json',
			success: res => { resolve(res) }
		})

	})
}

articles.delete = (params, data) => {
	return new Promise((resolve, reject) => {

		$.ajax({
			url: getUrl('articlesOne', params),
			type: 'delete',
			data: data,
			dataType: 'json',
			success: res => { resolve(res) }
		})

	})
}



export default articles
