## 时间组插件

```html
<!-- format为可选，不写为yyyy/MM/dd -->
<bnj-date-group :date="dateObj" format='timestamp' class="fl mB14"></bnj-date-group>

<script>
import BnjDateGroup from '@compo/public/bnj-date-group';

export default {
  components: {
    BnjDateGroup
  },
  data() {
    return {
      dateObj: {
        startTitle: '学生录入起始时间',   // 起始时间没有值时的文字
        endTitle: '学生录入结束时间',     // 结尾时间没有值使的文字
        startDate: null,                 // 开始时间
        endDate: null,                   // 结束时间
      } 
    };
  }
};
</script>
```

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **date**   | 时间组对象参数 **必选参数** | Object | — | — |
| **format** | 返回时间的类型，**可选参数** | String | yyyy/MM/dd, yyyy-MM-dd, timestamp | 'yyyy/MM/dd' |
| **disabled** | 是否禁用时间控件，**可选参数** | Boolean | true, false | false |
| **datetype** | 哪一中时间控件 **可选参数** | String | 'date', 'datetime' | 'date' |



### paginationOption下的参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **startTitle** | 起始时间没有值时的文字 **必选参数** | Number | — | — |
| **endTitle**   | 结尾时间没有值使的文字 **必选参数** | Number | — | — |
| **startDate**  | 开始时间 **必选参数** | Null | — | — |
| **endDate**    | 结束时间 **必选参数** | Null | — | — |