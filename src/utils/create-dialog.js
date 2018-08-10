
/**
 * 对话框创建函数, 该方法只有在 $nextTick 中获取options
 * @param {Object} dialogVue dialog组件文件及内容
 */
export default (dialogVue) => {
  let queryid = `dialog-${parseInt(Math.random() * 10000, 10)}`;
  let dialog = {id: queryid};

  dialog.DialogConstructor = Vue.extend(dialogVue);

  dialog.init = () => {
    dialog.instance = new dialog.DialogConstructor({
      el: document.createElement('div')
    });
  };

  return (op, options = {}, instan) => {

    if (dialog && !dialog.instance) { dialog.init(); }
    if (op === 'open') {
      for (let p in options) {
        if (options.hasOwnProperty(p)) {
          dialog.instance[p] = options[p];
        }
      }

      let $dialog = document.body.querySelector(`.${queryid}`);
      if (!$dialog) {
        document.body.appendChild(dialog.instance.$el);
      }
      Vue.nextTick(() => { dialog.instance.visible = true; });
      if (typeof instan === 'function') instan.call(null, dialog.instance);
    } else if (op === 'close' && dialog.instance) {
      dialog.instance.visible = false;
      let dialogClose = dialog.instance.dialogClose;
      if (typeof dialogClose === 'function') dialogClose.call();
    } else if (op === 'destory' && dialog) {
      dialog.instance = null;
      dialog = null;
    }
  };
};
