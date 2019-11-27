<!-- <template>
	<div class="home">
		我是列表	
		<div v-for="item in msg">
			{{ item | adjustTime }}
		</div>
		<div @click="change">点赞</div>
		<div>{{this.$store.state.information.name || '请先登录'}}</div>
	</div>
</template>

<script>
import VueStar from 'vue-star'
export default {
	name: 'home',
	data() {
		return {
			msg: ['2014-11-08 12:12:08', '2019-01-08 12:12:08', '2019-01-08 12:12:08', '2019-01-08 12:12:08', '2019-01-08 12:12:08'],
			width: 175, //初始宽度
			height: 400, //初始高度
			heartList: [], //初始数组
			heartCount: 0 //累加计数初始值
		}
	},
	filters: {
		adjustTime: function(value) {
			let newTime = value.slice(0, -3)
			return newTime
		}
	},
	methods: {
		change() {
			this.$store.commit('changeMsg')
		}
	},
	mounted() {
		
	}
}
</script>

<style lang="less" scoped>
	.like-heart {
		width: 40px;
		height: 40px;
	}
</style>
 -->
 <template>
	<div class="home">
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<van-skeleton title avatar :row="3" :loading="initLoading">
				<van-list v-model="loading"	:finished="finished" :immediate-check="false" finished-text="没有更多了"	@load="onLoad">
					<div>
						<div class="box" v-for="(item,index) in articleList" :key="index">
							<div class="title">
								<div class="left">
									<img :src="item.user.picture" alt="图像" />
									<div>
										<div class="name">{{ item.user.name }}</div>
										<div class="time">{{ item.time | transformTime }}</div>
									</div>
								</div>
							</div>
							<div class="content" :class="item.longClick && 'longClick'" @touchstart="gotouchstart($event, item, index)" @touchmove="gotouchmove" @touchend="gotouchend(item.id)">
								<div v-html="item.article"></div>
								<div class="author">
									<span v-if="item.author || item.provenance">——</span>
									<span>{{item.author}} </span>
									<span>{{item.provenance}}</span>
								</div>
								
							</div>
							<div class="like-box">
								<div class="like">
									<img src="@/assets/like.png">
									<span>12</span>
								</div>
								<div class="comment" @click="commentCotent(item.id)">
									<img src="@/assets/comment.png">
									<span>23</span>
								</div>
								<div class="like">
									<img src="@/assets/collect.png">
								</div>
							</div>
						</div>
					</div>
				</van-list>
			</van-skeleton>
			<div class="skeleton" v-if="initLoading">
				<van-skeleton title avatar :row="3" :loading="initLoading"></van-skeleton>
			</div>
			<div class="skeleton" v-if="initLoading">
				<van-skeleton title avatar :row="3" :loading="initLoading"></van-skeleton>
			</div>
		</van-pull-refresh>
		<div class="handleDialog" v-show="handleDialog" @touchstart.stop="hiddenDialog">
			<div class="handle-box" :class="{bottom: triangle}" :style="{top: handleTop + 'px'}">
				<div class="handle left" @touchstart.stop="commentCotent">评论</div>
				<div class="handle">举报</div>
				<div class="handle" v-if="userMessage.postbox === user.postbox || userMessage.authority === '1' || userMessage.authority === '2'" @touchstart.stop="delateArticle">删除</div>
				<div class="handle right" @touchstart.stop="copyCotent">复制</div>
			</div>
		</div>
		<input type="text" id="copybox" ref="copybox">
	</div>
</template>

