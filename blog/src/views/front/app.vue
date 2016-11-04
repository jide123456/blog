<template lang="jade">
	div
		my-nav
		transition(name="fade", mode="out-in")
			router-view
</template>

<script>
	import '../../assets/css/reset.css'
	import myNav from '../../components/front/nav.vue'

	export default {
		components: {
			myNav
		}
	}
</script>

<style lang="stylus">
	.g-container
		max-width: 1200px
		min-height: 455px
		margin: 0 auto 60px auto

	.g-mn, .g-sd
		position relative

	.g-sd
		width 260px
		padding-left 15px

	.g-mn
		padding-right 15px

	@media (max-width 769px)
		.g-sd 
			display none
		.g-mn
			padding 0 15px

	.f-flex
		display flex

		&-column
			flex-direction column

		&-center
			align-items center
			justify-content center

		&-item-1
			flex 1

	.f-spacing
		> *
			margin-bottom 15px

			&:last-child
				margin-bottom 0

		&-large > *
			margin-bottom 20px

		&-little > * 
			margin-bottom 10px

	.fade-enter-active, .fade-leave-active
		opacity 1
		transition opacity .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)

	.fade-enter, .fade-leave-active
		opacity 0
</style>