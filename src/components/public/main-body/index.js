import MainBody from './src/main';

/* istanbul ignore next */
MainBody.install = function(Vue) {
  Vue.component(MainBody.name, MainBody);
};

export default MainBody;
