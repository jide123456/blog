<template lang="jade">
	#app
		router-view
</template>

<style lang="stylus">
	body
		font-family "Proxima Nova", "Helvetica Neue", Helvetica, PingFangSC-Light, STHeiTi, "Microsoft YaHei", Arial, sans-serif !important
		line-height 1.5 !important
		font-size 16px !important

	h1,h2,h3,h4,h5,h6
		font-family "Proxima Nova", "Helvetica Neue", Helvetica, PingFangSC-Light, STHeiTi, "Microsoft YaHei", Arial, sans-serif !important

	*
		box-sizing border-box

		address:last-child 
		blockquote:last-child 
		dl:last-child
		p:last-child 
		pre:last-child 
		ul:last-child 
			margin-bottom 0

	.box
		padding 10px
		border 1px solid #c8d7e1
		border-radius 4px
		margin-bottom 25px
		background #fff

		&:last-child
			margin-bottom 0

		@media screen and (max-width: 769px)
			margin-bottom 20px

	.pd15
		padding 15px
</style>