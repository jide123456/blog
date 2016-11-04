import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let router = new VueRouter({
	routes: [
		{	
			path: '/', 
			component: r => {require.ensure(['../views/front/app.vue'], () => {r(require('../views/front/app.vue'))})},
			redirect: 'articles',
			children: [
				{path: 'articles', component: r => {require.ensure(['../views/front/list.vue'], () => {r(require('../views/front/list.vue'))})}},
				{path: 'articles/:id', component: r => {require.ensure(['../views/front/article.vue'], () => {r(require('../views/front/article.vue'))})}}
			]
		},
		{	
			path: '/admin',
			component: r => {require.ensure(['../views/back/app.vue'], () => {r(require('../views/back/app.vue'))})},
			children: [
				{path: 'login', component: r => {require.ensure(['../views/back/login.vue'], () => {r(require('../views/back/login.vue'))})}},
				{path: 'classes', component: r => {require.ensure(['../views/back/classes.vue'], () => {r(require('../views/back/classes.vue'))})}},
				{path: 'articles', component: r => {require.ensure(['../views/back/list.vue'], () => {r(require('../views/back/list.vue'))})}},
				{path: 'articles/create', component: r => {require.ensure(['../views/back/create.vue'], () => {r(require('../views/back/create.vue'))})}},
				{path: 'articles/:id', component: r => {require.ensure(['../views/back/create.vue'], () => {r(require('../views/back/create.vue'))})}}
			],
			redirect: '/admin/articles',
			beforeEnter (to, from, next) {
				let temp = Number(to.path == '/admin/login') + '-' + Number(sessionStorage.getItem('isLogin'))

				switch (temp) {
					case '1-1':
						next('/admin/articles')
						break
					case '0-0':
						next('/admin/login')
						break
					default:
						next()
						break
				}
			}
		},
		{
			path: '*',
			redirect: '/articles'
		}
	],
	scrollBehavior (to, from, savedPosition) {
	 	return { x: 0, y: 0 }
	},
	mode: 'history'
})



export { router }