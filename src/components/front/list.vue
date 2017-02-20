<template lang="jade">
	div
		ul.f-articleList
			li.f-articleList-item.box(v-for="item in list")
				h2.f-articleList-title
					router-link(:to="`/article/${item.id}`") {{item.title}}
				p.f-articleList-info
					|发表于 
					span.f-articleList-data {{item.date}} | 
					| 分类于 
					router-link(to="") {{item.category.name}}
				p.f-articleList-digest {{item.digest}}
		p.uk-text-center.uk-h2(v-show="!list.length") 暂无内容
</template>

<script>
	import { getArticles } from '../../module/req'

	export default {
		data: () => {
			return {
				list: []
			}
		},
		created () {
			const that = this

			getArticles().then(res => {
				that.list = res.articles
			})
		},
		watch: {
			$route (to, from) {
				const that = this

				getArticles(to.query).then(res => {
					that.list = res.articles
				})
			}
		}
	}

</script>

<style lang="stylus">
	.f-articleList
		padding 0

		&-item
			list-style none
			transition all .4s

			&:hover
				box-shadow 0 0 7px 3px #ebf7fd

		&-info
			color #999
			font-size 14px

		&-digest
			margin-bottom 0
			font-style italic
</style>
