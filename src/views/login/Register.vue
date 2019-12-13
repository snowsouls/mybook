<template>
	<div class="register">
		<div class="title">mybook</div>
		<div class="content">
			<van-cell-group>
				<van-field v-model.trim="name" label="昵称" placeholder="请输入昵称" maxlength="10" clearable required />
				<van-field v-model.trim="postbox" required label="邮箱" placeholder="请输入邮箱地址" >
					<van-button slot="button" size="small" type="primary" :disabled="timeDisabled" @click="sendCode">{{text}}</van-button>
				</van-field>
				<van-field v-model.trim="authcode" required label="验证码"  right-icon="question-o" placeholder="请输入验证码" @click-right-icon="explain" />
				<van-field v-model="password" type="password" label="密码" placeholder="6-16位字母开头，可含数字和._" required />
				<van-field v-model="againpassword" type="password" label="确认密码" placeholder="如果你很自信，那就不要了" />
				<van-field v-model="gender" label="性别" readonly @click="showActions = true" />
				<van-field v-model="birthday" label="生日" placeholder="你可以在这里填写你的生日哦" readonly @click="showBirthday = true" />
				<van-field v-model="area" label="地址" placeholder="你可以在这里填写你的地址哦" readonly @click="showArea = true" />
				<van-field v-model="signature" label="个性签名" type="textarea" rows="2" maxlength="50" autosize show-word-limit/>
			</van-cell-group>
		</div>
		<div class="btn">
			<van-button type="primary" class="login-btn" :disabled="disabled" :loading="loading" loading-text="注册中..." color="#5ca52a" @click="submit"> 立即注册 </van-button>
		</div>
		<div class="login">
			<router-link to="login" replace>已有账号？去<span class="text">登录</span></router-link>
		</div>

		<van-action-sheet v-model="showActions" :actions="actions" :round="false" @select="onSelect" />

		<van-popup v-model="showBirthday" position="bottom" :style="{ height: '264px' }">
			<div>
				<van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @confirm="choseBirthday" />
			</div>
		</van-popup>

		<van-popup v-model="showArea" position="bottom" :style="{ height: '264px' }">
			<div>
				<van-area :area-list="areaList" :value="areaCode" @confirm="choseArea" />
			</div>
		</van-popup>
	</div>
</template>

