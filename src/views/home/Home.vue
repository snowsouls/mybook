 <template>
	<div class="home">
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<van-skeleton title avatar :row="3" :loading="initLoading">
				<van-list v-model="loading"	:finished="finished" :immediate-check="false" finished-text="没有更多了"	@load="onLoad">
					<div>
						<div class="box" v-for="(item,index) in articleList" :key="index">
							<div class="title">
								<div class="left">
									<img :src="$config.imagesUrl + item.user.picture" alt="图像" @click="goPeople(item.user_id, item.user.secret)"/>
									<div>
										<div class="name">{{ item.user.name }}</div>
										<div class="time">{{ item.time | transformDate }}</div>
									</div>
								</div>
							</div>
							<div class="content" :class="(articleIndex === index && handleDialog) && 'longClick'" @touchstart="gotouchstart($event, item, index)" @touchmove="gotouchmove" @touchend="gotouchend(item.id, index)">
							<!-- <div class="content" :class="(articleIndex === index && handleDialog) && 'longClick'" @click="clickOrLongclick($event, item, index)"> -->
								<div class="article" v-html="item.article"></div>
								<div class="author" v-if="item.author || item.provenance">
									<span>——</span>
									<span>{{item.author}}</span>
									<span>{{item.provenance}}</span>
								</div>
								
							</div>

							<div class="image-box" v-if="item.images">
								<div class="iamge" v-for="(imgItem, imgIndex) in item.imagesArr" :key="imgIndex">
									<div class="van-box" @click="lookImgDetail(item.imagesArr, imgIndex)">
										<van-image
											height="100%"
											fit="cover"
											:src="$config.imagesUrl + imgItem"
										/>
									</div>
								</div>
							</div>

							<div class="like-box">
								<div class="like" @click="goLikeArticle(item, index)">
									<img :src="item.isLike ? require('../../assets/like-active.png') : require('../../assets/like.png')">
									<span :class="item.isLike && 'red'">{{ item.likes || '点赞' }}</span>
								</div>
								<div class="comment" @click="commentCotent(item.id, index)">
									<img src="@/assets/comment.png">
									<span>{{ item.commnum || '评论' }}</span>
								</div>
								<div class="like" @click="goCollect(item.id, index)">
									<img :src="item.isCollect ? require('../../assets/collect-active.png') : require('../../assets/collect.png')">
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
		<div class="handleDialog" v-show="handleDialog" @touchstart="handleDialog = false">
			<div class="handle-box" :class="{bottom: triangle}" :style="{top: handleTop + 'px'}">
				<div class="handle left" @touchstart="commentCotent()">评论</div>
				<div class="handle" @touchstart="setReport()">举报</div>
				<div class="handle" v-if="$user.postbox === user.postbox || $user.authority === '1' || $user.authority === '2'" @touchstart="delateArticle">删除</div>
				<div class="handle right" data-clipboard-action="copy" @touchstart="copyCotent" ref="copybox">复制</div>
			</div>
		</div>
		<div v-if="isleave">
			<GoTop />
		</div>
		<!-- <input type="text" id="copybox" readonly ref="copybox"> -->
	</div>
</template>

