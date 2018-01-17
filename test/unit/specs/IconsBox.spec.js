import Vue from 'vue';
import IconsBox from 'src/pages/examples/src/icons-box';

describe('IconsBox.vue', () => {
  it('IconsBox render correct contents', () => {
    const Constructor = Vue.extend(IconsBox);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.tu-biao-ji-he').textContent)
      .to.equal('参考图标集合');
  });
});
