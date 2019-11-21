<template>
	<div class="main">
		<router-link class="basic-style enshrine top" :to="login ? 'information' : 'login'">
    		<img src="@/assets/infor.png" alt="信息" />
    		<span class="title">账号与安全</span>
    	</router-link>
    	<router-link class="basic-style enshrine" :to="login ? 'information' : 'login'">
    		<img src="@/assets/enshrine.png" alt="消息" />
    		<span class="title">新消息通知</span>
    	</router-link>
    	<router-link class="basic-style enshrine" :to="login ? 'information' : 'login'">
    		<img src="@/assets/enshrine.png" alt="隐私" />
    		<span class="title">隐私</span>
    	</router-link>
    	<router-link class="basic-style enshrine" :to="login ? 'information' : 'login'">
    		<img src="@/assets/enshrine.png" alt="通知" />
    		<span class="title">新消息通知</span>
    	</router-link>
	</div>
</template>

<script>
export default {
	name: 'settings',
	data() {
		return {

		}
	},
	methods: {

	},
}
</script>

<style lang="less" scoped>
.main {
	font-size: 30px;
}
</style>

