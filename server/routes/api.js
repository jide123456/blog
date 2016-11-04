const 
	db = require('../module/db')



const login = (req, res) => {
	db.find('users', req.body).then(data => {
		if (data.length == 0) {
			res.end(JSON.stringify({
				code: 1,
				msg: 'Incorrect username or password.' 
			}))
		} else {
			req.session.user = data[0].user

			res.end(JSON.stringify({code: 0}))
		}
	}).then(err => {
		res.end(JSON.stringify(err))
	})
}



module.exports = {
	login: login
}