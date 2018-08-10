## bnj-search-box 多条件搜索区

```html

<bnj-search-box>
  <!-- 直接显示的搜索框 -->
  <template slot="header">
    <div class="row-cell">
      <div class="col-cell-x200">
        <el-input placeholder="学生姓名/手机号/学生编号"></el-input>
      </div>
      <div class="col-cell-x200">
        <el-select v-model="selectnum">
          <el-option label="全部分校" :value="1"></el-option>
        </el-select>
      </div>
      <div class="col-cell-x200">
        <el-select v-model="selectnum">
          <el-option label="在学" :value="1"></el-option>
        </el-select>
      </div>
    </div>
  </template>

  <!-- 折叠的搜索框 -->
  <div class="row-cell">
    <div class="col-cell-x200">
      <el-select v-model="selectnum">
        <el-option label="全部选课状态" :value="1"></el-option>
      </el-select>
    </div>
    <div class="col-cell-x200">
      <el-input placeholder="手机号"></el-input>
    </div>
    <div class="col-cell-x200">
      <el-date-picker
        v-model="dateone"
        type="date"
        placeholder="学生生日">
      </el-date-picker>
    </div>
    <div class="col-cell-x200">
      <el-date-picker
        v-model="dateone"
        type="date"
        placeholder="学生生日">
      </el-date-picker>
    </div>
  </div>
  <div class="row-cell">
    <div class="col-cell-x200">
      <el-input placeholder="教师姓名"></el-input>
    </div>
    <div class="col-cell-x200">
      <el-select v-model="selectnum">
        <el-option label="全部授课形式" :value="1"></el-option>
      </el-select>
    </div>
    <div class="col-cell-x200">
      <el-select v-model="selectnum">
        <el-option label="全部课程类型" :value="1"></el-option>
      </el-select>
    </div>
    <div class="col-cell-x200">
      <el-select v-model="selectnum">
        <el-option label="全部" :value="1"></el-option>
      </el-select>
    </div>
    <div class="col-cell-x200">
      <el-input placeholder="课程名称"></el-input>
    </div>
  </div>

  <!-- 搜索框按钮 -->
  <template slot="buttons">
    <el-button type="primary" @click.stop>查询</el-button>
    <el-button class="mL15" @click.stop="clearSearch">清空</el-button>
  </template>
</bnj-search-box>

<script>
import BnjSearchBox from '@compo/public/bnj-search-box';

export default {
  components: {
    BnjSearchBox
  },
  data() {
    return {

    };
  }
};
</script>
```

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **show-all** | 展示所有搜索条件，不再隐藏, 关闭高级筛选折叠功能 | Boolean | — | — |


### slot 插槽
| 名称      | 说明           |
|--------- | --------------------------------  |
|   ——     | 默认隐藏插槽 |
|  header  | 默认显示出来的插槽 |
| buttons  | 搜索按钮的插槽 |
