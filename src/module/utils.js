/*
 * 动态路径模板
*/

const URL = {
	article: '/resource/article/:id',
	category: '/resource/category/:id',
	user: '/resource/user',
	login: '/api/login',
	logout: '/api/logout'
}




/**
 * getUrl
 *
 * @explain		get real url
 * @params		urlName|String		URL中的属性名
 * @params		params|Object		动态路径参数
 * @return		String				请求地址
*/ 

export function getUrl (urlName, params={}) {
	const url = URL[urlName].replace(/:(\w+)/g, (match, key) => {
		/* 
		 * 没有匹配到模板参数时，
		 * 从模板路径中去除模板字符串
		*/
		return params[key] || ''
	})

	return process.env.NODE_ENV === 'production'
		? url
		: `http://localhost:3000${url}`
}