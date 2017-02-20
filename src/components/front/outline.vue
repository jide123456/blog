<template lang="jade">
	div.box.f-article-outline.j-tips
		h3 在本文章中
		div.f-article-outline-ctn(v-html="html")
</template>

<script>
	import { outline } from '../../module/handle'

	export default {
		data: () => {
			return {
				html: ''
			}
		},
		methods: {
			tips () {
				window.scrollY > this.offsetTop
					? this.target.addClass('fixed')
					: this.target.removeClass('fixed')
			},

			/*
			 * 检测文章是否渲染完毕
			 * 尝试使用过 updated 钩子 + 全局bus
			 * 效果不理想
			 * 遂改用定时器检测
			*/
			checkHeading () {
				const that = this
				
				setTimeout (() => {
					document.querySelector('.j-heading')
						? (that.html = outline('.j-heading'))
						: that.checkHeading()
				}, 500)
			}
		},
		mounted () {
			const that = this

			that.target = $('.j-tips')
			that.offsetTop = that.target.offset().top

			/*
			 * 重设大纲容器宽度
			 * 防止固定定位时容器宽度自适应
			 * 所造成容器宽度超出
			*/
			that.target.width(that.target.width())

			/*
			 * 移动端不固定大纲
			*/
			if (document.documentElement.clientWidth > 768) {
				window.addEventListener('scroll', that.tips)
			}

			that.checkHeading()
		},
		beforeDestroy () {
			window.removeEventListener('scroll', this.tips)
		}
	}
</script>

<style lang="stylus">
	.f-article-outline
		position relative
		top 0

		&.fixed
			position fixed
			width 100%
		
	.f-article-outline-ctn
		font-size 14px
		line-height 2
		ul
			padding-left 20px
</style>