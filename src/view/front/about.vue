<template lang="jade">
	div
		my-head

		my-body
			div.box.pd15(slot="main")
				blockquote hi， 大家好， 我是记得， 这是我的个人博客。
				h2 在这里你会看到一些：
				ul
					li 教程
					li 技术文章
					li 生活琐事
				h2 你绝对不会看到任何：
				ul
					li 雷同作品

				h2 你可以通过以下方式联系到我
				ul
					li.uk-margin-bottom
						a.uk-icon-button.uk-icon-github.uk-margin-right(href="http://github.com/jide123456" title="Github" data-uk-tooltip)
						| jide123456
					li.uk-margin-bottom
						a.uk-icon-button.uk-icon-google.uk-margin-right(href="Mailto:sd8020563@gmail.com" title="谷歌邮箱" data-uk-tooltip)
						| sd8020563@gmail.com
					li.uk-margin-bottom
						button.uk-icon-button.uk-icon-steam.uk-margin-right(title="steam昵称(???)" data-uk-tooltip)
						| sd8020563
		my-footer
</template>

<script>
	import myBody from '../../components/front/body.vue'
	import myNav from '../../components/front/nav.vue'
	import myHead from '../../components/front/head.vue'
	import myFooter from '../../components/front/footer.vue'

	export default {
		components: {
			myBody,
			myNav,
			myHead,	
			myFooter
		},
		methods: {
			showSteamId () {
				UIkit.notify({
				    message : 'steamId: sd8020563',
				    status  : 'info',
				    timeout : 5000
				})
			}
		}
	}
</script>