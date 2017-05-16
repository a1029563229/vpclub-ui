<template>
    <div class="vp-mb-alert animated fadeIn">
        <div class="vp-alert vp-alert-center animated zoomIn">
            <div class="vp-alert-title">
                <span>{{title}}</span>
                <span @click="hideButton(false)">X</span>
            </div>
            <div class="vp-alert-content">
                {{content}}
            </div>
            <div class="vp-alert-btn">
                <div class="vp-alert-btn-list">
                    <button type="button" class="vp-btn vp-btn-primary" @click="hideButton(true)">确定</button>
                    <button v-if="type === 'confirm'" type="button" class="vp-btn vp-btn-default" @click="hideButton(false)">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'animate.css';
    export default {
        name:'VpAlert',

        props:['title', 'content', 'type'],

        methods:{
            hideButton(type) {
                this.$alert.close(type);
            }
        }
    }
</script>

<style lang="less" scoped rel="stylesheet/less" type="text/css">
    @import '../../../assets/css/flex';
    .animated{
        animation-duration:.3s;
    }
    .vp-alert{
        font-family: '微软雅黑';
        background-color:#fff;
        text-align: left;
        width: 75%;
        display: inline-block;
        vertical-align: middle;
        color: #333;
        box-shadow:1px 1px 50px rgba(0,0,0,.3);
        &-title{
            background: #F8F8F8;
            padding: 10px 20px;
            overflow: hidden;
            :first-child{
                float: left;
            }
            :last-child{
                float: right;
            }
        }
        &-content{
            padding: 20px;
        }
        &-btn{
            margin: 30px 20px 10px 20px;
            overflow: hidden;
            &-list{
                float: right;
            }
        }
    }
    
</style>