import BnjPusher from '@compo/public/bnj-pusher';

// MessageBox 简化
const alert = (msg, cb) => {
  ELEMENT.MessageBox.alert(msg, { callback: action => { cb && cb.call(); }});
};

const confirm = (msg, cbok, cbno) => {
  ELEMENT.MessageBox.confirm(msg, '提示', {})
    .then(() => { cbok && cbok.call(); })
    .catch(() => { cbno && cbno.call(); });
};

const message = (msg, type) => {
  ELEMENT.Message({showClose: true, message: msg, duration: 3000, type: type});
};

Vue.prototype.$pusher = BnjPusher;
Vue.prototype.$bnjMessage = message;
Vue.prototype.$bnjAlert = alert;
Vue.prototype.$bnjConfirm = confirm;
