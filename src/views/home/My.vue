<template>
    <div class="main">
    	<router-link class="basic-style msg" :to="login ? 'information' : 'login'">
    		<div class="picture">
    			<img v-if="login" :src="infor.picture" alt="默认图" />
    			<img v-else src="@/assets/default.jpg" alt="默认图" />
    		</div>
    		<div class="describe">
    			<p class="main-text">{{login ? infor.name : '立即登录'}}</p>
    			<p class="secondary">{{login ? infor.postbox : '登录后获得更多体验'}}</p>
    		</div>
    	</router-link>
    	<router-link class="basic-style enshrine top" :to="login ? 'information' : 'login'">
    		<img src="@/assets/infor.png" alt="信息" />
    		<span class="title">我的信息</span>
    	</router-link>
    	<router-link class="basic-style enshrine" :to="login ? 'collect' : 'login'">
    		<img src="@/assets/enshrine.png" alt="收藏" />
    		<span class="title">我的收藏</span>
    	</router-link>
    	<router-link class="basic-style enshrine" :to="login ? 'publish' : 'login'">
    		<img src="@/assets/article.png" alt="文章" />
    		<span class="title">我的文章</span>
    	</router-link>
    	<router-link class="basic-style enshrine" :to="login ? 'information' : 'login'">
    		<img src="@/assets/attention.png" alt="关注" />
    		<span class="title no-border">我的关注</span>
    	</router-link>

    	<router-link class="basic-style enshrine top" to="/settings">
    		<img src="@/assets/settings.png" alt="设置" />
    		<span class="title">设置</span>
    	</router-link>
    </div>
</template>

<script>
export default {
	computed: {
		infor() {
			return this.$store.state.userMessage
		},
		login() {
			return this.infor.postbox ? true : false
		}
	},
    data() {
        return {
        	
        }
    },
    created() {
    	
    }
}
</script>

<style lang="less" scoped>
.main {
	width: 100%;
	min-height: 100vh;
	background-color: #f5f5f5;
	.basic-style {
		padding: 0 20px;
		background-color: #fff;
		display: flex;
		align-items: center;
		.title {
			flex: auto;
		    border-bottom: 2px solid #f5f5f5;
			color: #333;
			font-size: 13px;
			position: relative;
			&.no-border {
				border-bottom: none;
			}
			&:after {
				content: "";
				width: 10px;
				height: 16px;
				background: url('~@/assets/arrows.png') no-repeat center center;
				background-size: 100% 100%;
				position: absolute;
				right: 0;
				top: 17px;
			}
		}
	}
	.msg {
		height: 105px;
		position: relative;
		&:after {
			content: "";
			width: 10px;
			height: 16px;
			background: url('~@/assets/arrows.png') no-repeat center center;
			background-size: 100% 100%;
			position: absolute;
			right: 20px;
			top: 45px;
		}
		.picture {
			width: 60px;
			height: 60px;
			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.describe {
			display: block;
			font-size: 0;
			margin-left: 10px;
			.main-text {
				font-size: 18px;
				color: #333;
				font-weight: 600;
			}
			.secondary {
				font-size: 12px;
				color: #999;
				margin-top: 10px;
			}
		}
	}
	.enshrine {
		height: 50px;
		line-height: 50px;
		background-color: #fff;
		position: relative;
		&.top {
			margin-top: 10px;
		}
		img {
			width: 20px;
			height: 20px;
			margin-right: 10px;
		}
	}
}
</style>
