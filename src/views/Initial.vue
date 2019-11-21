<template>
	<div class="thought">
		<div class="default" v-if="!msg">
			<div class="title-box">
				<div>书山有路</div>
				<div>勤为径</div>
				<div>学海无涯</div>
				<div>苦作舟</div>
			</div>
			<div class="icon">mybook</div>
		</div>
		<div class="content" v-else>
			<img src="@/assets/show.jpg" />
			<div class="title-one">
				<p>人这一生，要见众生，见天地，见自己</p>
				<p class="provenance">——王家卫《一代宗师》</p>
			</div>
			<div class="title-two">
				<p>见了众生，明白了众生相，所以宽容；见了天地，体会了伟大与渺小，所以谦卑；见了自己，感受了本我和真我，所以豁达。</p>
				<p>诚然，生而为人，我们都被困在格子的深井中，所见所闻不过都是世界的冰山一角。</p>
			</div>
			<div class="title-three">
				<p>我这个人啊，自己没啥文笔的造诣，却偏偏喜欢这种文绉绉的东西</p>
				<p class="provenance">——Love</p>
			</div>

			<router-link class="btn" to="/home" replace>进入首页</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'about',
	data() {
		return {
			msg: false
		}
	},
	methods: {
		
	},
	created() {
		setTimeout(()=>{
			this.msg = true
		},2000)
	}
}
</script>

<style lang="less" scoped>
.thought {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	text-align: center;
	.default {
		padding-top: 160px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.title-box {
			font-size: 36px;
			background-image: linear-gradient(red,orange,yellow,green,blue,indigo,violet, rgba(255,0,0,1));
			-webkit-background-clip: text;
		    -webkit-text-fill-color: transparent;
		    div	{
		    	letter-spacing: 2px;
		    }
		}
		.icon {
			margin-top: 50%;
			font-size: 36px;
		}
	}
	.content {
		width: 100%;
		height: 100%;
		position: relative;
		img {
			width: 100%;
			height: 100%;
			opacity: .2;
		}
		div {
			position: absolute;
			left: 0;
			right: 0;
			padding: 0 30px;
			text-align: left;
			p {
				font-size: 15px;
				line-height: 30px;
				&.provenance {
					font-size: 14px;
					padding-right: 30px;
					text-align: right;
				}
			}
			&.title-one {
				top: 20%;
			}
			&.title-two {
				top: 230px;
			}
			&.title-three {
				top: 450px;
			}
		}
		& > div:nth-child(n + 3) > p {
			text-indent: 2em;
		}
		& > div:nth-child(2) > p {
			font-weight: 600;
		}
		.btn {
			position: absolute;
			top: 85%;
			left: 50%;
			width: 88px;
			height: 36px;
			line-height: 36px;
			background-color: #36a36a;
			border-radius: 6px;
			text-align: center;
			color: #fff;
			font-size: 14px;
			transform: translateX(-50%);

		}
		
	}
	
}
</style>
