<template lang="jade">
	nav.nav.f-flex
		h6.f-flex-item-1 JIDE Blog
		ul.text
			li
				router-link(to="/articles") HOME
</template>

<style lang="stylus">
	.nav
		position absolute
		z-index 99
		top 0
		left 0
		width 100%
		padding 0 20px
		color #fff
		line-height 60px

		li
			display inline

		a
			margin 0 20px
			color inherit
			font-size 14px
			font-weight bold
</style>