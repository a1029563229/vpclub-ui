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
    // subject.next(true);
 
    function vpAlert( content = '', title = '提示', type = opt.type) {
        if (document.getElementsByClassName('vp-mb-alert').length) {
            return;
        }

        console.log(true);
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
                console.log(val);
                subject.next(0);
                resolve(val);
            });
        })
    };
    
    Vue.prototype.$alert = async (content = '', title = '提示', type = opt.type) => {
        let alertPlugins = await vpAlert(content, title, 'alert');
        return alertPlugins;
    }

    Vue.prototype.$alert.confirm = async (content = '', title = '提示', type = opt.type) => {
        let alertPlugins = await vpAlert(content, title, 'confirm');
        return alertPlugins;
    }

    Vue.prototype.$alert.close = (type = '') => {
        let vpMb = vp('.vp-mb-alert');
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
