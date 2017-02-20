import Vue from 'vue'
import VueRouter from 'vue-router'
import { getUser } from '../module/req'

Vue.use(VueRouter)

import frontHome from '../view/front/index.vue'
import frontArticleList from '../view/front/list.vue'
import frontArticle from '../view/front/article.vue'
import frontAbout from '../view/front/about.vue'
import login from '../view/login/index.vue'
import logout from '../view/login/logout.vue'
import backHome from '../view/back/index.vue'
import backArticleList from '../view/back/list.vue'
import backArticleCategory from '../view/back/category.vue'
import backArticleIntro from '../view/back/article.vue'

const router = new VueRouter({
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
		if (to.hash) {return { selector: to.hash }}
		return { x: 0, y: 0 }
	},
	routes: [
		{ path: '/', component: frontHome,
			children: [
				{ path: '', component: frontArticleList },
				{ path: 'article/:id', component: frontArticle },
				{ path: 'about', component: frontAbout }
			],
			beforeEnter: (to, from, next) => {
				getUser().then(res => {
					res.user && sessionStorage.setItem('user', res.user)
					next()
				})
			}
		},
		{ path: '/login', component: login },
		{ path: '/logout', component: logout },
		{ path: '/admin', component: backHome, meta: {requireAuth: true},
			children: [
				{ path: '', component: backArticleList },
				{ path: 'article', component: backArticleList },
				{ path: 'article/create', component: backArticleIntro },
				{ path: 'article/:id', component: backArticleIntro },
				{ path: 'category', component: backArticleCategory }
			]
		}
	]
})

router.beforeEach((to, from, next) => {
	if (process.env.NODE_ENV === 'production') {
		if (to.matched.some(record => record.meta.requireAuth)) {
			console.log(123)
			sessionStorage.getItem('user')
				? next()
				: next({path: '/login'})
		} else {
			next()
		}
	} else {
		next()
	}
})

export { router }