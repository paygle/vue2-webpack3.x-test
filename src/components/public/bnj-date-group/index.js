import BnjDateGroup from './src/main';

/* istanbul ignore next */
BnjDateGroup.install = function(Vue) {
  Vue.component(BnjDateGroup.name, BnjDateGroup);
};

export default BnjDateGroup;
