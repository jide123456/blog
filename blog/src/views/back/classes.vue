<template lang="jade">
	div
		div.control.uk-margin-bottom.flex
			button.uk-button(@click="create") 新建分类 
				i.uk-icon-plus

		div
			class-list(
				:names="classes.names"
				:attrs="classes.attrs"
				:data="classes.data"
				@change="change"
				@remove="remove"
			)
</template>

<script>
	import myNav from '../../components/back/nav.vue'
	import classList from '../../components/back/table.vue'

	import { resource } from '../../req'
	import { handleRes } from '../../handle'

	export default {
		data () {
			return {
				classes: {
					names: ['ID', '名称', '文章数'],
					attrs: ['id', 'name', 'articles.length'], 
					data: []
				}
			}
		},
		components: {
			myNav,
			classList
		},
		methods: {
			create () {
				let _self = this

				UIkit.modal.prompt('请输入分类名称', '', value => {
					if (!value) {
						UIkit.notify({
						    message : '分类名称不能为空',
						    status  : 'warning',
						    timeout : 1000
						})

						return
					}

					resource.classes.put({name: value}).then(res => {
						let r = handleRes(res)
						if (r) {
							_self.classes.data.push(res.result)
						}
					})
				})	
			},
			change (item) {
				let oldName = item.name,
					index = item._index

				UIkit.modal.prompt('请输入新分类名称', oldName, value => {
					if (oldName != value) {
						resource.classes.update({id: item.id}, {name: value}).then(res => {
							let r = handleRes(res, {successMsg: '修改成功'})

							if (r) $('.admin-table .name').eq(index).text(value)
						})
					}
				})	
			},
			remove (item) {
				UIkit.notify({
				    message : '删除未生效, 暂未提供删除分类',
				    status  : 'message',
				    timeout : 1000
				})
			}
		},
		beforeRouteEnter (to, from, next) {
			resource.classes.get().then(res => {
				next(vm => {
					vm.classes.data = res.classes
				})
			})
		}
	}
</script>