<script>
import config from '@/config/index'
import {Ajax, mailReg, passwordReg} from '@/util/util'
import areaList from '@/assets/json/area'
import { isregister, register } from '@/api/api'
let timer = null
export default {
	name: 'register',
	computed: {
		minDate() {
			return (new Date(new Date().getTime() - 60*365*24*60*60*1000))
		},
		maxDate() {
			return (new Date(new Date().getTime() - 10*365*24*60*60*1000))
		},
		areaList() {
			return areaList
		}
	},
	data() {
		return {
			name: '',
			postbox: '',
			authcode: '',
			password: '',
			againpassword: '',
			gender: '小哥哥',
			birthday: '',
			area: '',
			areaCode: '',
			signature: '',
			showActions: false,
		    actions: [
		        { name: '小哥哥' },
		        { name: '小姐姐' },
		    ],
		    showBirthday: false,
		    showArea: false,
		    currentDate: new Date(new Date().getTime() - 10*365*24*60*60*1000),
		    timeDisabled: false,
		    time: 60,
		    text: '发送验证码',
		    disabled: false,
		    loading: false,
		    show: false
		}
	},
	methods: {
		explain() {
			this.$dialog.alert({
				title: '说明',
				message: '别的网站基本上都是用电话号码，我之所以用邮箱是基于一种情怀。电话总是显得太寡淡，没有密码，任何人都可以使用。而邮箱就不一样了，他是真正属于我们的，没有密码别人休想登录，而且一些私密的话，都可以在邮箱上。。。当然了，啰嗦了这么久，主要是短信服务需要钱，我他么的没钱而已'
			})
		},
		// 发送验证码
		sendCode() {
			if(this.postbox === '') { this.$toast.fail('邮箱不能为空'); return }
			if(!mailReg.test(this.postbox)) {this.$toast.fail('请输入正确的邮箱地址'); return }
			isregister(this.postbox).then(res=>{
				if(res.status === 200 && res.succeed) {
					this._email(this.postbox)
				} else {
					this.$toast(res.message)
				}
			})
			
		},
		_email(postbox) {
			let _this = this
			Ajax.request( config.nodeServe ,{
		        data : 'email=' + _this.postbox,
		        success : function(xhr){
		        	let verification = JSON.parse(xhr.response);
		            if(verification.code == 1) {
		            	_this.$toast("发送成功，请注意查收")
		            	_this.timeDisabled = true
		            	timer = setInterval(()=>{
		            		_this.time --
		            		_this.text = _this.time + 's'
		            		if(_this.time <= 0) {
		            			clearInterval(timer)
		            			_this.timeDisabled = false
		            			_this.time = 60
		            			_this.text = '发送验证码'
		            		}
		            	}, 1000)
		            } else {
		            	_this.$toast(verification.msg)
		            }
		        },
		        failure : function(xhr){
		            _this.$toast("发送失败，请稍后重试")
		        }
		    })
		},
		onSelect(e) {
			this.showActions = false
			this.gender = e.name
		},
		_formatDate(date) {
		    var y = date.getFullYear()
		    var m = date.getMonth() + 1
		    m = m < 10 ? ('0' + m) : m
		    var d = date.getDate()
		    d = d < 10 ? ('0' + d) : d
		    return y + '-' + m + '-' + d
		},
		choseBirthday(value) {
			// this.birthday = new Date(value).toLocaleDateString().replace(/\//g, '-')
			this.birthday = this._formatDate(value)
			this.showBirthday = false
		},
		choseArea(value) {
			console.log(value)
			this.areaCode = value[2] ? value[2].code : value[1].code
			this.showArea = false
			this.area = value[2] ? (value[0].name + '-' + value[1].name + '-' + value[2].name) : (value[1].name)
		},
		submit() {
			if(!mailReg.test(this.postbox)) {this.$toast.fail('请输入正确的邮箱地址'); return }
			if(!passwordReg.test(this.password)) { this.$toast.fail('密码格式错误'); return }
			if(this.name === '') { this.$toast.fail('昵称不能为空'); return }
			if(this.postbox === '') { this.$toast.fail('邮箱不能为空'); return }
			if(this.authcode === '') { this.$toast.fail('请输入验证码'); return }
			if(this.password === '') { this.$toast.fail('请输入密码'); return }
			if(this.againpassword !== '' && this.password !== this.againpassword) { this.$toast.fail('两次密码不一致'); return }
			this.disabled = this.loading = true
			let msg = {
				code: this.authcode,
				name: this.name,
				postbox: this.postbox,
				password: this.password,
				gender: this.gender === '小哥哥' ? '0' : this.gender === '小姐姐' ? '1' : '',
				birth: this.birthday,
				area: this.areaCode,
				signature: this.signature
			}
			this.login(msg)
		},
		login(data) {
			let _this = this
			register(data).then(res=>{
				if(res.succeed && res.status === 200) {
					_this.$toast('注册成功')
					localStorage.setItem("mybook_user_msg", JSON.stringify(res.user))
					this.$store.commit('user/userLogin', res.user)
					setTimeout(()=>{
						_this.$router.go(-1)
					}, 1500)
				} else {
					_this.disabled = this.loading = false
					_this.$toast(res.message)
				}
			})
		}
	},
	mounted() {
		
	}
}
</script>

<style lang="less" scoped>
.register {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	.title {
		margin-top: 20px;
		height: 48px;
		line-height: 48px;
		font-size: 24px;
		text-align: center;
		background-image: linear-gradient(red,orange, rgba(255,0,0,1));
		-webkit-background-clip: text;
	    -webkit-text-fill-color: transparent;
	}
	.content {
		margin-top: 20px;
		padding: 0 20px;
		/deep/ .van-field__label {
			width: 80px;
		}
		/deep/ .van-cell {
			padding-right: 0;
		}
	}
	.btn {
		text-align: center;
		margin-top: 30px;
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
	.login {
		margin-top: 20px;
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
	.chose-birthday {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column-reverse;
	}
}
</style>