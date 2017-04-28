import VpLoading from './loading.vue';
import vp from '../../../assets/js/selector';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs';

var Loading = {};
Loading.install = function (Vue, options) {
    let opt = {
        duration:2500
    }

    Vue.prototype.$loading = function () {};

    let subject = new BehaviorSubject('start');
    let subscription;

    Vue.prototype.$loading = () => {
        if (document.getElementsByClassName('vp-mb').length) {
            return;
        }
        let loadingTpl = Vue.extend(VpLoading);
        let tpl = new loadingTpl().$mount().$el;
        document.body.appendChild(tpl);
    }

    Vue.prototype.$loading.close = () => {
       let vpMb = vp('.vp-mb');
       if (vpMb.getNode() === null) {
           return
       }
       let close$ = Observable
            .interval(150)
            .take(2)
            .startWith(false)
            .subscribe(boo => {
                if (boo) {
                    document.body.removeChild(vpMb.getNode());
                    close$.unsubscribe();
                } else {
                    vpMb.removeClass('fadeIn').addClass('fadeOut');
                }
            })
    }
}

export default Loading;