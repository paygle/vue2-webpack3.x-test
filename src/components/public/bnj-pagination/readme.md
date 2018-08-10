## bnj-pagination 分页器

```html
<bnj-pagination :option='paginationOption' @change='sousuo'>
  <!-- 插槽看情况写不写 -->
  <template slot="btns">         
    <el-button type="primary">批量XXX</el-button>
  </template>
</bnj-pagination>

<script>
import BnjPagination from '@compo/public/bnj-pagination';

export default {
  components: {
    BnjPagination
  },
  data() {
    return {
      paginationOption: {currentPage: 1, pageSize: 10, total: 100}  
    };
  },
  methods: {
    sousuo() {
      // 你的回调函数
    }
  },
};
</script>
```

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **option** | 分页数据数据，**必选参数** | Object | — | — |
| **change** | 点击分页器时触发的函数，**回调函数** | Function | — | — |


### paginationOption下的参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **currentPage** | 当前页 **必选参数** | Number | — | — |
| **pageSize** | 一页多少条 **必选参数** | Number | — | — |
| **total**    | 总共多少条数据，**必选参数** | Number | — | — |


### slot 插槽
| 名称      | 说明           |
|--------- | --------------------------------  |
| btns  | 分页器左边批量操作按钮 |
