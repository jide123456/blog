<template lang="jade">
	div.uk-height-1-1.uk-flex.uk-flex-column
		//- 操作
		div.box.uk-flex.uk-flex-center
			div(title="新建文章" data-uk-tooltip)
				router-link.uk-button(to="/admin/article/create")
					span.uk-icon-plus

		div.box.pd15.uk-flex-item-1
			//- 控件
			div.uk-flex.uk-margin-bottom
				div.uk-button-dropdown(title="筛选" data-uk-tooltip data-uk-dropdown, aria-haspopup="true", aria-expanded="false")
					button.uk-button 全部 
						i.uk-icon-caret-down
					div.uk-dropdown.uk-dropdown-bottom
						ul.uk-nav.uk-nav-dropdown
							li
								router-link(to="?filter=all") 全部
							li(v-for="item in category")
								router-link(:to="'?filter='+item.name") {{item.name}}
			//- 列表
			my-table(
				:names="names",
				:datas="articles",	
				:attrs="attrs",	
				:btns="btns",
				@clickBtnEvent="dispatcher"
			)
</template>

<script>
	import myTable from '../../components/back/table.vue'
	import { getArticles, getCategory, removeArticle, handleRes } from '../../module/req'
	
	export default {
		data () {
			return {
				category: [],
				articles: [],
				names: ['ID', '标题', '分类', '创建时间'],
				attrs: ['id', 'title', 'category.name', 'date'],
				btns: [
					{name: 'change', icon: 'pencil', tooltip: '修改'},
					{name: 'remove', icon: 'remove', tooltip: '删除'},
					{name: 'view', icon: 'eye', 'tooltip': '浏览'}
				]
			}
		},
		methods: {
			dispatcher (type, index) {
				switch (type) {
					case 'change':
						this.change(index)
						break
					case 'remove':
						this.remove(index)
						break
					case 'view':
						this.view(index)
						break
				}
			},
			change (index) {
				this.$router.push(`/admin/article/${this['articles'][index]['id']}`)
			},
			remove (index) {
				const that = this

				UIkit.modal.confirm('是否确定删除', () => {
					const cur = that.articles[index]

					removeArticle({id: cur.id}, {category: cur.category.id}).then(res => {
						if (handleRes(res, {successMsg: '删除成功'})) {
							that['articles'].splice(index,1)
						}
					})
				})
			},
			view (index) {
				window.open(`/article/${this['articles'][index]['id']}`)
			}
		},
		components: {
			myTable
		},
		beforeRouteEnter (to, from, next) {
			let category = {}

			getCategory().then(res => {
				category = res.category

				return getArticles(to.query)
			}).then(res => {
				next(vm => {
					vm.category = category
					vm.articles = res.articles
				})
			})
		},
		watch: {
			$route (to, from) {
				const that = this

				getArticles(to.query).then(res => {
					that.articles = res.articles
				})
			}
		}
	}
</script>