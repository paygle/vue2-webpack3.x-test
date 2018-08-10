## el-table 输入框

```html
<el-table show-summary>
  <el-table-column
    prop="date"
    label="数值"
    width="180">
  </el-table-column>

  <template slot="counter">
    <tr>
      <td colspan="1" rowspan="1">
        <div class="cell">合计</div>
      </td>
      <td colspan="1" rowspan="1">
        <div class="cell">123</div>
      </td>
      <td colspan="1" rowspan="1">
        <div class="cell"></div>
      </td>
    </tr>
  </template>
</el-table>
```

### table Attributes

* **扩展属性**

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| cross-on | 显示表格十字架，增强可阅读性 | boolean | — | false |

* **扩展插槽**
|  名称      | 说明             |
|---------- |--------------------------------  |
|  counter  | 插槽追加在合计后面，必需与 show-summary 共同使用|
