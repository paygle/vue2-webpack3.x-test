## course-table 组件

### 使用方式

```html
<course-table
  :config="{
    spanStart: 8,
    spanEnd: 22
  }"
  disauto-width>
</course-table>

```

### 接口属性
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |-----------------------------  |-------- |
| config | 配置选项 | Object | — | true |
| disautoWidth | 禁用内容布局自适应宽度 | boolean | — | false |


#### config 属性内容
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |-----------------------------  |-------- |
| spanStart | 时间跨度开始(单位小时) | Number | — | 0 |
| spanStep | 布局间隔(单位小时) | Number | — | 1 |
| spanEnd | 时间跨度结束(单位小时) | Number | — | 23 |
| justTime | 时间选择调整最小单位(HH:mm 格式) | String | — | 00:05 |
| forbidTimes | 禁用时间集合(eg. ['1-3', 21, 23] ) | Array | — | — |
| topHeadHeight | 表头高度（单位px) | Number | — | 50 |
| contentColHeight | 内容列高度（单位px） | Number | — | 60 |
| contentColWidth | 内容列宽度（单位px） | Number | — | 120 |
| contentColMaxWidth | 内容列最大宽度（单位px） | Number | — | 220 |


### 接口事件
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| print-state | 打印界面状态显示隐藏元素 | (state [Boolean]) |
