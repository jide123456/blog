<template lang="jade">
	div.uk-height-1-1.uk-flex.uk-flex-column
		//- 操作
		div.box.uk-flex.uk-flex-center
			div(title="新建分类" data-uk-tooltip)
				button.uk-button(@click="create")
					span.uk-icon-plus

		div.box.pd15.uk-flex-item-1

			//- 列表
			my-table(
				:names="names",
				:datas="category",	
				:attrs="attrs",	
				:btns="btns",
				@clickBtnEvent="change")
</template>

<script>
	import myTable from '../../components/back/table.vue'
	import { getCategory, createCategory, changeCategory, handleRes } from '../../module/req'

	export default {
		data () {
			return {
				category: [],
				names: ['ID', '名称', '文章数'],
				attrs: ['id', 'name', 'articles.length'],
				btns: [
					{name: 'change', icon: 'pencil', tooltip: '修改'}
				]
			}
		},
		components: {
			myTable
		},
		methods: {
			create () {
				const that = this

				UIkit.modal.prompt('请输入分类名称', '', value => {
					if (!value) {
						UIkit.notify({message: '名称不能为空!', status: 'danger', timeout: 1000})
						return
					}

					createCategory({name: value}).then(res => {
						const isSuccess = handleRes(res, {successMsg: '新建分类成功'})

						if (isSuccess) {
							that.category.push(res.result)
						}
					})
				})
			},
			change (type, index) {
				const that = this
				const item = that.category[index]

				UIkit.modal.prompt('请输入新分类名称', '', value => {
					if (value === item.name) return

					changeCategory({id: item.id}, {name: value}).then(res => {
						const isSuccess = handleRes(res, {successMsg: '修改名称成功'})

						if (isSuccess) {
							that.category.splice(index, 1, res.result)
						}
					})
				})
			}
		},
		beforeRouteEnter (to, from, next) {
			getCategory().then(res => {
				next(vm => {
					vm.category = res.category
				})
			})
		}
	}
</script>