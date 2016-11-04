<template>
	<header class="g-hd" :class="{'g-hd-1': article}" v-bind:style="style">
	    <div class="intro">
	        <p class="title">{{article ? article.title : 'JIDE BLOG'}}</p>
	        <p class="descript">{{article ? article.digest : 'ki mi wa da re'}}</p>
	        <p class="date" v-if="article" >{{article.date + ' | ' + article.classes.name}}</p>
	    </div>
	</header>
</template>

<script>
	import { isProduction } from '../../req'

	export default {
		data () {
			return {
				style: {},
				classesName: ''
			}
		},
		props: ['article'],
		computed: {
			style () {
				let pre = isProduction ? '' : 'http://localhost:3000',
					bg = this.article && this.article.bg.ctn

				if (bg) {
					return {
						backgroundImage: 'url(' + pre + bg + ')'
					}
				}
			}
		}
	}
</script>

<style lang="stylus">
	.g-hd
		margin-bottom 60px
		background-color #808080
		background-image url(./../../assets/images/banner.jpg)
		background-repeat no-repeat
		background-position center
		background-size cover

		.intro
			max-width 80%
			padding 150px 0
			margin 0 auto
			color #fff
			text-align center

		.title
			font-size 60px
			font-weight bold
			line-height 1.2

		.descript
			font-size 18px

		&-1
			display flex

			.intro
				text-align left

			.title
				font-weight normal
				margin-bottom 5px

			.descript
				margin-bottom 5px
</style>