<template lang="jade">
	ul.admin-nav.uk-nav.uk-nav-side
		li
			router-link(to="/admin/articles") 文章列表
		li
			router-link(to="/admin/classes") 分类管理
</template>

<style>
	.admin-nav {padding-top: 30px;}
	.admin-nav a {padding: 5px 15px;}

	.admin-nav li > a.router-link-active {
	    background: #009dd8;
	    color: #fff;
	    box-shadow: inset 0 2px 4px rgba(0,0,0,.2);
	    text-shadow: 0 -1px 0 rgba(0,0,0,.2);
	}
</style>