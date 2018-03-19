import { createVue, destroyVM } from '../util';
import IconsBox from 'src/pages/examples/src/icons-box';

describe('IconsBox.vue', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('IconsBox render correct contents', () => {
    vm = createVue(IconsBox, true);
    expect(vm.$el.querySelector('.tu-biao-ji-he').textContent)
      .to.equal('参考图标集合');
  });
});
