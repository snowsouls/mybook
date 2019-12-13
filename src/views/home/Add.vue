<template>
    <div class="add">
        <div class="title">择一语，动人心</div>
        <div class="article">
            <van-cell-group>
                <van-field v-model="message" autosize rows="5" type="textarea" placeholder="那些感动我们的美好……" />
                <van-field v-model="author" placeholder="作者" />
                <van-field v-model="provenance" placeholder="出处" />
            </van-cell-group>
        </div>

        <!-- <van-cell-group>
            <van-field v-model="comment" autosize rows="3" type="textarea" placeholder="客官，能描述下嘛……" />
        </van-cell-group> -->
        <van-button type="primary" :loading="loading" :disabled="disabled" size="large" round loading-text="发表中..." @click="publish"> 发表 </van-button>
    </div>
</template>

<script>
import { publishArticle } from '@/api/api'
export default {
	name: 'add',
    data() {
        return {
            message: '',
            author: '',
            provenance: '',
            comment: '',
            disabled: false,
            loading: false
        }
    },
    methods: {
        publish() {
            if(this.$user.postbox) {
                if(this.message.trim() === '') return
                let timer = setTimeout(()=>{
                    this.loading = true
                },1000)
                publishArticle(this.$user.id, this.message,this.author,this.provenance).then(res=>{
                    if(res.status === 200) {
                        this.$store.commit('article/addArticle', {
                            id: res.id,
                            article: this.message,
                            author: this.author,
                            commnum: 0,
                            isCollect: false,
                            isLike: false,
                            likes: 0,
                            provenance: this.provenance,
                            time: "刚刚",
                            user: this.$user
                        })
                        this.message = ''
                        this.author = ''
                        this.provenance = ''
                        this.loading = false
                        clearTimeout(timer)
                        this.$toast({
                            message: '发表成功',
                            duration: 2000
                        })
                        setTimeout(()=>{
                            this.$router.push('home')
                        }, 1500)
                    }
                })    
            } else {
                this.$router.push({name: 'login'})
            }
        }
    }
};
</script>

<style lang="less" scoped>
    .add {
        padding: 10px 10px 0;
        .title {
            height: 30px;
            line-height: 30px;
        }
        /deep/ .van-cell {
            background-color: #fafafa;
        }
        /deep/ .van-button--large {
            height: 36px;
            line-height: 34px;
        }
    }
</style>