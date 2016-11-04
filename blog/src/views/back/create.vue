<template lang="jade">
	div.uk-container.uk-container-center.uk-margin-bottom
		form.uk-form.uk-margin-top(@submit.prevent="submit")

			div.uk-grid.uk-grid-small
				div.uk-width-1-10 标题
				div.uk-width-4-10
					input#title.uk-width-1-1(type="text", placeholder="标题", required, v-model="article.title", :disabled="disabled")

			div.uk-grid.uk-grid-small
				div.uk-width-1-10 摘要
				div.uk-width-4-10
					input#digest.uk-width-1-1(type="text", placeholder="摘要", required, v-model="article.digest", :disabled="disabled")

			div.uk-grid.uk-grid-small
				div.uk-width-1-10 分类
				div.uk-width-4-10
					select#class(required, v-model="article.classes", :disabled="disabled")
						option(value="") unclassed
						option(v-for="item in classes", :value="item.id") {{item.name}}

			div.uk-grid.uk-grid-small
				div.uk-width-1-10 背景图
				div.uk-width-4-10
					button.uk-button.uk-position-relative(type="button", :disabled="disabled")
						i.uk-icon-plus
						input#file.file-img(type="file", @change="uploadImg($event)", :disabled="disabled")

			div.uk-grid.uk-grid-small.uk-margin-top-remove
				div.uk-width-1-10
				div#bg-wrap.uk-width-4-10
					img.uk-margin-small-top(:src="article.bg.ctn", v-show="article.bg.ctn")

			div.uk-grid.uk-grid-small
				div.uk-width-1-10 正文
				div.uk-width-6-10
					div#editor
						textarea(v-model="article.markdown", :disabled="disabled")

			div.uk-grid.uk-grid-small
				div.uk-width-1-10
				div.uk-width-6-10
					button.uk-button.uk-button-large.uk-button-primary.uk-float-right(type="submit", v-show="!disabled") 提交
					button.uk-button.uk-button-large.uk-float-right(type="button", @click="toggle", v-show="disabled") 修改
</template>

<script>
	import co from 'co'
	import { resource, isProduction } from '../../req'
	import { handleRes } from '../../handle'

	export default {
		data () {
			return {
				article: {
					title: '',
					digest: '',
					markdown: '',
					classes: '',
					bg: {
						name: '',
						ctn: ''
					}
				},
				classes: [],

				// control variable
				status: 0, // create or change, change is 1, create is 0, default change
				disabled: false,  
				oldBg: '',
				oldClasses: ''
			}
		},

		computed: {
			changeBg () {
				return !(this.article.bg.name == this.oldBg)
			},

			changeClasses () {
				return !(this.article.classes == this.oldClasses)
			}
		},

		methods: {
			submit () {
				this.status ? this.change() : this.create()
			},

			create () {
				let _self = this, data

				if (!_self.article.bg.name) {
					UIkit.notify({
					    message : '请添加背景图',
					    status  : 'warning',
					    timeout : 1000
					})

					return false
				}

				// process data
				data = Object.assign(_self.article, {timestamp: Date.now()})
				data = {data: JSON.stringify(data)}

				resource.articles.put(data).then(res => {
					let r = handleRes(res, {successMsg: '添加成功'})

					if (r) {
						_self.$router.push(String(res.result.id))
						reload(_self)
					}
				})
			},

			change () {
				let _self = this, data

				// process data
				data = Object.assign({article: _self.article}, {changeBg: _self.changeBg, changeClasses: _self.changeClasses, oldClasses: _self.oldClasses})
				data = {data: JSON.stringify(data)}

				resource.articles.update(_self.$route.params, data).then(res => {
					handleRes(res, {successMsg: '修改成功'})
					reload(_self)
				})
			},

			toggle () {
				this.disabled = !this.disabled
			},

			uploadImg (e) {
				let _self = this,
					_file = e.target.files[0],
					render = new FileReader()

				render.onload = function(e){
					_self.article.bg.name = _file.name
					_self.article.bg.ctn = e.target.result
				}

				render.readAsDataURL(_file)
			}
		},

		beforeRouteEnter (to, from, next) {
			// if from 'create' page, do nothing
			if (from.path == '/admin/articles/create') {
				next()
				return
			}

			let params = to.params, task = []

			task.push(resource.classes.get())
			params.id && task.push(resource.articles.getOne(params))

			co(function *(){
				let r = yield task,
					classes = r[0].classes,
					article

				if (r[1]) {
					article = r[1].article

					article.classes = article.classes.id
					article.bg.ctn = (isProduction ? '' : 'http://localhost:3000') + article.bg.ctn
				}

				next(vm => {
					vm.classes = classes

					if(article) {
						vm.article = article	
						reload(vm, article)
					}
				})
			})
		}
	}


	// everytime be submitted when reset page
	const reload = (vm, data) => {
		vm.status = 1
		vm.disabled = true

		vm.oldBg = data ? data.bg.name : vm.article.bg.name
		vm.changeBg = false
		vm.oldClasses =  data ? data.classes : vm.article.classes
		vm.changeClasses = false
	}


</script>

<style lang="stylus">
	.file-img
		position absolute
		width 100%
		height 100%
		left 0
		top 0
		opacity 0

	#editor
		textarea
			width 100%
			height 300px
</style>