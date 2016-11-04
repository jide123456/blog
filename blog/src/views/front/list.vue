<template lang="jade">
	div
		my-head

		section.g-container.f-flex
			main.g-mn.f-flex-item-1
				transition(name="fade")
					ul.article-list(v-show="articles.length")
						list-item(v-for="item in articles", :item="item")
				p.none(v-show="!articles.length") 暂无内容

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
				articles: []
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
			resource.articles.get(to.query).then(res => {
				next(vm => {
					vm.articles = res.articles
				})
			})
		},
		watch: {
			$route () {
				let _self = this

				resource.articles.get(_self.$route.query).then(res => {
					_self.articles = res.articles
				})
			}
		}
	}
</script>

<style lang="stylus">
	.article-list
		.item
			margin-bottom 35px
			padding-bottom 35px
			border-bottom 1px solid #eee

		.info
			color #999
			font-size 14px

		.digest
			line-height 1.8
			text-align justify
</style>