<script>
import GoTop from '@/components/goTop'
import {ImagePreview} from "vant"
import { mapState } from 'vuex'
import { readArticleList, deteleArticle, likeArticle, collect } from '@/api/api'
let timeOutEvent = null
export default {
	name: 'home',
	components: { GoTop },
	computed: {
		...mapState({
			articleList: state=> state.article.articleList
		})
	},
	data() {
		return {
			show: false,
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
			isleave: true,			// bug：快速离开再进入home，goTop会立即出现再消除
			articleIndex: -1,
		}
	},
	filters: {
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
	methods: {
		_readArticleList(page, count=10, refresh) {		// 以后每次加载10条
			this.$store.dispatch('article/setArticle', {
				page,
				count,
				refresh
			}).then(flag=>{
				this.finished = !flag
				this.loading = false
				this.initLoading = false
				if(refresh) {
					if(refresh === true) this.$toast('刷新成功')
					this.isLoading = false
					this.page = 3
				} else {
					this.page += 1
				}
			})
		},
		onLoad() {
			this._readArticleList(this.page)
		},
		onRefresh() {
			this._readArticleList(1, 20, true)
		},
		// 举报
		setReport() {
			let id = this.articleList[this.articleIndex].id
			this.handleDialog = false
			this.$router.push({
				name:'report',
				query:{
					id
				}
			})
		},
		// 查看图片详情
		lookImgDetail(imgItem, index) {
			let imgs = imgItem.map(x => (this.$config.imagesUrl + x))
			ImagePreview({
				images: imgs,
				maxZoom: 25,
				startPosition: index,
				onClose() {
					// do something
				}
			})
		},
		// pc端的效果
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
				this.articleIndex = index
				this.handleDialog = true
				clearTimeout(timeOutEvent)
				timeOutEvent = null
			},600);//这里设置定时
		},
		//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
		gotouchend(id, index){
			if(timeOutEvent){
				clearTimeout(timeOutEvent)
				timeOutEvent = null
				//这里写要执行的内容,如onclick事件
				// this.$router.push({path: `detail?id=${id}`})
				this.$router.push({
					name:'detail',
					query:{
						index,
						id
					}
				})
			}
		},
		//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按 
		gotouchmove(){
			clearTimeout(timeOutEvent);//清除定时器
			timeOutEvent = null
		},
		// 复制
		copyCotent() {
			clearTimeout(timeOutEvent)
			this.handleDialog = false
			//执行长按要执行的内容，(原生)
			// this.$refs.copybox.value = (this.articleList[this.articleIndex].article)
			// this.$refs.copybox.select()
			// document.execCommand("Copy")
			// this.$toast("已复制到剪贴板")
			
			// 使用clipboard.js
			let _this = this;
			let clipboard = new Clipboard(_this.$refs.copybox, {
				text: function() {
	                return _this.articleList[_this.articleIndex].article
	            }
			});
			clipboard.on('success', function () {
				_this.$toast("已复制到剪贴板")
			});
			clipboard.on('error', function () {
				_this.$toast("复制失败")
			});
		},
		// 去评论
		commentCotent(id, index) {
			this.handleDialog = false
			this.$router.push({
				name:'detail',
				query:{
					index: (index !== undefined ? index : this.articleIndex),
					id: (id !== undefined ? id : this.articleList[this.articleIndex].id)
				}
			})
		},
		// 点赞
		goLikeArticle(item, index) {
			if(this.$user.postbox) {
				likeArticle(item.id, String(this.$user.id), item.likes || 0).then(res=>{
					if(res.status === 200) {
						this.$toast(res.message)
						this.$store.commit('article/setLike', {
							index,
							likes: res.isLike ? (item.likes + 1) : (item.likes - 1),
							isLike: res.isLike
						})
					}
				})
			} else {
				this.$router.push('login')
			}
		},
		// 删除
		delateArticle() {
			this.handleDialog = false
			this.$dialog.confirm({
					title: '提示',
					message: '确认删除此文章？'
				}).then(() => {
					deteleArticle(this.$user.postbox, this.id).then(res=>{
						if(res.status === 200) {
							this.$toast(res.message)
							// this.articleList.splice(articleIndex, 1)
							this.$store.commit('article/delateArticle', this.articleIndex)
							if(this.articleList.length < 10) {
								this.onLoad()
							}
						} else {
							this.$toast(res.error)
						}
					})
				}).catch(() => {
					// on cancel
			});
		},
		// 收藏
		goCollect(id, index) {
			collect(this.$user.id, id).then(res=>{
				if(res.status === 200) {
					this.$toast(res.message)
					this.$store.commit('article/setCollect', {
						index,
						flag: res.isCollect
					})
				} else {
					this.$toast(res.error)
				}
			})
		},
		goPeople(id, secret) {
			if(this.$user.id === id) return
			if(secret || this.$user.authority !== '0') {
				this.$router.push({path: `people?id=${id}`})
			} else {
				this.$toast('朋友开启了隐私，你不能查看哦')
			}
		}
	},
	created() {
		this._readArticleList(this.page, 20, 'true')	// 第一次加载20条
		this.$nextTick(()=> {
			document.documentElement.scrollTop = this.homeTop
		})
	},
	activated() {
		this.isleave = true
		if(this.$route.params.refresh) {

		}
		this.$nextTick(()=> {
			document.documentElement.scrollTop = this.homeTop
		})
	},
	beforeRouteLeave (to, from, next) {
	    this.homeTop = document.documentElement.scrollTop
	    this.isleave = false
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
				curser: pointer;
				margin-bottom: 10px;
				position: relative;
				word-break: break-all;
				&.longClick {
					background-color: #f5f5f5;
				}
				.article {
					white-space: pre-line;
				}
				.author {
					text-align: right;
					padding-right: 30px;
					font-size: 14px;
				}
				
			}
			.image-box {
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
				&:after {
					content: " ";
					width: 33%;
				}
				.iamge {
					width: 33%;
					padding-bottom: 33%;
					text-align: center;
					height: 0;
					position: relative;
					.van-box {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						& /deep/ .van-image__img {
							transform: translateZ(0);
						}
					}
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
						width: 16px;
						height: 16px;
						vertical-align: middle;
					}
					span {
						font-size: 14px;
						color: #666;
						margin-left: 4px;
						vertical-align: middle;
						&.red {
							color: #ed4256;
						}
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
