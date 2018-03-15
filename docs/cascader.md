## Cascader 级联选择器

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| options | 可选项数据源，键名可通过 `props` 属性配置 | array | — | — |
| props | 配置选项，具体见下表 | object | — | — |
| value | 选中项绑定值   | array | — | — |
| separator | 选项分隔符 | string | — | 斜杠'/' |
| popper-class | 自定义浮层类名   | string | —  | — |
| placeholder | 输入框占位文本 | string | — | 请选择 |
| disabled | 是否禁用 | boolean | — | false |
| clearable | 是否支持清空选项 | boolean | — | false |
| expand-trigger | 次级菜单的展开方式 | string | click / hover | click |
| show-all-levels | 输入框中是否显示选中值的完整路径 | boolean | — | true |
| filterable | 是否可搜索选项 | boolean | — | — |
| debounce | 搜索关键词输入的去抖延迟，毫秒 | number | — | 300 |
| change-on-select | 是否允许选择任意一级的选项 | boolean | — | false |
| size | 尺寸 | string | medium / small / mini | — |
| before-filter | 筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选 | function(value) | — | — |

### props
| 参数     | 说明              | 类型   | 可选值 | 默认值 |
| -------- | ----------------- | ------ | ------ | ------ |
| value    | 指定选项的值为选项对象的某个属性值 | string | — | — |
| label    | 指定选项标签为选项对象的某个属性值 | string | — | — |
| children | 指定选项的子选项为选项对象的某个属性值 | string | — | — |
| disabled | 指定选项的禁用为选项对象的某个属性值 | string | — | — |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change | 当绑定值变化时触发的事件 | 当前值 |
| active-item-change | 当父级选项变化时触发的事件，仅在 `change-on-select` 为 `false` 时可用 | 各父级选项组成的数组 |
| blur | 在 Cascader 失去焦点时触发 | (event: Event) |
| focus | 在 Cascader 获得焦点时触发 | (event: Event) |
