// initialize
require('../module/cache')().init()



const 
	express = require('express'),
	articles = require('./articles'),
	classes = require('./classes'),
	api = require('./api'),
	
	resourceRouter = express.Router(),
	apiRouter = express.Router()



// url                      type        description                       require Login

// /resource/articles        get         get all article                  false
// /resource/articles        put         create new article               true
// /resource/articles/13     get         get one article by id            false
// /resource/articles/13     post        update one article by id         true
// /resource/articles/13     delete      delete one article by id         true

// /resource/classes         get         get all classes                  false
// /resource/classes         put         create new class                 true
// /resource/classes/13      post        update class by id               true
// /resource/classes/13      delete      delete class by id               true

// /login                    post        login

resourceRouter.use((req, res, next) => {
	let method = req.method,
		user = req.session.user

	// verify permissions
	if (process.env.NODE_ENV === 'production') {
		if (method == 'POST' || method == 'PUT' || method == 'DELETE') {
			if (!user) {
				res.end(JSON.stringify({
					code: 40001,
					msg: 'limited authority'
				}), 'utf8')

				return
			}
		}
	}

	next()
})

// /resource/articles
resourceRouter.get('/articles', articles.get)
resourceRouter.put('/articles', articles.put)

// /resource/articles/:id
resourceRouter.get('/articles/:id', articles.getOne)
resourceRouter.post('/articles/:id', articles.post)
resourceRouter.delete('/articles/:id', articles.delete)

// /resource/classes
resourceRouter.get('/classes', classes.get)
resourceRouter.put('/classes', classes.put)

// /resource/classes/:id
resourceRouter.post('/classes/:id', classes.post)



// /api/login
apiRouter.post('/login', api.login)



module.exports = {
	resource: resourceRouter,
	api: apiRouter
}
