import BnjPagination from './src/main';

/* istanbul ignore next */
BnjPagination.install = function(Vue) {
  Vue.component(BnjPagination.name, BnjPagination);
};

export default BnjPagination;
