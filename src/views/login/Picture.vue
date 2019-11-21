<template>
	<div class="main">
		<van-image-preview
			v-model="fixedShow"
			:images="images"
			:show-index="false"
			:async-close="true"
			@close="show = true"
		></van-image-preview>

		<van-action-sheet v-model="show" cancel-text="取消" @cancel="show = false" :actions="actions" @select="onSelect"/>
		<div v-show="false">
			<van-uploader ref="uploader" :before-read="beforeRead" :after-read="afterRead" capture="camera" />
		</div>

	</div>
</template>

<script>
export default {
	name: 'inforPicture',
	data() {
		return {
			fixedShow: true,
			images: ['https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572251806&di=e8fe196beeba48bd15b7ab41d2295b74&src=http://www.leawo.cn/attachment/201404/16/1433365_1397624557Bz7w.jpg'],
			show: false,
			actions: [
		        { name: '上传照片' },
		        { name: '保存照片' }
		    ]
		}
	},
	methods: {
		afterRead() {
			console.log('上传')
		},
		onSelect(a) {
			console.log(a)
		},
		beforeRead() {
			console.log(1234)
		},
		test() {
			console.log(this.$refs.uploader)
		}
	},
	mounted() {
		
	}
}
</script>

<style lang="less" scoped>
.main {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.9);
}
.main /deep/ .van-overlay {
	background-color: rgba(0,0,0,.2);
}
</style>