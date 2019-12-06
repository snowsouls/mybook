<template>
	<div id="app">
	    <div v-if="info" class="main">
			<div class="title">
				<div class="left">
					<img :src="info.user.picture" alt="图像" />
					<div>
						<div class="name">{{ info.user.name }}</div>
						<div class="time">{{ info.time }}</div>
					</div>
				</div>
			</div>
			<div class="address">
				<div v-html="info.article"></div>
				<div class="author">
					<span v-if="info.author || info.provenance">——</span>
					<span>{{info.author}} </span>
					<span>{{info.provenance}}</span>
				</div>
			</div>
		</div>
	    <transition-group tag="ul" name="fade" class="comment-box">
	        <li v-for="(item, index) in comments" :key="index" class="comment">
	        	<img :src="item.picture" class="picture" alt="图像" />
	        	<div class="right">
	        		<div class="name-box">
						<div class="name">{{item.name}}</div>
						<div class="zan" @click="giveLike(index)">
							<img src="@/assets/like-active.png">
							<span>赞</span>
						</div>
					</div>
					<div class="content">{{item.content}}</div>
	        	</div>
	        </li>
	        <!-- <li v-for="(item, index) in items" :key="item">Item {{index}}</li> -->
	    </transition-group>
	</div>
</template>

<script>
let comment_id = 0
import { getDetail, publishComment, publishReply, delateReply } from '@/api/api'
export default {
	name: 'settings',
	data() {
		return {
			items: [1,2,3,4,5,6,7,8,9],
			page: 1,
			count: 10,
			loading: false,					// 数据加载完成
			finished: false,				// 数据全部加载完毕
			finishedText: '没有更多了',		// 数据全部加载完毕后的提示文字
			publishStatus: '1',				// 评论状态，1：是1级评论（评论文章的），2：是2级评论（回复1级评论），3：是回复2级评论的
			info: '',		// 文章
			comments: [],	// 评论
			content: '',
			commentIndex: 0,				// 二级回复index
			commentKey: 0,				// 二级回复key
			commentId: 0,					// 被回复评论的id
			replyId: 0,						// 三级回复 被回复的id
			id: '',					// 三级回复 被回复的邮箱id
			name: '',						// 三级回复 被回复的name
			placeholder: '发表神评妙论...'	// input默认文字
		}
	},
	methods: {
		_getDeail(id) {
			getDetail(id, this.page, this.count).then(res=>{
				if(res.status === 200) {
					this.info = res.data
					this.comments = this.comments.concat(res.comment.data)
					if(!res.comment.has_more) {
						this.finished = true
					}
					if(res.comment.data.length === 0) {
						this.finishedText = ""
					}
					this.page += 1
					this.loading = false
				}
			})
		},
		giveLike(index) {
			this.comments.splice(index, 1)
		}
	},
	created() {
		this._getDeail(150)
	}
}
</script>

<style lang="less" scoped>
img {
	width: 270px;
	height: 360px;
}

// *{list-style: none;}
// li{width: 300px; margin-bottom: 5px; background-color: #ccc;}

// // .list-enter{height: 100%;}
// // .list-enter-active{transition: all .5s;}

// .list-leave-active{transition: all .5s; height: 0;opacity: 0;}

*{list-style: none;}
li{width: 300px; height: 100%; margin-bottom: 5px; background-color: #ccc;}

// .list-enter{height: 100%;}
// .list-enter-active{transition: all .5s;}

// .list-leave-active{transition: all .5s; height: 0;opacity: 0;}

.fade-enter,
.fade-leave-to{
    opacity: 0;
    transform: translate(375, 180);
}
.fade-enter-active, .fade-leave-active{
    transition: all 1s ease;
}

.fade-move{
   transition: all 0.6s ease;
}
.fade-leave-active{
    position: absolute;
}


.main {
	padding: 10px 10px 0;
	position: relative;
	&:after {
		content: '';
		width: 100%;
		height: 10px;
		background-color: #f5f5f5;
		position: absolute;
		left: 0;
		bottom: -10px;
	}
	.title {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		.left {
			height: 40px;
			display: flex;
			img {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				margin-right: 10px;
			}
			.name {
				height: 24px;
				line-height: 24px;
				font-size: 16px;
				color: #333;
			}
			.time {
				height: 16px;
				line-height: 16px;
				font-size: 14px;
				color: #999;
			}
		}
	}
	.address {
		padding-bottom: 10px;
		.author {
			text-align: right;
			padding-right: 30px;
		}
	}
}
.comment-box {
	padding: 20px 20px 0;
	.comment {
		padding-bottom: 20px;
		display: flex;
		// height: 96px;
		// overflow: hidden;
		&:last-child {
			padding-bottom: 0;
		}
		.picture {
			flex: none;
			width: 32px;
			height: 32px;
			border-radius: 50%;
			margin-right: 10px;
		}
		.right {
			flex: auto;
			font-size: 0;
			.name-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.name {
					font-size: 14px;
					color: #07c0fc;
				}
				.zan {
					span {
						color: #999;
						font-size: 12px;
						vertical-align: middle;
						margin-left: 4px;
					}
					img {
						width: 16px;
						height: 16px;
						vertical-align: middle;
					}
				}
			}
			.content {
				font-size: 16px;
				padding: 4px 0;
				word-break:break-all;
			}
			.handle-box {
				.time {
					color: #999;
					font-size: 12px;
				}
				.reply {
					color: #333;
					font-size: 12px;
				}
			}
			.reply-box {
				font-size: 0;
				margin-top: 8px;
				padding: 4px;
				background-color: #fafafa;
				border-radius: 4px;
				.text {
					font-size: 12px;
					&.name {
						word-break: break-all;
						color: #07c0fc;
					}
					&.old {
						margin: 0 4px;
					}
					&.msg {
						word-break: break-all;
					}
				}
			}
		}
	}
	.noComment {
		display: flex;
		flex-direction: column;
		align-items: center;
		.img {
			width: 72px;
			height: 60px;
			margin-top: 10px;
		}
		.text {
			margin-top: 10px;
			color: #999;
		}
		.btn {
			margin-top: 10px;
			width: 90px;
			height: 30px;
			line-height: 30px;
			border-color: #d9d9d9;
			border-radius: 4px;
		}
	}
}
</style>