<template lang="jade">
	div.f-category.box
		h3 Category
		ul.f-category-wrap
			li.f-category-item()
				router-link(to="?filter=all") all
				span.uk-float-right {{all}}
			li.f-category-item(v-for="item in list")
				router-link(:to="`?filter=${item.name}`") {{item.name}}
				span.uk-float-right {{item.articles.length}}
</template>

<script>
	import { getCategory } from '../../module/req'

	export default {
		data: () => {
			return {
				list: []
			}
		},
		computed: {
			all () {
				let all = 0
				this.list.forEach(e => all += e.articles.length)
				return all
			}
		},
		created () {
			const that = this

			getCategory().then(res => {
				that.list = res.category
			})
		}
	}
</script>

<style lang="stylus">
	.f-category
		&-wrap
			padding-left 25px
		&-item
			line-height 1.6
</style>