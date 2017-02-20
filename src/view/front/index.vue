<template lang="jade">
	div
		my-nav
		
		router-view
</template>

<script>
	import myNav from '../../components/front/nav.vue'

	export default {
		components: {
			myNav
		}
	}
</script>
