<template>
	<div class="main">
		<div class="header">
			<span @click="$router.history.go(-1)">取消</span>
			<div>
				<van-button type="primary" size="mini" :disabled="disabled" @click="changeMsg">完成</van-button>
			</div>
		</div>
		<div v-if="flag === 'name'">
			<van-field v-model.trim="value" clearable ref="inputValue" @focus="onInputFocus"/>
		</div>
		<div v-if="flag === 'gender'">
			<van-radio-group v-model="value">
				<van-cell-group>
					<van-cell title="小哥哥" clickable @click="value = '0'">
						<van-radio slot="right-icon" name="0"  checked-color="#07c160"/>
					</van-cell>
					<van-cell title="小姐姐" clickable @click="value = '1'">
						<van-radio slot="right-icon" name="1"  checked-color="#07c160"/>
					</van-cell>
					<van-cell title="不告诉你" clickable @click="value = '2'">
						<van-radio slot="right-icon" name="2"  checked-color="#07c160"/>
					</van-cell>
				</van-cell-group>
			</van-radio-group>
		</div>
		<div v-if="flag === 'area'">
			<van-cell-group>
				<van-field v-model="value" label="地址" readonly @click="showArea = true" />
			</van-cell-group>
		</div>
		<div v-if="flag === 'birth'">
			<van-cell-group>
				<van-field v-model="value" label="生日" readonly @click="showBirthday = true" />
			</van-cell-group>
		</div>
		<div v-if="flag === 'signature'">
			<van-cell-group>
				<van-field
					v-model="value"
					rows="3"
					autosize
					type="textarea"
					maxlength="50"
					show-word-limit
				/>
			</van-cell-group>
		</div>

		<van-popup v-model="showArea" position="bottom" :style="{ height: '264px' }">
			<div>
				<van-area :area-list="areaList" :value="areaCode" @confirm="choseArea" />
			</div>
		</van-popup>

		<van-popup v-model="showBirthday" position="bottom" :style="{ height: '264px' }">
			<div>
				<van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @confirm="choseBirthday" />
			</div>
		</van-popup>
	</div>
</template>

<script>
import areaList from '@/assets/json/area'
import { UESR_MESSAGE } from '@/store/mutation-types'
export default {
	name: 'message',
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
	watch: {
		value(newV) {
			if(newV === '未填写' || newV === this.$store.state.userMessage[this.flag] || (this.flag === 'name' && newV === '')) {
				this.disabled = true
			} else {
				this.disabled = false
			}
		}
	},
	data() {
		return {
			flag: '',
			disabled: true,
			value: '',
			showArea: false,
			areaCode: '',
			showBirthday: false,
			currentDate: ''
		}
	},
	methods: {
		changeMsg() {
			if(this.flag === 'area') {
				this.$store.state.userMessage[this.flag] = this.areaCode
			} else {
				this.$store.state.userMessage[this.flag] = this.value
			}
			this.$store.commit(UESR_MESSAGE)
			this.$router.history.go(-1)
		},
		choseArea(value) {
			this.areaCode = value[2] ? value[2].code : value[1].code
			this.showArea = false
			this.value = value[2] ? (value[0].name + '-' + value[1].name + '-' + value[2].name) : (value[1].name)
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
			this.showBirthday = false
			this.value = this._formatDate(value)
		},
		onInputFocus() {
			setTimeout(()=>{
				this.$refs.inputValue.focus()
			},300)
		},
		_initMsg() {
			switch(this.flag) {
				case 'name':
					this.value = this.$store.state.userMessage['name']
					this.onInputFocus()
					break;
				case 'gender':
					this.value = this.$store.state.userMessage["gender"]
					break;
				case 'area':
					let areaCode = this.areaCode = this.$store.state.userMessage.area
					if(areaCode) {
						let province = areaCode.replace(/\d{4}$/g, '0000')
						if(/^9/.test(province)) {
							this.value = this.areaList.city_list[areaCode]
						} else {
							let city = areaCode.replace(/\d{2}$/g, '00')
							this.value = this.areaList.province_list[province] + '-' + this.areaList.city_list[city] + '-' + this.areaList.county_list[areaCode]
						}
					} else {
						this.value = '未填写'
					}
					break;
				case 'birth':
					let time = this.$store.state.userMessage.birth
					this.value = time === '0000-00-00' ? '未填写' : time
					let date = (time && time !== '0000-00-00') ? time : this._formatDate(new Date())
					this.currentDate = new Date(Date.parse(date.replace(/-/g, "/")))
					break;
				case 'name':
				case 'signature':
					this.value = this.$store.state.userMessage[this.flag]
					break;
				default:
					this.$router.replace({
						path: '/home'
					})
			}
		}
	},
	created() {
		this.flag = this.$route.query.param
		// if(this.flag !== 'area') {
		// 	this.value = this.$store.state.userMessage[this.flag]
		// }
		// if(this.flag === 'name') {
		// 	this.onInputFocus()
		// }
		// if(this.flag === 'area') {
		// 	this.areaCode = this.$store.state.userMessage.area
		// 	let areaCode = this.$store.state.userMessage.area
		// 	if(areaCode) {
		// 		let province = areaCode.replace(/\d{4}$/g, '0000')
		// 		if(/^9/.test(province)) {
		// 			this.value = this.areaList.city_list[areaCode]
		// 		} else {
		// 			let city = areaCode.replace(/\d{2}$/g, '00')
		// 			this.value = this.areaList.province_list[province] + '-' + this.areaList.city_list[city] + '-' + this.areaList.county_list[areaCode]
		// 		}
		// 	} else {
		// 		this.value = '未填写'
		// 	}
		// }
		// if(this.flag === 'birth') {
		// 	let time = this.$store.state.userMessage.birth
		// 	this.value = time === '0000-00-00' ? '未填写' : time
		// 	let date = (time && time !== '0000-00-00') ? time : this._formatDate(new Date())
		// 	this.currentDate = new Date(Date.parse(date.replace(/-/g, "/")))
		// }
		this._initMsg()
	}
}
</script>

<style lang="less" scoped>
.main {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: #f5f5f5;
	.header {
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
		font-size: 14px;
		/deep/ .van-button--mini {
			height: 28px;
		}
	}
}
.router-link-active {
	color: #333;
}
</style>