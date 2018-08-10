import BnjSearchBox from './src/main';

/* istanbul ignore next */
BnjSearchBox.install = function(Vue) {
  Vue.component(BnjSearchBox.name, BnjSearchBox);
};

export default BnjSearchBox;
