<template>
	<div v-if="info" class="detail">
		<div @touchstart.capture="changeStatus">
			<div class="main">
				<div class="title">
					<div class="left">
						<img :src="$config.imagesUrl + info.user.picture" alt="图像" />
						<div>
							<div class="name">{{ info.user.name }}</div>
							<div class="time">{{ info.time | transformDate }}</div>
						</div>
					</div>
				</div>
				<div class="address">
					<div class="article" v-html="info.article"></div>
					<div class="author">
						<span v-if="info.author || info.provenance">——</span>
						<span>{{info.author}}</span>
						<span>{{info.provenance}}</span>
					</div>
				</div>

				<div class="report-box" @click="report">
					<img class="img" src="@/assets/report.png" alt="举报">
					<span class="text">举报/反馈</span>
				</div>
				<div class="main-handle">
					<div class="handle" :class="info.isLike ? 'active' : 'no-active'" @click="goLikeArticle">
						<img class="img" :src="info.isLike ? require('../../assets/like-active.png') : require('../../assets/like.png')" alt="赞">
						<span>{{info.likes || '抢首赞'}}</span>
					</div>
					<div class="handle" :class="isHot ? 'active' : 'no-active'" @click="recommend">
						<img class="img" src="@/assets/recommend.png" alt="荐">
						<span>{{info.hot || '强推荐'}}</span>
					</div>
				</div>
			</div>
			<van-list v-model="loading"	:finished="finished" :immediate-check="false" :finished-text="finishedText"	@load="onLoad">
				<transition-group name="fade" tag="ul" class="comment-box">
					<li class="comment" v-for="(item,index) in comments" :key="item.id">
						<img :src="$config.imagesUrl + item.picture" class="picture" alt="图像" />
						<div class="right">
							<div class="name-box">
								<div class="name">{{item.name}}</div>
								<div class="zan" @click="giveLike(item, index)">
									<img v-if="item.isLike" src="@/assets/like-active.png">
									<img v-else src="@/assets/like.png">
									<span>{{ item.likes || '赞' }}</span>
								</div>
							</div>
							<div class="content">{{item.content}}</div>
							<div class="handle-box">
								<span class="time">{{item.time | transformDate}} · </span>
								<span class="reply" @click.stop="replyComment(item.name, item.id, index)">回复</span>
								<span v-if="$user.id === item.user_id" class="reply" @click="delateComment(item.id, index)"> · 删除</span>
							</div>
							<div class="reply-box" v-if="item.replys && item.replys.length > 0">
								<div v-for="(reply, replyIndex) in item.replys" :key="replyIndex">
									<span class="text name">{{reply.comment_name}}</span>
									<span class="text old" v-if="reply.reply_name">回复</span>
									<span class="text name" v-if="reply.reply_name">{{reply.reply_name}}</span>
									<span class="text msg" @click.stop="replyOthers(item.id, reply.id, reply.user_id, reply.comment_name, index)">：{{reply.content}}</span>
								</div>
							</div>
						</div>
					</li>
					<div v-if="comments.length === 0" class="noComment" key="noComment">
						<img class="img" src="@/assets/noComment.png" alt="图像" />
						<p class="text">还没有人评论，点击抢沙发~</p>
						<van-button class="btn" color="#bfbfbf" plain @click="getFocus">立即评论</van-button>
					</div>
				</transition-group>
			</van-list>
		</div>
		<div class="fixed-box">
			<!-- <input type="text" v-model="content">
			<button @click="publishContent">发送</button> -->
			<van-cell-group>
				<van-field
					ref="vanField"
					v-model="content"
					center
					:placeholder="placeholder"
					@keyup.enter="publish"
					>
					<van-button slot="button" size="small" hairline type="primary" :disabled="content === ''" @click="publish">发送</van-button>
				</van-field>
			</van-cell-group>
		</div>
	</div>
</template>

