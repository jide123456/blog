<template lang="jade">
	div.uk-flex.uk-flex-middle.uk-flex-center.uk-position-top.uk-width-1-1.uk-height-1-1
		form.uk-form(v-on:submit.prevent="submit")
			div.uk-form-row
				input( v-model="user", placeholder="user" required)
			div.uk-form-row
				input( v-model="password", type="password", placeholder="password" required)
			div.uk-form-row
				button.uk-button.uk-width-1-1.uk-button-primary Login
</template>

<script>
	import { login, handleRes } from '../../module/req'

	export default {
		data () {
			return {
				user: '',
				password: ''
			}
		},
		methods: {
			submit () {
				const that = this

				login({user: that.user, password: that.password}).then(res => {
					if(handleRes(res, {successMsg: '登陆成功'})) {
						sessionStorage.setItem('user', res.user)
						that.$router.push('/admin')
					}
				})
			}
		},
		beforeRouteEnter (to, from, next) {
			sessionStorage.getItem('user')
				? next({path: '/admin'})
				: next()
		}
	}
</script>