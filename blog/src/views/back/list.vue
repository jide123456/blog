<template lang="jade">
	div
		div.control.uk-margin-bottom.uk-flex
			div 筛选 : 
				div.uk-button-dropdown(data-uk-dropdown="{mode:'click'}", aria-haspopup="true", aria-expanded="false")
					button.uk-button 全部 
						i.uk-icon-caret-down
					div.uk-dropdown.uk-dropdown-bottom
						ul.uk-nav.uk-nav-dropdown
							li
								router-link(to="/admin/articles") 全部
							li(v-for="item in classes")
								router-link(:to="{ path: '/admin/articles', query: {filter: item.name} }") {{item.name}}
			div.uk-margin-left
				router-link.uk-button(to="/admin/articles/create") 新建文章

		div.articles
			article-list(
				:names="articles.names"
				:attrs="articles.attrs"
				:data="articles.data"
				@change="change"
				@remove="remove")
</template>

<script>
	import articleList from '../../components/back/table.vue'

	import { resource, api } from '../../req'
	import { handleRes } from '../../handle'

	export default {
		data () {
			return {
				classes: [],
				articles: {
					names: ['ID', '标题', '分类', '创建时间'],
					attrs: ['id', {
						type: 'link',
						name: 'title',
						express: '"/articles/"+$data.id'
					}, 'classes.name', 'date'],
					data: []
				}
			}
		},
		components: {
			articleList
		},
		methods: {
			change (item) {
				this.$router.push({ path: '/admin/articles/' + item.id})
			},
			remove (item) {
				let params = {id: item.id},
					data = {data: JSON.stringify({classes: item.classes.id})} 

				resource.articles.delete(params, data).then(res => {
					handleRes(res)
				})
			}
		},
		beforeRouteEnter (to, from, next) {
			let temp = {}

			resource.classes.get().then(res => {
				temp = res.classes

				return resource.articles.get(to.query)
			}).then(res => {
				next(vm => {
					vm.classes = temp
					vm.articles.data = res.articles
				})
			})
		},
		watch: {
			$route () {
				let _self = this

				_self.articles.data = []
				resource.articles.get(_self.$route.query)
					.then(res => {
						_self.articles.data = res.articles
					})
			}
		}
	}
</script>
