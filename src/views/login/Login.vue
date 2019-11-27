<template>
	<div class="login">
		<div class="title">mybook</div>
		<div class="login-box">
			<div class="input-box" :class="{ 'active': postbox.border === 1, 'err': postbox.border === 2 }">
				<van-field v-model.trim="postbox.value" size="large" placeholder="邮箱" left-icon="free-postage" :border="false" :clickable="true" @blur="inputEvent(postbox.border, '邮箱')"  />
			</div>
			<div class="input-box" :class="{ 'active': password.border === 1, 'err':  password.border === 2 }">
				<van-field v-model.trim=" password.value" type="password" size="large" placeholder="密码" left-icon="closed-eye" :border="false" :clickable="true" @blur="inputEvent(password.border, '密码')" />
			</div>
		</div>
		<div class="forget"><span @click="forget">忘了密码？</span></div>
		<div class="btn">
			<van-button type="primary" class="login-btn" :disabled="disabled" :loading="loading" loading-text="登录中..." color="#5ca52a" @click="submit"> 立即登录 </van-button>
		</div>
		<div class="register">
			<router-link to="register" replace>还没有账号？去<span class="text">注册</span></router-link>
		</div>
		<div class="pact">登录即代表同意<span class="text" @click="show = true">《霸王条款》</span></div>

		<van-overlay :show="show" @click="show = false">
			<div class="dialog-box">
				<div class="dialog">
					<p>不得传播不文明、不健康、具有反动意识的东西</p>
					<p>实在想不到还有什么，反正你们不能惹我不高兴</p>
				</div>
			</div>
		</van-overlay>
	</div>
</template>

<script>
import { mailReg, passwordReg } from '@/util/util'
import { login } from '@/api/api'
import { UESR_MESSAGE } from "@/store/mutation-types";
export default {
	name: 'login',
	watch: {
		'postbox.value': {
			handler: function(newV) {
        		if(!mailReg.test(newV)) {
        			this.postbox.border = 2
        		} else {
        			this.postbox.border = 1
        		}
        	}
		},
		'password.value': {
			handler: function(newV) {
            	if(!passwordReg.test(newV)) {
        			this.password.border = 2
        		} else {
        			this.password.border = 1
        		}
        	}
		},
		isCheck(newV) {
			this.disabled = !this.isCheck
		}
	},
	computed: {
		isCheck() {
			if(this.postbox.value === '' || this.password.value === '') {
				return false
			} else {
				return (this.postbox.border !== 2 && this.password.border !== 2)
			}
		}
	},
	data() {
		return {
			show: false,
			postbox: {
				value: '',
				border: 0		// 1:获取焦点，2：登陆失败
			},
			password: {
				value: '',
				border: 0
			},
			disabled: true,
			loading: false,
		}
	},
	methods: {
		inputEvent(type, name) {
			if(type === 2) {
				this.$toast(name + '格式不正确')
			}
		},
		forget() {
			console.log("忘记密码")
		},
		submit() {
			login(this.postbox.value, this.password.value).then(res=>{
				if(res.status === 200) {
					console.log(res)
					this.$toast({
                        message: '登录成功',
                        duration: 1500
                    })
                    localStorage.setItem("mybook_user_msg", JSON.stringify(res.user))
					this.$store.commit(UESR_MESSAGE, res.user)
					setTimeout(()=>{
						this.$router.replace({path: '/my'})
					}, 1500)
				} else {
					this.$toast(res.message)
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.login {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	position: relative;
	.title {
		margin-top: 40px;
		height: 48px;
		line-height: 48px;
		font-size: 24px;
		text-align: center;
		background-image: linear-gradient(red,orange, rgba(255,0,0,1));
		-webkit-background-clip: text;
	    -webkit-text-fill-color: transparent;
	}
	.login-box {
		padding: 0 30px;
		margin-top: 120px;
		.input-box {
			border-bottom-width: 1px;
			border-bottom-style: solid;
			border-bottom-color: #eaeaea;
			&:last-child {
				margin-top: 20px;
			}
			&.active {
				border-bottom-color: green;
			}
			&.err {
				border-bottom-color: red;
			}
		}
	}
	.forget {
		padding: 0 30px;
		text-align: right;
		line-height: 30px;
		color: #ba602a;
		font-size: 12px;
	}
	.btn {
		text-align: center;
		margin-top: 40px;
		.login-btn {
			width: 150px;
			line-height: 45px;
			height: 45px;
			color: #fff;
			font-size: 15px;
			box-shadow: 0 4px 4px #deedd4;
			border-radius: 6px;
		}
	}
	.register {
		margin-top: 40px;
		text-align: center;
		a {
			color: #999;
			font-size: 14px;
			.text {
				font-size: 16px;
				color: #5ca52a;
			}
		}
	}
	.pact {
		position: absolute;
		left: 0;
		bottom: 60px;
		width: 100%;
		text-align: center;
		color: #999;
		.text {
			color: #333;
		}
	}
	.dialog-box {
		width: 100%;
		height: 100%;
		padding: 160px 40px;
	    box-sizing: border-box;
		.dialog {
		    box-sizing: border-box;
			width: 100%;
			height: 100%;
			border-radius: 8px;
			color: #333;
			background-color: #fff;
			padding: 30px 20px;
		}
	}
}
</style>