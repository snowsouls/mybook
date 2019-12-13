<template>
	<div id="app">
		<van-list v-model="loading"	:finished="finished" :immediate-check="false" :finished-text="finishedText"	@load="onLoad">
	        <transition-group appear tag="ul">
	            <li class="li-box" v-for="(item, index) in lists" :key="item && item.id" @click="goDetail(item.id)">
	            	<van-swipe-cell>
	            		<div class="article-box">
				            {{item.name}}
	            		</div>
		            	<template slot="right">
							<van-button square type="danger" text="删除" @click="deleteCollect(item.id, index)" />
							<!-- <van-button square type="primary" text="收藏"/> -->
						</template>
		            </van-swipe-cell>
	            </li>
	        </transition-group>
	    </van-list>
	    <div v-if="lists.length === 0">
	    	你暂时没有任何收藏哦
	    </div>
    </div>
</template>

<script>
import { collect, getCollect, getAttention } from '@/api/api'
export default {
	name: 'settings',
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
				if(new Date().getFullYear() == data[0]) {
					return `${data[1]}-${data[2]}`		// 不带年份
				} else {
					return time.split(" ")[0]		// 带年份
				}
			}
		}
	},
	data() {
		return {
			lists: [],
            page: 1,
            loading: false,					// 数据加载完成
			finished: false,				// 数据全部加载完毕
			finishedText: '已加载所有',		// 数据全部加载完毕后的提示文字
		}
	},
	methods: {
		onLoad() {
			this.initCollect(this.page)
		},
		goDetail(id) {
			this.$router.push({path: `detail?id=${id}`})
		},
        deleteCollect(id, index){
            collect(this.$user.id, id).then(res=>{
				if(res.status === 200) {
					this.lists.splice(index, 1)
					if(this.lists.length === 0) {
						this.finishedText = ''
					}
					if(!this.finished && this.lists.length < 10) {
						this.initCollect(this.page)
					}
				} else {
					this.$toast(res.error)
				}
			})
        },
        initCollect(page, count=10) {
        	getAttention(this.$user.id, page, count).then(res=> {
        		if(res.status === 200) {
        			this.lists = this.lists.concat(res.data)
        			this.page ++
        			if(!res.has_more) {
						this.finished = true
					}
					if(res.data.length === 0) {
						this.finishedText = ""
					}
					this.loading = false
        		}
        	})
        }
	},
	created() {
		this.initCollect(this.page, 10)
	}
}
</script>

<style lang="less" scoped>
.li-box {
	position: relative;
	& /deep/ .van-button {
		height: 100%;
	}
	&:after {
		content: "";
		position: absolute;
		left: 8px;
		bottom: 0;
		right: 8px;
		height: 0;
		border-bottom: 1px solid #ebebeb;
		transform: scaleY(0.5);
		box-sizing: border-box;
	}
	.article-box {
		padding: 8px;
		color: #333;
		font-size: 16px;
		word-break: break-all;
		.describe {
			height: 24px;
			// display: flex;
			// align-items: center;
			// justify-content: space-between;
			color: #999;
			font-size: 14px;
			.text {
				color: #ccc;
				font-size: 12px;
			}
		}
		.article {
			font-size: 16px;
			color: #333;
			&.one {
				.text-ellipsis();
			}
			&.two {
				.text-ellipsis-two();
			}
		}
		.author {
			color: #333;
			font-size: 14px;
			text-align: right;
			padding-right: 16px;
			.line {
				color: #999;
			}
		}
	}
}

.v-enter {
	transform: translateY(100%);
}
.v-leave-to{
	z-index: -99;
    opacity: 0;
}
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