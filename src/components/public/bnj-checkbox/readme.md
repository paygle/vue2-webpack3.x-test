## bnj-checkbox 操作组件

```html
<!-- 操作 -->
<el-form 
  :model="form"
  :rules="rules" 
  ref="ruleForm" 
  :label-position="labelPosition" 
  label-width="100px" 
  class="demo-ruleForm">

  <!--教室类别 多选组件-->
  <el-form-item label="教室类别" prop="checklist">
    <bnj-checkbox :obj="checkbox" :formobj="form"></bnj-checkbox>
  </el-form-item>

</el-form>



<script>
import BnjCheckbox from '@compo/public/bnj-checkbox';
import { RULE_REQUIRED } from '@utils/validate-rules';

export default {
  components: {
    BnjCheckbox
  },
  data() {
    return {
      form: {                         // 校验表单控制对象 (可自我定义参数):model="form"
        checklist: []                 // 勾选的ids数组,用于提交 (可自我定义参数)
      },
      rules: {                        // 表单校验规则,校验必填
        checklist: RULE_REQUIRED      // rules里面、form里面、prop="checkclassroom"、checkbox.arrname 四个地方参数相同
      },
      checkbox: {                     // 传到组件里面的对象,只用于渲染页面
        list: [],                     // 数据列表
        arrname: 'checklist',         // 返回勾选id的数组名称
        name: 'classroomcategory',    // name的变量名称
        id: 'classroomcategoryid',    // id的变量名称
        fn: this.fuck                 // 全选、勾选回调函数
      },
    };
  },
  methods: {
    fuck(id) { // 全选没有id

    }
  }
};
</script>
```

### Attributes
| 参数     | 说明                  | 类型      | 可选值                           | 默认值  |
|----------|---------------------- |---------- |--------------------------------  |-------- |
| **form** | 操作名称，**必选参数** | Array | — | — |
| **checkbox**   | 传入组件的对象 **必选参数**，  | Object | — | — |
| **rules**   | 校验规则 **非必选参数**，  | Object | — | — |


### form 对象里的参数 Attributes
| 参数     | 说明                  | 类型      | 可选值                           | 默认值  |
|----------|---------------------- |---------- |--------------------------------  |-------- |
| **checkclassroom**   | 返回的勾选id的数组，可自我定义名称 **必选参数**，  | Object | — | — |


### checkbox 对象里的参数 Attributes
| 参数     | 说明                  | 类型      | 可选值                           | 默认值  |
|----------|---------------------- |---------- |--------------------------------  |-------- |
| **list**   | 渲染页面的列表数组 **必选参数**，  | Array | — | — |
| **arrname**   | 勾选id的数组-参数名称 **必选参数**，  | String | — | — |
| **name**   | 数组里的中文参数名称 **必选参数**，  | String | — | — |
| **id**   | 数组里的id参数名称 **必选参数**，  | String | — | — |
| **fn**   | 全选或勾选的回调函数 **非必选参数**，  | String | — | — |