<template>
	<div id="app">
		<div class="background">
			<img src="@/assets/show.jpg" class="bj">
			<div class="picture-box">
				<img class="picture" :src="$user.picture" alt="图像">
			</div>
			<div class="name">{{$user.name}}</div>
		</div>
		<van-list v-model="loading"	:finished="finished" :immediate-check="false" :finished-text="finishedText"	@load="onLoad">
	        <transition-group appear tag="ul">
	            <li class="article-box" v-for="(item, index) in lists" :key="item.id" @click="goDetail(item.id)">
		            <div class="article">{{index + 1}}、{{item.article}}</div>
	            	<div class="handle-box">
	            		<div class="handle">
	            			<span class="time">{{item.time}}</span>
	            			<img class="img" src="@/assets/like.png" alt="赞">
	            			<span>{{item.likes || 0}}</span>
	            			<img class="img" src="@/assets/comment.png" alt="评论">
	            			<span>{{item.commnum}}</span>
	            		</div>
	            		<img class="delate" src="@/assets/delete.png" alt="刪除" @click.stop="del(item.id, index)">
	            	</div>
	            </li>
	        </transition-group>
	    </van-list>
    </div>
</template>

<script>
import { getPublish } from '@/api/api'
export default {
	name: 'settings',
	data() {
		return {
			lists: [],
            page: 1,
            loading: false,					// 数据加载完成
			finished: false,				// 数据全部加载完毕
			finishedText: '没有更多了',		// 数据全部加载完毕后的提示文字
		}
	},
	methods: {
		onLoad() {
			this.initPublish(this.page)
		},
		goDetail(id) {
			this.$router.push({path: `detail?id=${id}`})
			// this.$router.push({
			// 	name:'detail',
			// 	query:{
			// 		index,
			// 		id
			// 	}
			// })
		},
        del(id, index){
            this.$dialog.confirm({
					title: '删除文章',
					message: '删除文章后，首页列表中也将同步删除。您确定不让小伙伴看见吗？'
				}).then(() => {
					deteleArticle(this.$user.postbox, id).then(res=>{
						if(res.status === 200) {
							this.$toast(res.message)
							this.lists.splice(index, 1)
						} else {
							this.$toast(res.error)
						}
						
					})
				}).catch(() => {
					// on cancel
			});
        },
        initPublish(page, count=10) {
        	getPublish(this.$user.id, page, count).then(res=> {
        		if(res.status === 200) {
        			this.lists = this.lists.concat(res.data.data)
        			this.page ++
        			if(!res.data.has_more) {
						this.finished = true
					}
					if(res.data.data.length === 0) {
						this.finishedText = ""
					}
					this.loading = false
        		}
        	})
        }
	},
	created() {
		this.initPublish(this.page, 20)
	}
}
</script>

<style lang="less" scoped>
.background {
	width: 100%;
	height: 240px;
	position: relative;
	margin-bottom: 32px;
	.bj {
		width: 100%;
		height: 100%;
	}
	.picture-box {
		width: 64px;
		height: 64px;
		position: absolute;
		right: 32px;
		bottom: -32px;
		.picture {
			width: 100%;
			height: 100%;
			border-radius: 8px;
		}
	}
	.name {
		color: #fff;
		font-size: 16px;
		line-height: 32px;
		position: absolute;
		bottom: 0;
		right: 106px;
	}
}

.article-box {
	padding: 8px;
	position: relative;
	&:after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 0;
		border-bottom: 1px solid #ebebeb;
		transform: scaleY(0.5);
		box-sizing: border-box;
	}
	.article {
		color: #333;
		font-size: 16px;
		word-break: break-all;
	}
	.handle-box {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.handle {
			color: #999;
			font-size: 14px;
			.img {
				width: 16px;
				height: 16px;
				margin-left: 16px;
				margin-right: 4px;
				vertical-align: middle;
			}
		}
		.delate {
			width: 16px;
			height: 16px;
		}
	}
}

.v-enter {
	transform: translateY(100%);
}
.v-leave-to{
	z-index: -99;
    opacity: 0;
    // transform: translateY(100%);
    // height: 0;
}
// .v-enter,
// .v-leave-to{
//     opacity: 0;
//     transform: translateY(-100%);
// }
// .v-enter-active, .v-leave-active{
//     opacity: 0;
//     transition: all .6s ease;
// }
.v-enter-active {
	opacity: 0;
    transition: transform .5s ease;
}

.v-leave-active {
	opacity: 0;
    transition: transform 1s ease;
}

.v-move{
   transition: all 1s ease;
}
.v-leave-active{
    position: absolute;
}
</style>