<script>
let comment_id = 0, comment_index = -1
import { mapState } from 'vuex'
import { getDetail, publishComment, publishReply, delateReply, likeComment, letHot, likeArticle } from '@/api/api'
export default {
	name: "detail",
	filters: {
		transformTime(time) {
			let newT = ''
			if(time.indexOf(' ') !== -1) {
				newT = time.slice(0, -3)
			} else {
				newT = time
			}
			return newT
		},
		transformDate(time) {
			let timeMinus = parseInt(Date.now()/1000) - parseInt(new Date(time).getTime()/1000)
			if(timeMinus < 60) {
				return '刚刚'
			} else if (timeMinus < 120) {
				return '一分钟前'
			} else if (timeMinus < 600) {
				return '十分钟前'
			} else if (timeMinus < 3600) {
				return '1小时前'
			} else if (timeMinus < 86400) {
				var num = Math.floor(timeMinus/3600)
				return `${num}小时前`
			} else if (timeMinus < 2592000) {
				var num = Math.floor(timeMinus/86400)
				return `${num}天前`
			} else {
				let data = time.split(" ")[0].split("-")
				if(new Date().getYear() === data[0]) {
					return `${data[1]}-${data[2]}`		// 不带年份
				} else {
					return time.split(" ")[0]		// 带年份
				}
			}
		}
	},
	data() {
		return {
			page: 1,
			count: 10,
			loading: false,					// 数据加载完成
			finished: false,				// 数据全部加载完毕
			finishedText: '没有更多了',		// 数据全部加载完毕后的提示文字
			publishStatus: '1',				// 评论状态，1：是1级评论（评论文章的），2：是2级评论（回复1级评论），3：是回复2级评论的
			info: '',						// 文章
			comments: [],					// 评论
			content: '',
			commentIndex: 0,				// 二级回复index
			commentKey: 0,				// 二级回复key
			commentId: 0,					// 被回复评论的id
			replyId: 0,						// 三级回复 被回复的id
			id: '',					// 三级回复 被回复的邮箱id
			name: '',						// 三级回复 被回复的name
			placeholder: '发表神评妙论...',	// input默认文字
			isHot: false,					// 是否推荐，每次进入都可以推荐
		}
	},
	methods: {
		getFocus() {
			this.$refs.vanField.focus()
		},
		changeStatus() {
			this.publishStatus = '1'
			this.placeholder = '发表神评妙论...'
		},
		_getDeail(id) {
			getDetail(id, this.page, this.count, String(this.$user.id)).then(res=>{
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
		report() {
			this.$router.push({
				name:'report',
				query:{
					id: comment_id
				}
			})
		},
		goLikeArticle() {
			if(this.$user.postbox) {
				likeArticle(this.info.id, String(this.$user.id), this.info.likes).then(res=>{
					if(res.status === 200) {
						console.log(comment_index)
						this.$toast(res.message)
						this.info.isLike = res.isLike
						this.info.likes = res.isLike ? (this.info.likes + 1) : (this.info.likes - 1)
						if(comment_index !== -1) {
							this.$store.commit('article/setLike', {
								index: comment_index,
								likes: this.info.likes,
								isLike: this.info.isLike
							})
						}
					}
				})
			} else {
				this.$router.push('login')
			}
		},
		// 推荐
		recommend() {
			if(this.isHot) return
			letHot(this.info.id).then(res=>{
				if(res.status === 200) {
					this.$toast(res.message)
					this.info.hot = res.data
					this.isHot = true
				}
			})
		},
		onLoad() {
			this._getDeail(comment_id)
		},
		publish() {
			switch(this.publishStatus) {
				case '1':
					this.publishContent()
					break;
				case '2':
					this.publishReplys()
					break;
				case '3':
					this.publishReplyOthers()
					break;
				default:
					throw '错误！！！'
			}
		},
		// 发表1级评论
		publishContent() {
			if(this.$user.postbox) {
				publishComment(comment_id, this.$user.id, this.$user.name, this.$user.picture, this.content).then(res=>{
					if(res.status === 200) {
						this.$toast('评论成功')
						this.comments.unshift({
							id: parseInt(res.succeeId),
							picture: this.$user.picture,
							name: this.$user.name,
							content: this.content,
							user_id: this.$user.id,
							time: '刚刚',
							replys: []
						})
						if(comment_index !== -1) {
							this.$store.commit('article/setComment', {
								index: comment_index,
								commnum: 1
							})
						}
						this.content = ''
					}
				})
			} else {
				this.$router.push('login')
			}
		},
		// 回复2级评论
		replyComment(name, id, index) {
			this.placeholder = `回复${name}:`
			this.publishStatus = '2'
			this.$refs.vanField.focus()
			this.commentId = id
			this.commentIndex = index
		},
		// 发表2级回复
		publishReplys() {
			if(this.$user.postbox) {
				publishReply(this.commentId, this.$user.id, this.$user.name, this.content).then(res=>{
					if(res.status === 200) {
						this.$toast('回复成功')
						this.comments[this.commentIndex]['replys'].unshift({
							comment_name: this.$user.name,
							content: this.content
						})
						if(comment_index !== -1) {
							this.$store.commit('article/setComment', {
								index: comment_index,
								commnum: 1
							})
						}
						this.content = ''
					}
				})
			} else {
				this.$router.push('login')
			}
		},
		// 回复3级评论
		replyOthers(id, replyId, userId, name, index) {
			this.placeholder = `回复${name}:`
			this.publishStatus = '3'
			this.$refs.vanField.focus()
			this.commentId = id
			this.replyId = replyId
			this.id = userId
			this.name = name
			this.commentIndex = index
		},
		// 发表3级回复
		publishReplyOthers() {
			if(this.$user.postbox) {
				publishReply(this.commentId, this.$user.id, this.$user.name, this.content, this.replyId, this.id, this.name).then(res=>{
					if(res.status === 200) {
						this.$toast('回复成功')
						this.comments[this.commentIndex]['replys'].unshift({
							comment_name: this.$user.name,
							content: this.content,
							reply_name: this.name
						})
						if(comment_index !== -1) {
							this.$store.commit('article/setComment', {
								index: comment_index,
								commnum: 1
							})
						}
						this.content = ''
					}
				})
			} else {
				this.$router.push('login')
			}
		},
		// 评论点赞
		giveLike(item, index) {
			if(this.$user.postbox) {
				likeComment(item.id, String(this.$user.id), item.likes || 0).then(res=>{
					if(res.status === 200) {
						this.$toast(res.message)
						item.likes = res.isLike ? (item.likes + 1) : (item.likes - 1)
						item.isLike = res.isLike
					}
				})
			} else {
				this.$router.push('login')
			}
		},
		// 删除评论
		delateComment(id, index) {
			this.$dialog.confirm({
					title: '提示',
					message: '确认删除评论？'
				}).then(() => {
					delateReply(id).then(res=>{
						if(res.status === 200) {
							this.$toast(res.message)
							this.comments.splice(index, 1)
							if(comment_index !== -1) {
								this.$store.commit('article/setComment', {
									index: comment_index,
									commnum: -1
								})
							}
						} else {
							this.$toast(res.error)
						}
					})
				}).catch(() => {
					// on cancel
			});
			
		}
	},
	created() {
		comment_id = this.$route.query.id
		comment_index = this.$route.query.index === undefined ? -1 : this.$route.query.index
		this._getDeail(comment_id)
	}
}
</script>

<style lang="less" scoped>
.detail {
	padding-bottom: 50px;
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
			.article {
				white-space: pre-line;
			}
			.author {
				text-align: right;
				padding-right: 30px;
				font-size: 14px;
			}
		}
		.report-box {
			height: 32px;
			line-height: 32px;
			text-align: right;
			.img {
				width: 16px;
				height: 16px;
				vertical-align: middle;
			}
			.text {
				color: #999;
				font-size: 12px;
				vertical-align: middle;
			}
		}
		.main-handle {
			display: flex;
			justify-content: space-around;
			height: 40px;
			vertical-align: top;
			.handle {
				width: 80px;
				height: 32px;
				line-height: 32px;
				text-align: center;
				color: #999;
				font-size: 14px;
				position: relative;
				&:before {
					content: " ";
					width: 160px;
					height: 64px;
				    box-sizing: border-box;
				    border-width: 1px;
				    border-style: solid;
					// border: 1px solid #ccc;
					border-radius: 32px;
					position: absolute;
					top: 0;
					left: 0;
				    transform-origin: 0 0;
					transform: scale(0.5);
				}
				&.active {
					color: #ed4256;
					&:before {
						border-color: #ed4256;
					}
				}
				&.no-active {
					color: #999;
					&:before {
						border-color: #ccc;
					}
				}
				.img {
					width: 16px;
					height: 16px;
					vertical-align: middle;
					margin-right: 4px;
				}
			}
		}
	}
	.comment-box {
		padding: 20px 20px 0;
		.comment {
			padding-bottom: 20px;
			display: flex;
			// &:last-child {
			// 	padding-bottom: 0;
			// }
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
	.fixed-box {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
	}

.fade-enter {
	transform: translateY(-100%);
}
.fade-leave-to{
    opacity: 0;
    // transform: translateY(100%);
    // height: 0;
}
.fade-enter-active {
	opacity: 0;
    transition: transform .5s ease;
}

.fade-leave-active {
	opacity: 0;
    transition: transform 1s ease;
}

.fade-move{
   transition: transform 1s ease;
}
.fade-leave-active{
    position: absolute;
}

}
</style>