import BnjTabs from './src/main';

/* istanbul ignore next */
BnjTabs.install = function(Vue) {
  Vue.component(BnjTabs.name, BnjTabs);
};

export default BnjTabs;
