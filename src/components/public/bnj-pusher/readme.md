## bnj-pusher 推送组件

```html
<script>
import '@utils/message-box';  // 引入组件

export default {

  mounted() {
    this.$pusher({message: ['这是一个消息', '这是第二个消息']});
  }

};
</script>
```

### message 属性说明

message = '这是一个消息'
message = ['这是一个消息', '这是第二个消息']
message = [ {msg: '这是一个消息', url: 'a/b/c.html'} ]

### Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| message | 消息文字 | string / Array | — | — |
| customClass | 自定义类名 | string | — | — |
| moveTime | 滚动速度时间，毫秒 | number | 100 |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| showClose | 是否显示关闭按钮 | boolean | — | false |
| onClose | 关闭时的回调函数, 参数为被关闭的 message 实例 | function | — | — |

### 方法
调用 `Message` 或 `this.$message` 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。
| 方法名 | 说明 |
| ---- | ---- |
| close | 关闭当前的 Message |
