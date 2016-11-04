<template lang="jade">
	div.login-from.uk-flex.uk-flex-middle.uk-flex-center.uk-position-top.uk-width-1-1.uk-height-1-1
		form( v-on:submit.prevent="submit" )
			input( v-model="user", placeholder="user" required)
			input( v-model="password", type="password", placeholder="password" required)
			button.btn.uk-width-1-1 Login
</template>

<script>
	import { api } from '../../req'
	import { handleRes } from '../../handle'

	export default {
		data () {
			return {
				user: '',
				password: ''
			}
		},
		methods: {
			submit () {
				let _self = this

				api.login({user: _self.user, password: _self.password}).then(res => {
					let r = handleRes(res, {errorMsg: '账号或密码错误', successMsg: '登录成功'})

					if (r) {
						sessionStorage.setItem('isLogin', '1')
						_self.$router.push({ path: '/admin/articles' })
					}
				})
			}
		}
	}
</script>

<style lang="stylus">
	.login-from
		background #fff

		input,
		button
			display block
			margin-bottom 10px
			padding 4px 12px
			border-radius 4px
			border 1px solid #d5d5d5

		input
			padding 2px 4px

		.btn
			color #fff
			border-color rgba(0, 0, 0, .2)
			background-image linear-gradient(#00b4f5, #008dc5)
			
			&:active
				background #008abf
</style>
