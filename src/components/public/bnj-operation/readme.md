## bnj-operation 操作组件

```html
<!-- 操作 -->
<el-table-column label="操作">
  <template slot-scope="scope" >
    <bnj-operation :scope="scope" :operation="operation"></bnj-operation>
  </template>
</el-table-column>

<script>
import BnjOperation from '@compo/public/bnj-operation';

export default {
  components: {
    BnjOperation
  },
  data() {
    return {
      operation: {                // 操作组件的配置对象，有名称和对应操作函数
        filter: this.filterOperation,
        list: [
          {
            name: '修改',
            promision: this.returnpromision(666),
            fn: this.handleEdit    // 点击修改执行的函数
          },
          {
            name: '删除',           // 点击删除执行的函数
            promision: this.returnpromision(888),
            fn: this.handleDelete
          }
        ]
      }
    };
  },
  methods: {
    // 修改
    handleEdit(index, row) {

    },

    // 删除
    handleDelete(index, row) {

    },

    // 过滤该行的操作
    filterOperation(scope, list) {

      if (scope.row.num % 2 === 0) {
        return list;
      } else {
        return [];
      }
    },

    // 总的权限控制函数，共用写不用自己写
    returnpromision(id) {
      return true;
    }
  }
};
</script>
```

### operation Attributes
| 参数     | 说明                  | 类型      | 可选值                           | 默认值  |
|----------|---------------------- |---------- |--------------------------------  |-------- |
| **filter** | 返回该行拥有的操作数组 **非必选参数** | Function(row) | — | — |
| **list**   | 所有操作数组 **必选参数**，  | Array | — | — |

### Attributes
| 参数     | 说明                  | 类型      | 可选值                           | 默认值  |
|----------|---------------------- |---------- |--------------------------------  |-------- |
| **promision** | 权限控制传入id返回true或者false **必选参数** | Function(id) | — | — |
| **name** | 操作名称，**必选参数** | String | — | — |
| **fn**   | 对应操作执行函数，**必选参数**，  | Function (rowindex, row) | — | — |
