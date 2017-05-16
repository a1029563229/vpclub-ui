import Toast from './components/toast';
import Alert from './components/alert';
import Loading from './components/loading';
import { 
  InputWhite,
  InputLine 
} from './components/input';

import './assets/js/vue/directive';

const components = [
    InputWhite,
    InputLine
];

const version = '0.0.1';
const install = function(Vue, config = {}) {
  if (install.installed) return;
  Vue.use(Toast);
  Vue.use(Alert);
  Vue.use(Loading);

  components.map(component => {
      Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  version,
  Toast,
  Alert,
  Loading,
  InputWhite
};
