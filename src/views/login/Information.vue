<template>
	<div class="main">
		<van-cell-group>
			<van-cell title="头像" center is-link to="/information/picture" class="picture-box">
				<img class="picture" src="@/assets/default_1.jpg" alt="默认图" />
			</van-cell>
			<van-cell title="昵称" :value="msg.name" is-link :clickable="false" to="/information/message?param=name"/>
			<van-cell title="账号" :value="msg.postbox" />
			<van-cell title="性别" :value="getGender(msg.gender)" is-link :clickable="false" to="/information/message?param=gender"/>
			<van-cell title="地区" :value="getArea(msg.area)" is-link :clickable="false" to="/information/message?param=area"/>
			<van-cell title="出生年月" :value="msg.birth || '未填写'" is-link :clickable="false" to="/information/message?param=birth"/>
			<van-cell title="个性签名" center :value="msg.signature || '未填写'" is-link :clickable="false" to="/information/message?param=signature"/>
		</van-cell-group>
	</div>
</template>

<script>
import areaList from '@/assets/json/area'
export default {
	name: 'information',
	computed: {
		msg() {
			return this.$store.state.userMessage
		}
	},
	data() {
		return {
			person: {
				name: 'LoveT',
				gender: '0',
				area: '湖北省-十堰市-郧阳区',
				birth: '1992-9-3',
				signature: '所谓的礼物啊，比起收到礼物的人，送礼物的人更加幸福'
			}
		}
	},
	methods: {
		getGender(value) {
			let sex = ''
			switch(value) {
				case '0':
					sex = '小哥哥';
					break;
				case '1':
					sex = '小姐姐';
					break;
				default:
					sex = '不告诉你';
			}
			return sex
		},
		getArea(value) {
			console.log(value)
			if(value) {
				let province = value.replace(/\d{4}$/g, '0000')
				if(province === '970000') {
					return areaList.city_list[value]
				} else {
					let city = value.replace(/\d{2}$/g, '00')
					return (areaList.province_list[province] + '-' + areaList.city_list[city] + '-' + areaList.county_list[value])
				}
			} else {
				return '未填写'
			}
		},
		goName() {
			this.$router.push({
				path: '',
				query: {param: 'name'}
			})
		}
	},
	created() {
		this.person = this.$store.state.userMessage
		if(!this.person.postbox) {
			this.$router.replace('my')
		}
	}
}
</script>

<style lang="less" scoped>
.main {
	/deep/ .van-cell__value {
		flex: 3;
	}
}
.picture {
	width: 50px;
	height: 50px;
	border-radius: 4px;
}
.picture-box {
	// align-items: center;
	line-height: normal;
	/deep/ .van-cell__value {
		font-size: 0;
	}
} 
</style>