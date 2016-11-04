<template lang="jade">
	div
		my-head(:article="article")

		section.g-container.f-flex
			main.g-mn.f-flex-item-1
				div.markdown-body(v-html="article.html")

			aside.g-sd
				side-class
				side-about

		my-foot
</template>

<script>
	import myHead from '../../components/front/head.vue'
	import myFoot from '../../components/front/foot.vue'
	import sideClass from '../../components/front/class.vue'
	import sideAbout from '../../components/front/about.vue'
	import listItem from '../../components/front/item.vue'

	import { resource } from '../../req'

	export default {
		data () {
			return {
				article: {}
			}
		},
		components: {
			myHead,
			myFoot,
			sideClass,
			sideAbout,
			listItem
		},
		beforeRouteEnter (to, from, next) {
			resource.articles.getOne(to.params).then(res => {
				next(vm => {
					vm.article = res.article
				})
			})
		}
	}
</script>

<style lang="stylus">
	.markdown-body
		font-size 15px
		line-height 1.6
		padding-bottom 2em

		&>*
			margin 0 0 20px

		h1,h2,h3
			border-bottom 1px solid #e5e5e5

		h1
			font-size 2em
		h2
			font-size 1.8em
		h3
			font-size 1.6em
		h4
			font-size 1.4em
		h5
			font-size 1.2em
		h6
			font-size 1em

		p
			text-align justify
		ul
			padding-left 40px
		li
			list-style disc
		pre
			padding 8px
			border 1px solid #c7cfd5
			background #f1f5f9
			text-align left
		table
			display block
			width 100%
			overflow auto
			border-collapse collapse
			border-spacing 0
			word-break normal
			word-break keep-all

		thead tr,table tr:nth-child(2n)
			background-color #f8f8f8

		th, td
			padding 6px 13px
			border 1px solid #ddd
		tr
			background-color #fff
			border-top 1px solid #ccc
		blockquote
				color #666
			    border-left 4px solid #ddd
			    padding-left 20px
			    margin-left 0
			    font-size 14px
			    font-style italic

</style>
