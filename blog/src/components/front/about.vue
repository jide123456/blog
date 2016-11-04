<template lang="jade">
	section.about-panel.panel.f-spacing.f-spacing-little
		h4.title ABOUT
		img.avatar(src="../../assets/images/avatar.jpg")
		p.intro 偶尔会健忘
		a.github(href="https://github.com/jide123456")
</template>

<style lang="stylus">
	.about-panel
		.avatar
			overflow hidden
			width 160px
			height 160px
			border-radius 4px

		.intro
			color #666
			font-size 14px

		.github
			display inline-block
			width 30px
			height 30px
			background url(../../assets/images/github.png) no-repeat

			&:hover
				background-position -30px 0
</style>