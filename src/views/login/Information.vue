<template>
	<div class="main">
		<van-cell-group>
			<van-cell title="头像" center class="picture-box">
				<img class="picture" :src="$config.imagesUrl + $user.picture || '@/assets/default_1.jpg'" alt="默认图" @click="lookImgDetail($config.imagesUrl + $user.picture)" />
			</van-cell>
			<van-cell title="昵称" :value="$user.name" is-link :clickable="false" to="/information/message?param=name"/>
			<van-cell title="账号" :value="$user.postbox" />
			<van-cell title="性别" :value="getGender($user.gender)" is-link :clickable="false" to="/information/message?param=gender"/>
			<van-cell title="地区" :value="getArea($user.area)" is-link :clickable="false" to="/information/message?param=area"/>
			<van-cell title="出生年月" :value="$user.birth === '0000-00-00' ? '未填写' : $user.birth" is-link :clickable="false" to="/information/message?param=birth"/>
			<van-cell title="个性签名" center :value="$user.signature || '未填写'" is-link :clickable="false" to="/information/message?param=signature"/>
		</van-cell-group>
	</div>
</template>

<script>
import {ImagePreview} from "vant"
import areaList from '@/assets/json/area'
export default {
	name: 'information',
	data() {
		return {
			
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
			if(value) {
				let province = value.replace(/\d{4}$/g, '0000')
				if(/^9/.test(province)) {
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
		},
		lookImgDetail(url) {
			ImagePreview({
				images: [url],
				maxZoom: 9,
				onClose() {
					// do something
				}
			})
		}
	},
	created() {
		if(!this.$user.postbox) {
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