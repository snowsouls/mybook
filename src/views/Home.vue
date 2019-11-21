<template>
	<div class="home">
		<div class="content">
			<router-view />
		</div>
		<div class="nav-box">
			<router-link to="/home" class="nav home">
				<div class="icon"></div>
				<span class="text">首页</span>
			</router-link>
			<router-link to="/add" class="nav add">
				<div class="icon"></div>
				<span class="text">添加</span>
			</router-link>
			<router-link to="/my" class="nav my">
				<div class="icon"></div>
				<span class="text">我的</span>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {
			count: 0
		}
	},
	methods: {
		add() {
			this.count += 1
		}
	},
	mounted() {
		console.log(this.$router)
	}
}
</script>

<style lang="less" scoped>
	.content {
		// padding-bottom: 120px;
	}
	.nav-box {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 60px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		z-index: 999;
		background-color: #fff;
		// border-top: 1px solid #f3f3f3;
		// &:before {
		// 	content: '';
		// 	width: 0;
		// 	height: 50px;
		// 	border-left: 1px solid #f5f5f5;
		// 	position: absolute;
		// 	top: 5px;
		// 	left: 50%;
		// }
		box-shadow: 0px -1px 8px #eee;
		.nav {
			flex: auto;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.icon {
				width: 30px;
				height: 30px;
				background-size: 30px 30px;
			}
			.text {
				font-size: 14px;
			}
		}
		.home {
			.icon {
				background-image: url('~@/assets/home.png');
			}
			&.router-link-active .icon {
				background-image: url('~@/assets/home-active.png');
			}
		}
		.add {
			.icon {
				background-image: url('~@/assets/add.png');
			}
			&.router-link-active .icon {
				background-image: url('~@/assets/add-active.png');
			}
		}
		.my {
			.icon {
				background-image: url('~@/assets/my.png');
			}
			&.router-link-active .icon {
				background-image: url('~@/assets/my-active.png');
			}
		}
	}
</style>
