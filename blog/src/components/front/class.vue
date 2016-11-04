<template lang="jade">
	section.class-panel.panel.f-spacing.f-spacing-little
		h4.title CLASS
		ul
			li
				router-link(to="/articles") all
				span.number {{total}}

			li(v-for="item in classes")
				router-link(:to="{ path: '/articles', query: {filter: item.name} }") {{item.name}}
				span.number {{item.articles.length}}
</template>


<script>
	import { resource } from '../../req'

	export default {
		data () {
			return { classes: []}
		},

		computed: {
			total () {
				let total = 0
				this.classes.forEach((element, index) => {
					total += element.articles.length
				})
				return total
			}
		},

		created () {
			let _self = this

			resource.classes.get().then(res => {
				_self.classes=res.classes
			})
		}
	}
</script>

<style lang="stylus">
	.panel
		padding 20px 0
		border 1px solid #eee
		border-width 1px 0

		& + .panel
			border-width 0 0 1px

	.class-panel
		ul
			margin-left 20px

		li
			list-style disc

		a:active
			color red

		.number
			margin-left 5px
			color #999
</style>