<script>
import { readArticleList, deteleArticle } from '@/api/api'
let timeOutEvent = null, activeIndex = 0
export default {
	name: 'home',
	computed: {
		userMessage() {
			return this.$store.state.userMessage
		}
	},
	data() {
		return {
			homeTop : 0,			// 页面滚动位置
			id: 0,					// 当前长按id
			user: {},				// 当前长按信息
			initLoading: true,		// 骨架屏显示
			page: 1,
			loading: false,			// 数据加载完成
			finished: false,
			isLoading: false,		// 下拉刷新是否在加载中
			handleDialog: false,	// 操作页是否显示
			handleTop: 0,			// 操作页位置
			triangle: false,		// 操作框小三角的位置，默认在下面
			articleList: []
		}
	},
	filters: {
		transformTime(time) {
			let newT = ''
			if(time.indexOf(' ') !== -1) {
				newT = time.slice(0, -3)
			} else {
				newT = time
			}
			return newT
		}
	},
	methods: {
		_readArticleList(page, count=10) {		// 以后每次加载10条
			readArticleList(count, page).then(res=>{
				res.data.forEach(item=>{
					// item.user.picture = item.user.picture.replace(/www\.mybook\.com/g, '192.168.1.94/tp5')	// 本地测试使用
					item.longClick = false
				})
				if(res.data.length < count) {
					this.finished = true
				}
				this.articleList = this.articleList.concat(res.data)
				this.page += 1
				this.loading = false
				this.initLoading = false
			})
		},
		onLoad() {
			this._readArticleList(this.page)
		},
		onRefresh() {
			setTimeout(() => {
				this.$toast('刷新成功')
				this.isLoading = false
			}, 500);
		},
		gotouchstart(event, item, index){
			timeOutEvent = setTimeout(()=> {
				this.id = item.id
				this.user = item.user
				let location = event.target.getBoundingClientRect()
				if(location.top >= 60) {
					this.triangle = false
					this.handleTop = location.top - 40
				} else if(location.top < 60 && location.bottom < 400) {
					this.triangle = true
					this.handleTop = location.top + location.height + 8
				} else {
					this.triangle = false
					this.handleTop = 300
				}
				activeIndex = index
				this.articleList[activeIndex].longClick = true
				this.handleDialog = true
				clearTimeout(timeOutEvent)
				timeOutEvent = null
			},600);//这里设置定时
		},
		//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
		gotouchend(id){
			if(timeOutEvent){
				//这里写要执行的内容,如onclick事件
				this.$router.push({path: `detail?id=${id}`})
			}
			clearTimeout(timeOutEvent)
			timeOutEvent = null
		},
		//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按 
		gotouchmove(){
			clearTimeout(timeOutEvent);//清除定时器
			timeOutEvent = null
		},
		hiddenDialog() {
			this.articleList[activeIndex].longClick = false
			this.handleDialog = false
		},
		// 复制
		copyCotent() {
			clearTimeout(timeOutEvent)
			this.hiddenDialog()
			//执行长按要执行的内容，
			this.$refs.copybox.value = (this.articleList[activeIndex].article)
			this.$refs.copybox.select()
			document.execCommand("Copy")
			this.$toast("已复制到剪贴板")
			
			// var clipboard = new Clipboard('#copybox');'\r'
		},
		commentCotent(id) {
			this.hiddenDialog()
			this.$router.push({path: `detail?id=${id || this.articleList[activeIndex].id}`})
		},
		// 删除
		delateArticle() {
			this.hiddenDialog()
			this.$dialog.confirm({
					title: '提示',
					message: '确认删除此文章？'
				}).then(() => {
					deteleArticle(this.userMessage.postbox, this.id).then(res=>{
						if(res.status === 200) {
							this.$toast(res.message)
							this.articleList.splice(activeIndex, 1)
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
		this._readArticleList(this.page, this.count)	// 第一次加载20条
		this.$nextTick(()=> {
			document.documentElement.scrollTop = this.homeTop
		})
	},
	activated() {
		this.$nextTick(()=> {
			document.documentElement.scrollTop = this.homeTop
		})
	},
	beforeRouteLeave (to, from, next) {
	    this.homeTop = document.documentElement.scrollTop
	    next()
	}
}
</script>

<style lang="less" scoped>
	.home {
		min-height: 400px;
		padding-bottom: 60px;
		.box {
			padding: 10px 10px 0;
			margin-bottom: 10px;
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
			.content {
				margin-bottom: 10px;
				position: relative;
				&.longClick {
					background-color: #f5f5f5;
				}
				.author {
					text-align: right;
					padding-right: 30px;
				}
				
			}
			.like-box {
				height: 40px;
				border-top: 1px solid #f5f5f5;
				display: flex;
				justify-content: space-between;
				align-items: center;
				div	{
					font-size: 0;
					flex: auto;
					text-align: center;
					&.like {
						width: 33%;
					}
					&.comment {
						width: 34%;
					}
					img {
						width: 20px;
						height: 20px;
						vertical-align: middle;
					}
					span {
						font-size: 16px;
						vertical-align: bottom;
					}
				}
			}
		}
		.skeleton {
			margin-top: 20px;
		}
		#copybox {
			position: fixed;
			top: 0;
			left: -300px;
			z-index: -99;
			opacity: 0;
		}
		.handleDialog {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 998;
			background-color: transparent;
			.handle-box {
				position: absolute;
				width: 100%;
				z-index: 999;
				display: flex;
				justify-content: center;
				&:after {
					content: " ";
					width: 0;
					height: 0;
					border-style: solid;
					border-color: #2a2a2a transparent transparent transparent;
					border-width: 8px;
					position: absolute;
					left: 50%;
					bottom: -16px;
				}
				&.bottom {
					&:after {
						border-color: transparent transparent #2a2a2a transparent;
						top: -16px;
					}
				}
				.handle {
					box-sizing: border-box;
					width: 64px;
					height: 32px;
					line-height: 32px;
					text-align: center;
					background-color: #2a2a2a;
					color: #fafafa;
					font-size: 12px;
					position: relative;
					&:not(:last-child):after {
						content: " ";
						width: 0;
						height: 100%;
						border-left: 1px solid #fff;
						position: absolute;
						top: 0;
						right: 0;
					}
					&.left {
						border-top-left-radius: 8px;
						border-bottom-left-radius: 8px;
					}
					&.right {
						border-top-right-radius: 8px;
						border-bottom-right-radius: 8px;
					}
				}
			}
		}
	}
</style>
