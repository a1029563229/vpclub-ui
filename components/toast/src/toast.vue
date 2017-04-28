<template>
    <div :class="'vp-toast animated fadeIn vp-toast-' + type">{{tips}}</div>
</template>

<script>
    import 'animate.css';
    export default {
        name:'vp-toast',

        props:['tips', 'type']
    }
</script>

<style lang="less" scoped rel="stylesheet/less" type="text/css">
    .vp-toast{
        font-family: '微软雅黑';
        position: fixed;
        background-color:rgba(0,0,0,.5);
        transform: translate(-50%,-50%);
        color: #fff;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 998;
        &-bottom {
            left: 50%;
            bottom:10%;
        }
        &-center {
            left: 50%;
            bottom:50%;
        }
        &-top {
            left: 50%;
            top:0%;
        }
    }
    .animated{
      animation-duration:.5s ;
    }

</style>
