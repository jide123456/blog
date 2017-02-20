<template lang="jade">
	div
		my-head.f-hd-1(
			:title="article.title"
			:description="article.digest"
			:bgUrl = "article.bg.cdnPath"
		)

		my-body
			div.box.pd15.markdown-body(slot="main" v-html="article.html")
				
			div(slot="side")
				div.box.f-article-info
					h3 关于本文


					li.uk-grid
						div.uk-width-1-3.uk-width-medium-1-1 创建于：
						div.uk-width-2-3.uk-width-medium-1-1 {{article.date}}
					li.uk-grid.uk-margin-top-remove
						div.uk-width-1-3.uk-width-medium-1-1 最后编辑于：
						div.uk-width-2-3.uk-width-medium-1-1 {{article.lastChangeDate}}
					li.uk-grid.uk-margin-top-remove
						div.uk-width-1-3.uk-width-medium-1-1 分类于：
						div.uk-width-2-3.uk-width-medium-1-1 {{article.category.name}}

				article-outline

		my-footer
</template>

<script>
	import myBody from '../../components/front/body.vue'
	import myHead from '../../components/front/head.vue'
	import myFooter from '../../components/front/footer.vue'
	import articleOutline from '../../components/front/outline.vue'

	import { getArticle } from '../../module/req'

	export default {
		data: () => {
			return {
				article: {
					bg: {},
					category: {}
				},
				html: ''
			}
		},
		components: {
			myBody,
			myHead,
			myFooter,
			articleOutline
		},
		beforeRouteEnter (to, from, next) {
			getArticle(to.params).then(res => {
				next(vm => {
					vm.article = res.article
				})
			})
		}
	}
</script>

<style lang="stylus">
	.markdown-body
		pre
			border none
			color #eeffff
			background #263238
			font-size 15px
			line-height 1.6

		>*
			margin 0 0 20px 0
			
		*+h1,*+h2,*+h3,*+h4,*+h5,*+h6
			margin-top 25px

		p
			line-height 1.8

	.f-article-info
		font-size 14px
		line-height 2
		

	/*
	 * default style from highlight.js
	*/
	.hljs
		&-title
		&-name
			color:#f0c674
			
		&-comment
		&-meta
		&-meta &-keyword 
			color:#707880
			
		&-number
		&-symbol
		&-literal
		&-deletion
		&-link 
			color:#c66
	
		&-string
		&-doctag
		&-addition
		&-regexp
		&-selector-attr
		&-selector-pseudo 
			color:#b5bd68
	
		&-attribute
		&-code
		&-selector-id 
			color:#b294bb
	
		&-keyword
		&-selector-tag
		&-bullet
		&-tag 
			color:#81a2be
	
		&-subst
		&-variable
		&-template-tag
		&-template-variable 
			color:#8abeb7
	
		&-type
		&-built_in
		&-builtin-name
		&-quote
		&-section
		&-selector-class 
			color:#de935f
	
		&-emphasis 
			font-style:italic
	
		&-strong 
			font-weight:bold

</style>