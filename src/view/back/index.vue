<template lang="jade">
	div.b-bd
		div.b-bd-side
			div.box.uk-height-1-1
				h3 Nav
				my-nav
		div.b-bd-main
			router-view
</template>

<script>
	import myNav from '../../components/back/nav.vue'

	export default {
		components: {
			myNav
		}
	}
</script>

<style lang="stylus">
	.b-bd
		display flex
		position absolute
		width 100%
		height 100%
		overflow hidden
	.b-bd-side
		width 200px
		padding 15px
	.b-bd-main
		flex 1
		padding 15px
		overflow-y auto
</style>