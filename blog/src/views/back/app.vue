<template lang="jade">
	div.uk-flex.uk-position-absolute.uk-width-1-1.uk-height-1-1
		div.g-sd
			my-nav
		div.g-mn.uk-flex-item-1
			router-view
</template>

<script>
	import 'uikit/dist/css/uikit.gradient.min.css'
	import 'uikit/dist/css/components/notify.gradient.min.css'
	import 'uikit/dist/css/components/tooltip.gradient.min.css'
	import 'uikit'
	import 'uikit/dist/js/components/notify.js'
	import 'uikit/dist/js/components/tooltip.js'
	import '../../assets/css/reset.css'

 
	import myNav from '../../components/back/nav.vue'

	export default {
		components: {
			myNav
		}
	}
</script>

<style lang="stylus">
	.g-sd
		width 200px
		border-right 1px solid #e5e5e5

	.g-mn
		padding 30px 15px
</style>