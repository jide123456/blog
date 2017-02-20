<template lang="jade">
	header.f-hd(:style="style")
		div
			h1.f-hd-title {{title}}
			p.f-hd-description {{description}}
</template>

<script>
	export default {
		props: ['title', 'bgUrl', 'description'],
		computed: {
			style () {
				return this.bgUrl
					? {backgroundImage: `url(${this.bgUrl})`}
					: {}
			}
		}
	}
</script>

<style lang="stylus">
	.f-hd
		display flex
		align-items center
		justify-content center
		height 450px
		padding 0 10px
		text-align center
		color #fff
		background-color #808080
		background-image url(../../assets/images/banner.jpg)
		background-position center
		background-repeat no-repeat
		&-title
			font-size 5em
			color #fff
			line-height 1.2
			@media screen and (max-width 769px)
				font-size 2em !important

	.f-hd-1 .f-hd-title
		font-size 3.8em
</style>