// NODE_ENV 
const isProduction = process.env.NODE_ENV === 'production'

const urlMap = {
	articles: '/resource/articles',
	articlesOne: '/resource/articles/:id',
	classes: '/resource/classes',
	classesOne: '/resource/classes/:id',
	login: '/api/login'
}

// util method
// replace url-template to params

const getUrl = (name, params = {}) => {
	let url = urlMap[name]

	url = url.replace(/:(\w+)/g, (match, key) => {
		return params[key]
	})

	return isProduction ? url : 'http://localhost:3000' + url
}



export { isProduction, getUrl }