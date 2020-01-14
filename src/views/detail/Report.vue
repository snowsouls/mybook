<template>
	<div class="report">
		<div class="title"><span class="request">举报内容问题</span></div>
		<div class="check-box">
			<van-checkbox-group v-model="result">
				<van-checkbox v-for="item in choses" :name="item" icon-size="12px">{{item}}</van-checkbox>
			</van-checkbox-group>
		</div>
		<div class="title">更多问题及建议</div>
		<div class="message-box">
			<van-field v-model.trim="message" :readonly="readonly" :autosize="{ maxHeight: 160 }" rows="3" type="textarea" placeholder="请描述问题或建议，二次抄袭请附时间和用户名" />
		</div>
		<div class="title">联系方式</div>
		<div class="message-box">
			<van-field v-model.trim="phone" border placeholder="请留下您的邮箱/微信号" />
		</div>
		<div class="submit">
            <van-button @click="submit" color="linear-gradient(to right, #4bb0ff, #6149f6)" :disabled="result.length === 0" round size="large">提交</van-button>
        </div>
	</div>
</template>

<script>
import { report } from '@/api/api'
export default {
	name: "report",
	data() {
		return {
			articleId: 0,
			choses: ['违法', '色情', '广告', '谣言', '二次抄袭', '恐怖恶心', '粗俗不堪', '其他'],
			result: [],
			message: '',
			phone: '',
			readonly: true
		}
	},
	methods: {
		submit() {
			report(this.$user.id, this.articleId, this.result.join(','), this.message, this.phone).then(res=> {
				if(res.status === 200) {
					this.$toast(res.message)
					Object.assign(this.$data, this.$options.data())
				}
			})
		}
	},
	created() {
		this.articleId = this.$route.query.id
		setTimeout(()=> {
			this.readonly = false
		}, 300)
	}
}
</script>

<style lang="less" scoped>
.report {
	padding: 0 16px;
	.title {
		margin-top: 20px;
		.request {
			position: relative;
			&:after {
			    content: '*';
				position: absolute;
				top: 0;
				right: -8px;
				color: red;
				font-size: 14px;
			}
		}
	}
	.check-box {
		margin-top: 10px;
		 .van-checkbox-group {
			display: flex;
			flex-wrap: wrap;
			.van-checkbox {
				width: 50%;
				margin-top: 10px;
				/deep/ .van-checkbox__label {
					color: #808080;
					font-size: 14px;
				}
			}
		}
	}
	.message-box {
		margin-top: 10px;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 4px;
		.van-cell {
			background-color: transparent;
		}
	}
	.submit {
        margin-top: 30px;
    }
    .submit /deep/ .van-button--large {
        height: 2.6rem;
        line-height: 2.6rem;
    }
}
</style>