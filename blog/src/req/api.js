import { getUrl } from './url'

let api = {}

api.login = data => {
	return new Promise((resolve, reject) => {

		$.post(getUrl('login'), data, res => {
			resolve(res)
		}, 'json')

	})
}

export default api