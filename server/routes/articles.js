const
	fs = require('fs'),
	path = require('path')
	marked = require('marked'),
	moment = require('moment'),
	co = require('co')

	Cache = require('../module/cache')(),
	db = require('../module/db')



let articles = {}



// save img 
const saveImg = imgObj => {
	return new Promise((resolve, reject) => {
		fs.writeFile(
				path.resolve(__dirname, '../public/upload/articles/', imgObj.name),
				new Buffer(imgObj.ctn.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
				err => {
					console.log(err)
					if (err) {reject({type: 'saveImg error', err:err})}
					else {resolve()}
				}
			)
	})
}



// get all articles
articles.get = (req, res) => {
	let cache = Cache.find('articles'),
		filter = req.query.filter || 'all',
		temp = []

	if (filter == 'all') {
		temp = cache
	}
	else {
		cache.forEach((element, index) => {
			element.classes.name == filter && temp.push(element)
		})
	}

	res.end(JSON.stringify({
		code: 0,
		articles: temp
	}))
}



// get one article by id
articles.getOne = (req, res) => {
	let id = req.params.id

	res.end(JSON.stringify({
		code: 0,
		article: Cache.findOne('articles', id) || null
	}))
}



// upload one article by id
articles.post = (req, res) => {
	let id = Number(req.params.id),
		data = JSON.parse(req.body.data),
		task = [],
		imgObj = Object.assign({}, data.article.bg) 

	// pre-process data
	delete data.article._id // delete existing '_id' field because mongoDB not support update '_id' field 
	delete data.article.timestamp  // not update 'timestamp', 'date', '_index' field
	delete data.article.date
	delete data.article._index

	data.article.html = marked(data.article.markdown)
	data.article.bg.ctn = '/upload/articles/' + data.article.bg.name

	task.push(db.update('articles', {id: id}, {$set: data.article}))

	if (data.changeBg) {
		task.push(saveImg(imgObj))
	}

	if (data.changeClasses) {
		task.push(db.update('classes', {id: data.article.classes}, {$push: {articles: id}}))
		task.push(db.update('classes', {id: data.oldClasses}, {$pull: {articles: id}}))
	}

	co(function *(){
		let results = yield task

		if (results[0].result.n) {
			Cache.reload()

			res.end(JSON.stringify({
				code: 0
			}))
		}
	}).catch(err => {
		res.end(JSON.stringify(err))
	})
}



// create new article
articles.put = (req, res) => {
	let data = JSON.parse(req.body.data)

	// save background image
	saveImg(data.bg).then(() => {
		// success
		// pre-process for insert article
		data.bg.ctn = '/upload/articles/' + data.bg.name
		data.html = marked(data.markdown)
		data.date = moment(Number(data.timestamp)).format('YYYY-MM-DD HH:hh')

		// insert article
		return db.insert('articles', data)
	}).then(r => {
		let ok = r.result.n

		data = r.ops[0]

		if (!ok) {throw {code: 1, type: 'insertError', msg: '0 data is inserted at articles'}}
			
		// insert article id to classes
		return db.update('classes', {id: data.classes}, {$push: {articles: data.id}})
	}).then(r => {
		if (!r.result.n) {throw {code: 1, type: 'updateError', msg: '0 data is updated at classes'}}

		Cache.reload()

		res.end(JSON.stringify({
			code: 0,
			result: data
		}))

		console.log(333)

	}).catch(err => {
		res.end(JSON.stringify(err))
	})
}


// delete one article by id
articles.delete = (req, res) => {
	let articleId = Number(req.params.id),
		classesId = JSON.parse(req.body.data).classes

	co(function *(){
		yield db.delete('articles', {id: articleId})
		yield db.update('classes', {id: classesId}, {$pull: {articles: articleId}})

		Cache.reload()

		res.end(JSON.stringify({code: 0}))
	}).catch(err => {
		res.end(JSON.stringify(err))
	})
}



module.exports = articles