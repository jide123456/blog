<template lang="jade">
	div
		table.uk-table
			tr
				th ID
				th 标题
				th 分类
				th 创建时间
				th 操作
			tr(v-for="item in articles")
				td {{item.id || 0}}
				td
					a(:href="'/article/'+item._id", target="_blank") {{item.title}}
				td {{item.classes.name}}
				td {{item.date}}
				td
					router-link.uk-button.uk-margin-small-right(to="/heheda")
						i.uk-icon-pencil
					button.uk-button
						i.uk-icon-remove

		p.none(v-show="!articles.length") 暂无内容
</template>

<script>
	export default {
		props: ['articles']
	}
</script>

<style lang="stylus">
	.none
		text-align center
		padding 50px 0
</style>