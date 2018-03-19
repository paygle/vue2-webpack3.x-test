import Vue from 'vue';
import { createVue, destroyVM } from '../util';
import { Button, Select, Option } from 'element-ui';
import HelloWorld from '@compo/examples/HelloWorld';

Vue.use(Button);
Vue.use(Select);
Vue.use(Option);

describe('HelloWorld.vue', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('should render correct contents', () => {
    vm = createVue(HelloWorld, true);
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App');
  });
});
