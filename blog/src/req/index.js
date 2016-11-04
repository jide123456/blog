import articles from './articles'
import classes from './classes'
import api from './api'
import { isProduction } from './url'

let resource = {
	articles: articles,
	classes: classes
}

export { resource, api, isProduction }