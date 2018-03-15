## Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

### Form Attributes

* **扩展属性**

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| disabled-tips   | 禁用表单溢出和验证弹窗提示 | Boolean |   —    | false |
| show-message  | 是否显示校验错误信息, true 显示下方消息，false 显示弹出消息 | boolean | — | true |
| scope-name  | 表单域名称 | String | — | 'ElForm' | |

* **继承属性**

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| model   | 表单数据对象 | object      |                  —                |  — |
| rules    | 表单验证规则 | object | — | — |
| inline    | 行内表单模式 | boolean | — | false |
| label-position | 表单域标签的位置 | string |  right/left/top            | right |
| label-width | 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值 | string | — | — |
| label-suffix | 表单域标签的后缀 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 是否以行内形式展示校验信息 | boolean | — | false |
| status-icon  | 是否在输入框中显示校验结果反馈图标 | boolean | — | false |
| validate-on-rule-change  | 是否在 `rules` 属性改变后立即触发一次验证 | boolean | — | true |
| size  | 用于控制该表单内组件的尺寸 | string | medium / small / mini | — |
| disabled | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效 | boolean | — | false |

### Form Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| validate | 对整个表单进行校验的方法。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean))
| validateField | 对部分表单字段进行校验的方法 | Function(prop: string, callback: Function(errorMessage: string))
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | -
| clearValidate | 移除整个表单的校验结果 | -

### Form-Item Attributes

* **扩展属性**

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| model   | 数据无关联验证-数据对象 | Object |   —    | — |
| value  | 数据无关联验证非Object类型的值，使用 v-model 绑定 |  除了Object/null/undefined的值 | — | true |
| scope-name  | 表单域名称 | String | — | 'ElForm' |

* **继承属性**

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px' | string |       —       | — |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | bolean | — | false |
| rules    | 表单验证规则 | object | — | — |
| error    | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 以行内形式展示校验信息 | boolean | — | false |
| size  | 用于控制该表单域下组件的尺寸 | string | medium / small / mini | - |

### Form-Item Slot
| name | 说明 |
|------|--------|
| — | Form Item 的内容 |
| label | 标签文本的内容 |

### Form-Item Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| resetField | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | -
