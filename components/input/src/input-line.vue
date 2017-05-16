<template>
    <div class="input-container">
        <input
                id="input"
                class="input-white"
                :class="className"
                :type="type"
                :placeholder="placeholder"
                :value="value"
                @input="updateValue($event.target.value)">
        <label for="input">{{placeholder}}</label>
        <div class="bottom-line"></div>
    </div>
</template>

<script>
    export default {
        name:'input-line',

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
                let formattedValue = value;
                if (formattedValue !== value) {
                    this.$refs.input.value = formattedValue
                }
                this.$emit('input', formattedValue);
            }
        },

        mounted() {
            // console.log(this.icon);
        }
    }
</script>

<style lang="less" scoped rel="stylesheet/less" type="text/css">
    @import '../../../assets/css/flex.less';
    @width: 100%;
    @label-font-color: #3f4f5b;
    @label-focus-font-color: rgb(82, 97, 108);
    @border-bottom-color: #d5d5d5;
    @focus-border-color: rgb(101, 141, 181);
    @transform-top: 10px;
    @transform-time: 0.3s;
    @scale: 0.9;

    .input-container {
    width: @width;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -ms-flex-flow: column-reverse;
    flex-flow: column-reverse;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    margin: auto;
    }

    .input-container input {
    -webkit-box-ordinal-group: 11;
    order: 10;
    -ms-flex-order: 10;
    outline: none;
    border: none;
    width: 100%;
    padding: 10px 0;
    font-size: 20px;
    border-bottom: 1px solid @border-bottom-color;
    text-indent: 10px;
    }

    .input-container input::-moz-placeholder {
    opacity: 0;
    }

    .input-container input::-webkit-input-placeholder {
    opacity: 0;
    }

    .input-container input:-ms-input-placeholder {
    opacity: 0;
    }

    .input-container input, .input-container label {
    transition: all @transform-time;
    }

    .input-container label {
    -webkit-box-ordinal-group: 101;
    -ms-flex-order: 100;
    order: 100;
    color: @label-font-color;
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: translate(10px, 40px);
    transform: translate(0px, 40px);
    }

    .input-container .bottom-line {
    order: 2;
    width: 0;
    height: 2px;
    background: @focus-border-color;
    transition: all @transform-time;
    }

    .input-container input:focus {
    border-bottom-color: #fff;
    }

    .input-container input:focus ~ div, .input-container input:not(:placeholder-shown) ~ div {
    width: 100%
    }

    .input-container input:focus + label, .input-container input:not(:placeholder-shown) + label {
    color: @label-focus-font-color;
    -webkit-transform: translate(10px) scale(@scale);
    transform: translate(10px) scale(@scale)
    }
    
</style>