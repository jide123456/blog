<template lang="jade">
	div.box
		div.uk-container.uk-container-center.uk-margin-bottom
			form.uk-form.uk-margin-top(@submit.prevent="isChange ? change() : create()")
				div.uk-grid.uk-form-row
					div.uk-width-1-10 标题
					div.uk-width-4-10
						input#title.uk-width-1-1(type="text", placeholder="标题", v-model="title", :disabled="isDisabled", required)

				div.uk-grid.uk-form-row
					div.uk-width-1-10 摘要
					div.uk-width-4-10
						input#digest.uk-width-1-1(type="text", placeholder="摘要", v-model="digest", :disabled="isDisabled", required)

				div.uk-grid.uk-form-row
					div.uk-width-1-10 分类
					div.uk-width-4-10
						select#class(v-model="category", :disabled="isDisabled", required)
							option(value="") unclassed
							option(v-for="item in categoryList", :value="item.id") {{item.name}}

				div.uk-grid.uk-form-row
					div.uk-width-1-10 背景图
					div.uk-width-4-10
						button.uk-button.uk-position-relative(type="button", :disabled="isDisabled")
							i.uk-icon-plus
							input#file.b-file-img(type="file", @change="uploadImg($event)", :disabled="isDisabled")
	
				div.uk-grid.uk-form-row.uk-margin-top-remove
					div.uk-width-1-10
					div#bg-wrap.uk-width-4-10
						img.uk-margin-small-top(:src="imgUrl", v-show="imgUrl")

				div.uk-grid.uk-form-row
					div.uk-width-1-10 正文
					div.uk-width-6-10
						div
							textarea.b-editor.uk-width-1-1(v-model="markdown", :disabled="isDisabled", required)

				div.uk-grid.uk-form-row
					div.uk-width-1-10
					div.uk-width-6-10
						button.uk-button.uk-button-large.uk-button-primary.uk-float-right(type="submit", v-show="!isDisabled") 提交
						button.uk-button.uk-button-large.uk-float-right(type="button", v-show="isDisabled", @click="unfreeze") 修改
</template>

<script>
	import { getCategory, getArticle, createArticle, updateArticle, handleRes } from '../../module/req'

	export default {
		data () {
			return {
				title: '',
				digest: '',
				category: '',
				markdown: '',
				bg: {name: '', base64: ''},
				categoryList: [],
				oldBgName: null,
				oldCategory: null,
				isChange: false,
				isDisabled: false
			}
		},
		computed: {
			isChangeCategory () {
				return this.oldCategory != this.category
			},
			isChangeBg () {
				return this.oldBgName != this.bg.name
			},
			imgUrl () {
				return this.bg.base64 || this.bg.cdnPath || this.bg.localPath
			}
		},
		methods: {
			create () {
				const that = this

				createArticle({
					title: that.title,
					digest: that.digest,
					category: that.category,
					markdown: that.markdown,
					bg: that.bg.name ? that.bg : null
				}).then(res => {
					console.log(res)
					if (handleRes(res, {successMsg: '创建成功'})) {
						that.isChange = true
						that.isDisabled = true
						that.oldCategory = that.category
						that.oldBgName = that.bg.name

						that.$router.push(String(res.result.id))
					}
				})
			},
			change () {
				const that = this

				updateArticle(that.$route.params, {
					data: {
						title: that.title,
						digest: that.digest,
						category: that.category,
						markdown: that.markdown,
						bg: that.bg,
					},
					ctrl: {
						oldCategory: that.oldCategory,
						isChangeBg: that.isChangeBg,
						isChangeCategory: that.isChangeCategory
					}
				}).then(res => {
					that.isDisabled = true
					that.oldBgName = that.bg.name
					that.oldCategory = that.category
					handleRes(res, {successMsg: '修改成功'})
				})
			},
			uploadImg (e) {
				const
					that = this,
					file = e.target.files[0],
					render = new FileReader()

				render.onload = function(e){
					that.bg.name = file.name
					that.bg.base64 = e.target.result
				}

				render.readAsDataURL(file)
			},
			unfreeze () {
				this.isDisabled = false
			}
		},
		mounted () {
			const that = this

			if (location.pathname.search('create') === -1) {
				that.isChange = true
				that.isDisabled = true

				getArticle(that.$route.params).then(res => {
					res.article.category = res.article.category.id
					res.article.oldCategory = res.article.category
					res.article.oldBgName = res.article.bg.name
					res.article.bg.base64 = null
					Object.assign(that, res.article)
				})
			}
		},
		beforeRouteEnter (to, from, next) {
			getCategory().then(res => {
				next(vm => {
					vm.categoryList = res.category
				})
			})
		}
	}
</script>

<style lang="stylus">
	.b-editor
		height 300px !important
	.b-file-img
		position absolute
		left 0
		top 0
		width 100%
		height 100%
		opacity 0
</style>