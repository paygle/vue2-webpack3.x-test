## bnj-tabs 路由切换tab

```html
<bnj-tabs :routes="courseRoutes" urlpre="academic"></bnj-tabs>

<script>
import BnjTabs from '@compo/public/bnj-tabs';

export default {
  components: {
    BnjTabs
  },
  data() {
    return {
      courseRoutes: [
        {val: 1, label: '个别课排课', hide: false, url: '#/ac/scheduling/pl'},
        {val: 2, label: '集体课排课', hide: false, url: '#/ac/scheduling/gr'},
        {val: 3, label: '练琴排课', hide: false, url: '#/ac/scheduling/pi'},
        {val: 4, label: '集体课补课', hide: false, url: '#/ac/scheduling/mk'},
        {val: 5, label: '周课表', hide: false, url: '#/ac/scheduling/wk'},
        {val: 6, label: '日课表', hide: false, url: '#/ac/scheduling/dy'}
      ]
    };
  }
};
</script>
```

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **without-header** | 不显示头部Tab | Boolean | — | false |
| **routes** | 路由数据，**必选参数** | Array | — | — |
| **urlpre** | 路由URL前缀，**必选参数**， 请参考 constants.js 文件 PREURL 常量 | String | — | — |
