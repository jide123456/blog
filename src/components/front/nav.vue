<template lang="jade">
	div.f-nav.a-gradient.a-animation-mobile-remove
		p.f-nav-logo JIDE BLOG
		nav
			ul.f-nav-links
				li.f-nav-links-wrap
					router-link.f-nav-links-item(to='/') HOME
				li.f-nav-links-wrap
					router-link.f-nav-links-item(to='/about') ABOUT
</template>

<style lang="stylus">
	.f-nav
		display flex
		position absolute
		z-index 10
		top	0
		left 0
		width 100%
		height 50px
		padding 0 20px
		background-color rgba(0,0,0,0)
		align-items center
		color #fff
		transition all .4s ease
		@media screen and (max-width: 769px)
			background-color rgba(0,0,0,.4)

		&:hover
			background-color rgba(0,0,0,.4)

		&-logo
			margin 0 auto 0 0
			
		&-links
			display flex
			margin 0
			padding 0

		&-links-wrap
			margin-left 20px
			list-style none

		&-links-item
			color #fff

			&:hover
				color #fff
				text-decoration underline

	.a-gradient
		animation gradient 1s linear both
		animation-delay 1s

	.a-animation-mobile-remove
		@media screen and (max-width: 769px)
			animation none
				
	@keyframes gradient
		from
			background rgba(0,0,0,.5)
		to
			background rbga(0,0,0,0)
</style>