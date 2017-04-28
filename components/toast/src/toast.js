import VpToast from './toast.vue';

var Toast = {};
Toast.install = function (Vue, options) {
    let opt = {
        defaultType:'bottom',
        duration:2500
    }
    let timer = null;
    for (let property in options) {
        opt[property] = options[property];
    }
    Vue.prototype.$toast = function () {};

    ['bottom', 'center', 'top'].forEach(type => {
        Vue.prototype.$toast[type] = (tips) => {
            return Vue.prototype.$toast(tips, type);
        }
    })

    Vue.prototype.$toast.show = Vue.prototype.$toast = (tips, type) => {
        type = type ? type : opt.defaultType;
        if (document.getElementsByClassName('vp-toast').length) {
            return;
        }
        clearTimeout(timer);
        let toastTpl = Vue.extend(VpToast);
        let tpl = new toastTpl(({
            propsData: { tips, type }
        })).$mount().$el;
        document.body.appendChild(tpl);
        timer = setTimeout(() => {
         if (document.getElementsByClassName('vp-toast')[0]) {
            let vpToast = document.getElementsByClassName('vp-toast')[0]
            vpToast.classList.remove('fadeIn');
            vpToast.classList.add('fadeOut');
            setTimeout(() => document.body.removeChild(vpToast),500);
         }
        },opt.duration);
    }

    Vue.prototype.$toast.close = () => {
        document.getElementsByClassName('vp-toast')[0] && document.body.removeChild(document.getElementsByClassName('vp-toast')[0]);
    }
}

export default Toast;
