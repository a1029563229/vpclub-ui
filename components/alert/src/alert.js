import VpAlert from './alert.vue';
import vp from '../../../assets/js/selector';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs';

let alert = {};
alert.install = function (Vue, options) {
    let opt = {
        defaultType:'bottom',
        type:'alert'
    };
    for (let property in options) {
        opt[property] = options[property];
    }

    let subject = new BehaviorSubject(0);
 
    function vpAlert( content = '', title = '提示', type = opt.type) {
        if (document.getElementsByClassName('vp-mb').length) {
            return;
        }
        let toastTpl = Vue.extend(VpAlert);
        let tpl = new toastTpl(({
            propsData: { title, content, type }
        })).$mount().$el;
        document.body.appendChild(tpl);
        return new Promise(resolve => {
            subject
            .filter(val => val !== 0)
            .take(1)
            .subscribe(val => {
                subject.next(0);
                resolve(val);
            });
        })
    };
    
    Vue.prototype.$alert = (content = '', title = '提示', type = opt.type) => {
        return vpAlert(content, title, 'alert');
    }

    Vue.prototype.$alert.confirm =  (content = '', title = '提示', type = opt.type) => {
        return vpAlert(content, title, 'confirm');
    }

    Vue.prototype.$alert.close = (type = '') => {
        let vpMb = vp('.vp-mb');
        let vpAlert = vp('.vp-alert');
        let close$ = Observable
            .interval(150)
            .take(2)
            .startWith(false)
            .subscribe(boo => {
                if (boo) {
                    document.body.removeChild(vpMb.getNode());
                    subject.next(type);
                    close$.unsubscribe();
                } else {
                    vpMb.removeClass('fadeIn').addClass('fadeOut');
                    vpAlert.removeClass('zoomIn').addClass('zoomOut');
                }
            });

    }
};

export default alert;
