<template lang="jade">
	div.admin-table
		table.uk-table(v-show="data.length")
			tr
				th(v-for="name in names") {{name}}
				th 操作
			tr(v-for="item in data")
				td(v-for="attr in attrs")
					p(v-if="typeof attr == 'object'" v-html="render(item, attr)", v-bind:class="attr.name")
					p(v-else, v-bind:class="attr") {{untie(item, attr) || 0}}
				td
					button.uk-button.uk-margin-small-right(data-uk-tooltip, title="change", @click="change($event, item)")
						i.uk-icon-pencil
					button.uk-button(data-uk-tooltip, title="remove", @click="remove($event, item)")
						i.uk-icon-remove


		p.none(v-show="!data.length") 暂无内容
</template>

<script>
	export default {
		data () {
			return {
				count: 0
			}
		},
		props: {
			names: Array,
			data: Array,
			attrs: Array,
		},
		methods: {
			change (event, item) {
				this.$emit('change', item)
			},
			remove (event, item) {
				let vm = this

				UIkit.modal.confirm('确定删除该条数据?', () => {
					$(event.target).parents('tr').remove()
					vm.$emit('remove', item)
				})
			},
			render ($data, attr) {
				return '<a href="'+ eval(attr.express) +'" target="_blank">'+$data.title+'</a>'
			},
			untie (data, attr) {
				let array = attr.split('.'), temp

				if (array.length == 1) {
					temp = data[array[0]]
				} else {

					temp = data[array.shift()]

					while(array.length) {
						temp = temp[array.shift()]
					}
				}

				return temp
			}
		}
	}
</script>

<style lang="stylus">

	.admin-table
		.none 
			font-size 1.6em
			text-align center
			padding 2em 0
</style>