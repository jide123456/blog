<template lang="jade">
	div.b-table
		table.uk-table(v-show="datas.length")
			tr
				th(v-for="name in names") {{name}}
				th 操作

			tr(v-for="(data,index) in datas")
				td(v-for="attr in attrs") {{untie(data, attr)}}
				td
					button.uk-button.uk-margin-small-right(
						v-for="btn in btns",
						@click="click(btn.name, index)",
						:title="btn.tooltip"
						:data-uk-tooltip="!!btn.tooltip")

						i(:class="'uk-icon-'+btn.icon")

		p.b-table-none(v-show="!datas.length") 暂无内容
</template>

<script>
	import { untie } from '../../module/handle'

	export default {
		props: {
			names: Array,
			datas: Array,
			attrs: Array,
			btns: Array
		},
		methods: {
			click (type, index) {
				this.$emit('clickBtnEvent', type, index)
			},
			untie: untie
		}
	}
</script>

<style lang="stylus">
	.b-table-none 
			font-size 1.6em
			text-align center
			padding 2em 0
</style>