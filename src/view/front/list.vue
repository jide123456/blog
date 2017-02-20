<template lang="jade">
	div
		my-head(
		:title="'JIDE BLOG'",
		:description="'自由自私的灵魂'")

		my-body
			article-list(slot="main")

			div(slot="side")
				side-category

		my-footer
</template>

<script>
	import myBody from '../../components/front/body.vue'
	import myHead from '../../components/front/head.vue'
	import myFooter from '../../components/front/footer.vue'
	import articleList from '../../components/front/list.vue'
	import sideCategory from '../../components/front/category.vue'

	export default {
		components: {
			myBody,
			myHead,
			myFooter,
			articleList,
			sideCategory
		}
	}
</script>

<style lang="stylus">

</style>