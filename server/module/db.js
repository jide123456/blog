'use strict'

let
	mongoskin = require('mongoskin'),
	DB,
	db = {}

try {
	let config = require('../config')
	DB = mongoskin.db('mongodb://'+config.user+':'+config.pwd+'@localhost:27017/blog')
}
catch (e) {
	DB = mongoskin.db('mongodb://localhost:27017/blog')
}



db.find = ( collectionName, query = {} , operate = []) => {
	return new Promise((resolve, reject) => {
		let cursor = DB.collection(collectionName).find(query)

		// packaging native mongoDB operate such as Sort
		if (operate.length) {
			operate.forEach(e => {
				cursor = cursor[e.key](e.value)
			})
		}

		cursor.toArray((err, data) => {
			if (err) reject({code: -1, err: err, collectionName: collectionName})

			resolve(data)
		})
	})
}


db.update = ( collectionName, query, options ) => {
	return new Promise((resolve, reject) => {
		DB.collection(collectionName).updateOne(query, options, (err, result) => {
			if (err) reject({ code: -1, err: err, collectionName: collectionName})

			resolve(result)
		})
	})
}

db.insert = ( collectionName, set ) => {
	return new Promise((resolve, reject) => {

		DB.collection('ids').findOneAndUpdate(
			{ name: collectionName },
			{ $inc: {last: 1} },
			{ returnOriginal: false },
			(err, result) => {
				Object.assign(set, {id: result.value.last})

				DB.collection(collectionName).insertOne(set, (err, result) => {
					if (err) reject({code: -1, err: err, collectionName: collectionName})

					resolve(result)
				})
			}
		)
	})
}

db.delete = ( collectionName, query ) => {
	return new Promise((resolve, reject) => {
		DB.collection(collectionName).deleteOne(query, (err, r) => {
			if (err) reject({code: -1, err: err})

			resolve(r)
		})
	})
}

db.DB = DB

module.exports = db