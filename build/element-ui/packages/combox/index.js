import Combox from './src/combox';

/* istanbul ignore next */
Combox.install = function(Vue) {
  Vue.component(Combox.name, Combox);
};

export default Combox;
