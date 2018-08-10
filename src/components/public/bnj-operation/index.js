import BnjOperation from './src/main';

/* istanbul ignore next */
BnjOperation.install = function(Vue) {
  Vue.component(BnjOperation.name, BnjOperation);
};

export default BnjOperation;
