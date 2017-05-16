<template>
    <div class="input-control">
        <i v-if="icon" class="iconfont" :class="icon"></i>
        <input
                class="input-white"
                :class="className"
                :type="type"
                :placeholder="placeholder"
                :value="value"
                @input="updateValue($event.target.value)">
        <div class="login-btn" v-if="name === 'input-msg'">
            <button type="button" class="vp-btn vp-btn-purple">
                获取验证码
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name:'input-white',

        props:{
            name: {
                type:String,
                default: 'input-default'
            },
            type: {
                type:String,
                default: 'text'
            },
            placeholder:{
                type:String,
                default:''
            },
            className:{
                type:String,
                default:''
            },
            value:{
                required:true,
                default:''
            },
            regExp:{
                required:false
            },
            icon:{
                type:String
            }
        },

        methods: {
            updateValue (value) {
                console.log(value);
                console.log(this);
            }
        },

        mounted() {
            console.log(this.icon);
        }
    }
</script>

<style lang="less" scoped rel="stylesheet/less" type="text/css">
    @import '../../../assets/css/flex.less';
    .input-control{
        .flex-left;
        .box-sizing;
        height: 50px;
        margin-bottom:20px;
        i {
            background-color:#fff;
            width: 15%;
            font-size:30px;
            color: #9596AB;
            height:100%;
            padding:10px;
            .box-sizing;
        }
        .input-white{
            .box-sizing;
            padding-left: 10px;
            height:100%;
            width: 85%;
            background-color: #fff;
            border-radius: 3px;
            font-size:20px;
            /*border-bottom:10px solid transparent;*/
        }
        .input-little{
            width: 35%;
        }
        .login-btn{
            width:50%;
            overflow: hidden;
            .vp-btn{
                font-size:16px;
                float: right;
                margin:0;
                height:52px;
            }
        }

    }
</style>