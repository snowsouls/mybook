<template>
	<div class="main">
		<div class="page-img">
			<img src="@/assets/404.png" alt="404">
		</div>
		<div class="page-btn">
			<router-link class="btn" to="/home" replace>返回首页</router-link>
			<router-link class="btn" to="" @click.native="$router.back(-1)" replace>上一页</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'about',
	data() {
		return {
			msg: false
		}
	},
	methods: {
		
	},
	created() {
		setTimeout(()=>{
			this.msg = true
		},2000)
	}
}
</script>

<style lang="less" scoped>
.main {
	.page-img {
		width: 160px;
		height: 160px;
		margin: 20% auto 30px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.page-btn {
		display: flex;
		justify-content: center;
		.btn {
			width: 88px;
			height: 36px;
			line-height: 36px;
			background-color: #36a36a;
			border-radius: 6px;
			text-align: center;
			color: #fff;
			font-size: 14px;
			&:first-child {
				margin-right: 30px;
			}
		}
	}
}
</style>
