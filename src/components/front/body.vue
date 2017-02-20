<template lang="jade">
	section.f-bd
		aside.f-bd-side
			slot(name="side")
		main.f-bd-main
			slot(name="main")
</template>

<style lang="stylus">
	.f-bd 
		position relative
		max-width 900px
		min-height 600px
		margin 20px auto

		&-main
		&-side
			padding 10px

		&-side
			position absolute
			top 0
			right -270px
			width 260px
			
			@media screen and (max-width: 769px)
				position static
				width 100%
</style>