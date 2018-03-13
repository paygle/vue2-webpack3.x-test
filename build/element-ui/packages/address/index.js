import ElAddress from './src/address';

/* istanbul ignore next */
ElAddress.install = function(Vue) {
  Vue.component(ElAddress.name, ElAddress);
};

export default ElAddress;
