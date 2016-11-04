'use strict'

let co = require('co'),
	db = require('./db')

let instance

class Cache {
	constructor (collection = ['articles', 'classes']) {
		this.collection = collection
		this.store = {}
	}

	find (name) {
		return this.toArray(this['store'][name])
	}

	findOne (name, id) {
		return this['store'][name][id]
	}

	log () {
		let _self = this
		console.log(_self['store'])
	}

	init () {
		this.reload()
	}

	reload () {
		let _self = this, 
			temp = {}

		temp.classes = db.find('classes')
		temp.articles = db.find('articles', {}, [{key: 'sort', value: {id: -1}}])

		co(function *(){
			let { articles, classes } = yield temp

			classes = _self.toObject(classes)
			
			// To convert the references to instances
			articles = _self.toObject(_self.convert(articles, 'classes', classes))

			_self.save('classes', classes)
			_self.save('articles', articles)
		})
	}

	save (name, data) {
		this['store'][name] = data

	} 

	toObject (array, name='id') {
		let map = {}

		array.forEach((element, index) => {
			map[element[name]] = element

			map[element[name]]['_index'] = index
		})

		return map
	}

	toArray (object) {
		let array = [], key

		for (key in object) {
			let cur = object[key]

			array[cur['_index']] = cur
		}

		return array
	}

	// To convert the references to instances
	convert (self, field, mirror) {
		let temp = this.clone(self)

		if (temp instanceof Array) {
			temp.forEach((element) => {
				element[field] = mirror[element[field]]
			})
		} else {
			temp[field] = mirror[element[field]]
		}

		return temp
	}

	clone (copy) {
		if (typeof copy === 'object' && copy) {
			let temp

			if (copy instanceof Array) {
				temp = []

				copy.forEach(element => {
					temp.push(element)
				})
			} else {
				temp = {}

				Object.keys(copy).forEach(element => {
					temp[element] = copy[element]
				})
			}

			return temp
		}

		return copy
	}
}

module.exports = () => {
	if (instance) {
		return instance
	} else {
		instance = new Cache()
		return instance
	}
}
