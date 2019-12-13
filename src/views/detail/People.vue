<template>
	<div class="people">
		<div class="bj-img">
			<van-image
				class="img"
				fit="cover"
				:src="userInfo.picture"
			/>
		</div>
		<div class="main-box">
			<div class="main">
				<div class="user" @click="imgShow = true">
					<van-image
						class="picture"
						round
						fit="cover"
						:src="userInfo.picture"
					/>
				</div>
				<van-sticky @scroll="scroll">
					<div class="sticky-box" :class="(isShowSticky && !hiddenLine) && 'line'" v-show="isShowSticky">
						<van-image
							class="picture"
							round
							fit="cover"
							:src="userInfo.picture"
						/>
						<div class="name">{{userInfo.name}}</div>
						<div class="attention"  @click="attentionPeople">
							<template v-if="isLoading">
								<van-loading :size="16" color="#fff" />
							</template>
							<template v-else>
								{{isAttention ? '已关注' : '关注'}}
							</template>	
						</div>
					</div>
				</van-sticky>
				<div class="handle-box">
					<div class="handle attention" :class="isAttention && 'gray'" @click="attentionPeople">
						<template v-if="isLoading">
							<van-loading :size="16" color="#fff" />
						</template>
						<template v-else>
							{{isAttention ? '已关注' : '关注'}}
						</template>
					</div>
					<div class="handle letter">私信</div>
				</div>
			</div>
			<div class="message-box">
				<div class="name">{{userInfo.name}}</div>
				<div class="text" v-if="userInfo.signature">{{userInfo.signature}}</div>
				<div class="text" v-if="isShowMsg">
					<span>个人资料：</span>
					<span>24岁</span>
					<span class="margin">广东</span>
					<span class="margin">水瓶座</span>
					<span>男</span>
				</div>
				<div class="text" v-if="!userInfo.signature && !isShowMsg">他什么都没留下，想了解ta就私聊吧</div>
				<div class="fans">
					<div class="left"><span class="num">51</span>关注</div>
					<div><span class="num">27</span>粉丝</div>
				</div>
			</div>
			<van-sticky :offset-top="36" @scroll="scrollChose">
				<div class="chose-box">
					<div class="chose" :class="choseIndex === index && 'active'" v-for="(item, index) in choseArr" @click="lookMsg(index)">{{item}}</div>
				</div>
			</van-sticky>
			<div v-for="num in 100">
				<li style="height: 32px">{{num}}</li>
			</div>
			<van-image-preview v-model="imgShow" :images="imgArr" :showIndex="false" />
		</div>
	</div>
</template>

<script>
let comment_id = 0
import { getUserMessage, attention } from '@/api/api'
export default {
	name: "detail",
	computed: {
		isShowMsg() {
			if(this.userInfo) {
				return (this.userInfo.area !== '') || (this.userInfo.birth !== '0000-00-00') || (this.userInfo.gender !== '2')
			}
		}
	},
	data() {
		return {
			userInfo: '',		// 个人信息
			isAttention: false,	// 是否关注
			imgArr: [],			// 图片
			imgShow: false,		// 是否显示图片
			isShowSticky: false,	// 人物名称吸顶
			hiddenLine: false,		// 选项卡吸顶
			choseArr: ['文章','点赞','收藏'],
			choseIndex: 0,
			isLoading: false
		}
	},
	methods: {
		_getInfo(id) {
			getUserMessage(this.$user.id, id).then(res=>{
				if(res.status === 200) {
					this.userInfo = res.data
					this.isAttention = res.isAttention
				}
			})
		},
		scroll(e) {
			this.isShowSticky = e.isFixed
		},
		scrollChose(e) {
			this.hiddenLine = e.isFixed
		},
		// 关注
		attentionPeople() {
			this.isLoading = true
			attention(this.$user.id, this.userInfo.id).then(res=>{
				if(res.status === 200) {
					this.$toast(res.message)
					this.isLoading = false
					this.isAttention = res.isAttention
				}
			})
		},
		lookMsg(index) {
			this.choseIndex = index
		}
	},
	created() {
		let id = this.$route.query.id
		this._getInfo(id)
	}
}
</script>

