<template lang="jade">
	div.uk-text-center.uk-margin-large-top.uk-h3
		p(v-show="!success") 正在登出中...
		div(v-show="success")
			p 已登出， 
				router-link(to="/") 点击返回首页
</template>

<script>
	import { logout } from '../../module/req'

	export default {
		data () {
			return {
				success: false
			}
		},
		mounted () {
			const that = this

			logout().then(res => {
				that.success = true
			})
		}
	}
</script>