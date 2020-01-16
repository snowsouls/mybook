<template>
    <div class="add">
        <div class="title">择一语，动人心</div>
        <div class="article">
            <van-cell-group>
                <van-field v-model.trim="message" autosize rows="5" type="textarea" placeholder="那些感动我们的美好……" />
                <van-field v-model.trim="author" placeholder="作者" />
                <van-field v-model.trim="provenance" placeholder="出处" />
            </van-cell-group>
        </div>

        <van-uploader
          v-model="fileList"
          multiple
          :max-count="3"
        />
        <!-- <van-cell-group>
            <van-field v-model="comment" autosize rows="3" type="textarea" placeholder="客官，能描述下嘛……" />
        </van-cell-group> -->
        <!-- <van-button type="primary" :loading="loading" :disabled="disabled" size="large" round loading-text="发表中..." @click="publish"> 发表 </van-button> -->
        <van-button type="primary" size="large" round @click="publish"> 发表 </van-button>
    </div>
</template>

<script>
import { publishArticle, publishImage } from '@/api/api'
export default {
	name: 'add',
    computed: {
        disabled() {
            return (this.message === '' && this.fileList.length === 0)
        }
    },
    data() {
        return {
            message: '',
            author: '',
            provenance: '',
            comment: '',
            loading: false,
            fileList: []
        }
    },
    methods: {
        publish() {
            if(this.$user.postbox) {
                let timer = setTimeout(()=>{
                    this.loading = true
                },1000)
                if(this.provenance) {
                    if(!new RegExp("^《.*$").test(this.provenance)) {
                        this.provenance = '《' + this.provenance
                    }
                    if(!new RegExp("^.*》$").test(this.provenance)) {
                        this.provenance = this.provenance + '》'
                    }
                }
                let fileList = []
                if(this.fileList.length !== 0) {
                    this.fileList.forEach(item=> {
                        fileList.push(item.content)
                    })
                }
                publishArticle(this.$user.id, this.message,this.author,this.provenance, fileList).then(res=>{
                    if(res.status === 200) {
                        this.$store.commit('article/addArticle', {
                            id: res.id,
                            article: this.message.replace(/\n/g,'<br />'),
                            author: this.author,
                            commnum: 0,
                            isCollect: false,
                            isLike: false,
                            imagesArr: fileList,
                            likes: 0,
                            provenance: this.provenance,
                            time: "刚刚",
                            user: this.$user
                        })
                        this.message = ''
                        this.author = ''
                        this.provenance = ''
                        this.fileList = []
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
        touch-action: none;
        padding: 10px 10px 0;
        .title {
            height: 30px;
            line-height: 30px;
        }
        .article {
            margin-bottom: 20px;
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