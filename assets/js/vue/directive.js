import Vue from 'vue';

Vue.directive('form', {
    inserted: function (el) {
        console.log(el)
    }
});