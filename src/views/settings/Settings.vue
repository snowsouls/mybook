<template>
    <div>
        <div class="heart-content">
            <div class="anim-icon anim-icon-md heart"  >
                <input type="checkbox" id="heart1" />
                <label for="heart1"></label>
            </div>
        </div>
        <van-cell-group>
            <van-cell title="举报/反馈通知" label="是否允许在举报/反馈后通知您（默认允许）">
                <van-switch slot="right-icon" v-model="checkedReport"  active-color="#07c160" inactive-color="#b4b4b4" size="24px" @change="changeReport"/>
            </van-cell>
        </van-cell-group>
        <van-cell-group>
            <van-cell title="隐私" label="是否允许他人查看你的个人信息（默认允许）">
                <van-switch slot="right-icon" v-model="checkedSecret"  active-color="#07c160" inactive-color="#b4b4b4" size="24px" @change="changeSecret"/>
            </van-cell>
        </van-cell-group>
        <div class="logout">
            <van-button @click="logout" color="linear-gradient(to right, #4bb0ff, #6149f6)" round size="large">退出登录</van-button>
        </div>
    </div>

</template>

<script>
import { updateSecret } from '@/api/api'
import { debounce } from '@/util/util'
export default {
    name: "settings",
    data() {
        return {
            checkedReport: false,
            checkedSecret: false
        }
    },
    methods: {
        changeReport: debounce(function(value) {
            // let id = value ? 1 : 0
            // updateSecret(this.$user.id, id).then(res=> {
            //     if(res.status === 200) {
            //         this.$toast(res.msg)
            //     }
            // })
            console.log(value)
        }),
        changeSecret: debounce(function(value) {
            let id = value ? 1 : 0
            updateSecret(this.$user.id, id).then(res=> {
                if(res.status === 200) {
                    this.$toast(res.msg)
                }
            })
        }),
        logout() {
            this.$store.commit('user/userLogout')
            this.$router.push({path: '/my'})
        }
    }
}
</script>

<style >
    .logout {
        margin-top: 20px;
        padding: 0 30px;
    }
    .logout >>> .van-button--large {
        height: 2.6rem;
        line-height: 2.6rem;
    }








    * {
/*        -webkit-touch-callout:none; !*系统默认菜单被禁用*!*/
        -webkit-user-select:none; /*禁用文本复制*/
  /*      -webkit-tap-highlight-color:transparent; !*取消点击链接或者JavaScript可点击元素赋给的高亮背景色*!*/
    }

    .heart-content{
        display: inline-block;
        width: 90px;
        margin: 0px 10px;
        font-size: 20px;
        color: rgba(0,0,0,0.7);
        margin-bottom: 20px;
    }
    .heart label {
        box-shadow: 0px 0px 0px 0px rgba(226, 32, 44, 0.5);
    }
    .heart label:after {
        content: "\f004";
    }
    .heart input:checked + label {
        background-color: #e2202c;
        border-color: #e2202c;
        box-shadow: 0px 0px 0px 0.5em rgba(226, 32, 44, 0);
    }
    .heart input:checked + label:after {
        color: #e2202c;
    }

    .anim-icon {
        width: 1.9em;
        height: 1.9em;
        margin-right: 0px;
        font-size: 13px;
        display: inline-block;
        position: relative;
        vertical-align: middle;
    }
    .anim-icon input {
        display: none;
    }
    .anim-icon label {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 0.1em solid rgba(0,0,0,0.7);
        border-radius: 100%;
        display: block;
        font: normal normal normal 13px/1 FontAwesome;
        color: #ccc;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
    }
    .anim-icon label:after {
        left: 0;
        top: 50%;
        margin-top: -0.4em;
        display: block;
        position: relative;
        text-align: center;
        color: rgba(0,0,0,0.7);
    }
    .anim-icon input:checked + label {
        -webkit-animation: check-in 0.3s forwards;
        animation: check-in 0.3s forwards;
        -webkit-transition: background-color 0.1s 0.2s, box-shadow 1s;
        transition: background-color 0.1s 0.2s, box-shadow 1s;
        border-width: 0.1em;
        border-style: solid;
    }
    .anim-icon input:checked + label:after {
        -webkit-animation: icon .3s forwards;
        animation: icon .3s forwards;
    }
    .anim-icon-md {
        font-size: 12px;
    }
    @-webkit-keyframes icon {
        0% {
            margin-top: -0.5em;
            font-size: 1.5em;
        }
        100% {
            font-size: 1em;
            opacity: 1;
            color: white;
        }
    }
    @keyframes icon {
        0% {
            margin-top: -0.5em;
            font-size: 1.5em;
        }
        100% {
            font-size: 1em;
            opacity: 1;
            color: white;
        }
    }
    @-webkit-keyframes check-in {
        0% {
            left: 20%;
            top: 20%;
            width: 60%;
            height: 60%;
        }
        80% {
            left: -5%;
            top: -5%;
            width: 110%;
            height: 110%;
        }
        100% {
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
    @keyframes check-in {
        0% {
            left: 20%;
            top: 20%;
            width: 60%;
            height: 60%;
        }
        80% {
            left: -5%;
            top: -5%;
            width: 110%;
            height: 110%;
        }
        100% {
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
    @-webkit-keyframes check {
        0% {
            left: 5%;
            top: 5%;
            width: 90%;
            height: 90%;
        }
        10% {
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
        80% {
            left: -5%;
            top: -5%;
            width: 110%;
            height: 110%;
        }
        90% {
            left: 5%;
            top: 5%;
            width: 90%;
            height: 90%;
        }
        100% {
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
    @keyframes check {
        0% {
            left: 5%;
            top: 5%;
            width: 90%;
            height: 90%;
        }
        10% {
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
        80% {
            left: -5%;
            top: -5%;
            width: 110%;
            height: 110%;
        }
        90% {
            left: 5%;
            top: 5%;
            width: 90%;
            height: 90%;
        }
        100% {
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
</style>