<style lang="less" scoped>
.people {
	width: 100%;
	// overflow-x: hidden;
	.bj-img {
		width: 100%;
		height: 160px;
		overflow: hidden;
		.img {
			width: 100%;
			height: 100%;
			filter: blur(48px) brightness(80%);
		}
	}
	.main-box {
		.main {
			display: flex;
			justify-content: space-between;
			position: relative;
			.user {
				padding-top: 32px;
				.picture {
					width: 56px;
					height: 56px;
					position: absolute;
					top: -28px;
					left: 10px;
				}
			}
			.handle-box {
				height: 36px;
				padding: 0 10px;
				display: flex;
				flex-direction: row-reverse;
				align-items: flex-end;
				.handle {
					width: 64px;
					height: 24px;
					font-size: 12px;
					text-align: center;
					line-height: 24px;
					margin-right: 4px;
					border-radius: 6px;
					&.letter {
						color: #1989fa;
						position: relative;
						&:before {
							content: " ";
							width: 128px;
							height: 48px;
						    box-sizing: border-box;
							border: 1px solid #1989fa;
							border-radius: 12px;
							position: absolute;
							top: 0;
							left: 0;
						    transform-origin: 0 0;
							transform: scale(0.5);
						}
					}
					&.attention {
						background-color: #1989fa;
						color: #fff;
						&.gray {
							color: #999;
							background-color: transparent;
							position: relative;
							&:before {
								content: " ";
								width: 128px;
								height: 48px;
							    box-sizing: border-box;
								border: 1px solid #999;
								border-radius: 12px;
								position: absolute;
								top: 0;
								left: 0;
							    transform-origin: 0 0;
								transform: scale(0.5);
							}
						}
					}
				}
			}
			.sticky-box {
				width: 100%;
				box-sizing: border-box;
				padding: 0 10px;
				height: 36px;
				background-color: #fff;
				position: absolute;
				display: flex;
				align-items: center;
				transition: all .5s;
				&.line:after {
					content: " ";
					width: 100%;
					height: 0;
					border-bottom: 1px solid #f5f5f5;
					position: absolute;
					left: 0;
					bottom: 0;
					transform: scaleY(0.5);
				}
				.picture {
					width: 28px;
					height: 28px;
				}
				.name {
					color: #333;
					font-size: 14px;
					margin: 0 8px;
				}
				.attention {
					width: 56px;
					height: 24px;
					text-align: center;
					line-height: 24px;
					border: 1px solid #1989fa;
					border-radius: 4px;
					font-size: 12px;
					background-color: #1989fa;
					color: #fff;
					transform: scale(.8);
				}
			}
		}
		.message-box {
			font-size: 12px;
			color: #999;
			padding: 0 10px 10px;
			position: relative;
			&:after {
				content: " ";
				width: 100%;
				height: 10px;
				background-color: #f5f5f5;
				position: absolute;
				left: 0;
				bottom: 0;
			}
			.name {
				height: 24px;
				line-height: 24px;
				color: #333;
				font-size: 16px;
				font-weight: bold;
			}
			.text {
				height: 20px;
				line-height: 20px;
			}
			.fans {
				display: flex;
				align-items: center;
				height: 24px;
				.left {
					padding-right: 20px;
					position: relative;
					&:after {
						content: " ";
						width: 0;
						height: 12px;
						border-right: 1px solid #e6e6e6;
						position: absolute;
						top: 50%;
						right: 10px;
						transform: translateY(-50%) scaleX(0.5);
					}
				}
				.num {
					color: #666;
					font-size: 14px;
					margin-right: 4px;
				}
			}
		}
		.chose-box {
			height: 32px;
			line-height: 32px;
			padding: 0 10px;
			display: flex;
			align-items: center;
			background-color: #fff;
			color: #999;
			font-size: 12px;
			box-sizing: border-box;
			position: relative;
			&:after {
				content: " ";
				width: 100%;
				height: 0;
				border-bottom: 1px solid #f5f5f5;
				position: absolute;
				left: 0;
				bottom: 0;
				transform: scaleY(0.5);
			}
			.chose {
				margin-right: 24px;
				height: 100%;
				box-sizing: border-box;
				transition: all .3s;
				&.active {
					font-size: 14px;
					color: #333;
					font-weight: bold;
					border-bottom: 2px solid #1989fa;
				}
			}
		}
	}
}
</style>