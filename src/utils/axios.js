import {
  PROXY_URLS,
  COMMON_URL_DATA
} from './constants';
import {
  getLocalStore,
  setLocalStore
  // setEncryptStore,
  // hasPermission
} from './storage';
import qs from 'qs';
import { $setLocale } from './locale';

const isFunc = (f) => typeof f === 'function';

// 初始化语言国际化
let lang = getLocalStore('language') || 'cn';
setLocalStore('language', lang);
Vue.config.lang = lang;
$setLocale(lang);

// 提交附加数据
const addkey = function(d) {
  let logkey = getLocalStore('logkey');
  if (d === null) d = {};
  if (typeof d === 'string') {
    let dd = JSON.parse(d);
    if (dd && typeof dd === 'object' && logkey) {
      dd.key = logkey;
      return qs.stringify(dd);
    }
  }
  if (typeof d === 'object' && logkey) {
    d.key = logkey;
    return qs.stringify(d);
  }
  return qs.stringify({});
};

// 检测是否已经登录
export const isLogined = () => {

  return true;
};

/**
 * 返回数据处理
 * @param {String} err 错误返回
 * @param {String} res 资源返回
 * @param {Function} callback(data) 回调函数
 * @param {Function} errorFn(data) 错误回调
 * @param {Number} save 是否保存 0 不保存，1 保存
 * @param {String} prop 获取属性
 * @param {String} gname 暂存全局属性
 */
const dispose = (err, res, callback, errorFn, cover, save, prop, gname) => {
  const okstatus = [200, 0];
  if (okstatus.indexOf(res.status) > -1) {
    if (okstatus.indexOf(res.data.status) > -1) {

      // 暂存公共数据
      if (typeof save !== 'undefined' && save) {
        window.configvm[gname] = res.data[prop];
        callback(res.data[prop]);
      } else {
        callback(res.data);
      }

    } else if (res.data.status === -100) {
      // console.log('用户未登入');
      parent.window.postMessage('1212', '*');
    } else {
      if (isFunc(errorFn)) {
        errorFn(err);
      } else {
        ELEMENT.Message({
          showClose: true,
          message: err.errordesc,
          duration: 3000,
          type: 'error'
        });
      }
    }
  }
  cover && cover.close();
};

// loading params
const loadopt = {fullscreen: true, background: 'rgba(0,0,0,0.65)' };

/**
 * Get 异步请求
 * @param {String} proxy 代理URL类型 old，academic，service，charge，console，enroll，finance，office，setting
 * @param {String} url 请求链接
 * @param {Object} data 请求数据
 * @param {Function} callback(data) 回调函数
 * @param {Function} errorFn(res) 错误回调
 */
Vue.prototype.$requestGet = (proxy, url, data, callback, errorFn) => {
  proxy = proxy || 'old';
  const proxyURL = PROXY_URLS[proxy] || '';
  const cover = ELEMENT.Loading.service(loadopt);
  if (isLogined()) {
    axios.get(proxyURL + url, addkey(data))
      .then((res) => { dispose(null, res, callback, errorFn, cover); })
      .catch((err) => { dispose(err, null, callback, errorFn, cover); });
  }
};

/**
 * Post 异步请求
 * @param {String} proxy 代理URL类型 old，academic，service，charge，console，enroll，finance，office，setting
 * @param {String} url 请求链接
 * @param {Object} data 请求数据
 * @param {Function} callback(data) 回调函数
 * @param {Function} errorFn(res) 错误回调
 */
Vue.prototype.$requestPost = (proxy, url, data, callback, errorFn) => {
  proxy = proxy || 'old';
  const proxyURL = PROXY_URLS[proxy] || '';
  const cover = ELEMENT.Loading.service(loadopt);
  if (isLogined()) {
    axios.post(proxyURL + url, addkey(data))
      .then((res) => { dispose(null, res, callback, errorFn, cover); })
      .catch((err) => { dispose(err, null, callback, errorFn, cover); });
  }
};

/**
 * jsonp 异步请求
 * @param {String} proxy 代理URL类型 old，academic，service，charge，console，enroll，finance，office，setting
 * @param {String} url 请求链接
 * @param {Object} data 请求数据
 * @param {Function} callback(data) 回调函数
 * @param {Function} errorFn(res) 错误回调
 */
Vue.prototype.$requestJsonp = (proxy, url, data, callback, errorFn) => {
  proxy = proxy || 'old';
  const proxyURL = PROXY_URLS[proxy] || '';
  const cover = ELEMENT.Loading.service(loadopt);
  if (isLogined()) {
    axios.jsonp(proxyURL + url, addkey(data))
      .then((res) => { dispose(null, res, callback, errorFn, cover); })
      .catch((err) => { dispose(err, null, callback, errorFn, cover); });
  }
};

/**
 * Request 异步请求
 * @param {String} method 请求类型 GET/POST/PUT等
 * @param {String} url 请求链接
 */
Vue.prototype.$Request = (proxy, url, params) => {
  proxy = proxy || 'old';
  const proxyURL = PROXY_URLS[proxy] || '';
  return axios(proxyURL + url, params);
};

/**
 * getCommonData 获取公共数据对象
 * @param {String} propname 请参考 constants.js 中的 COMMON_URL_DATA 定义
 * @param {String} callback 请求完成回调
 * @param {String} errorFn  请求失败回调
 */
Vue.prototype.$getCommonData = (propname, callback, errorFn) => {
  const gproxy = COMMON_URL_DATA[propname];
  if (gproxy) {
    const proxy = gproxy['proxy'] || 'old';
    const method = gproxy['method'] || 'post';
    const proxyURL = PROXY_URLS[proxy] || '';
    const save = gproxy['save'] || 0;
    const prop = gproxy['prop'];
    const url = gproxy['url'];
    if (!window.configvm) window.configvm = {}; // 初始化公共配置对象

    if (!window.configvm[propname] || save !== 1) {
      axios({method: method, url: proxyURL + url, data: addkey({})})
        .then((res) => { dispose(null, res, callback, errorFn, 0, save, prop, propname); })
        .catch((err) => { dispose(err, null, callback, errorFn, 0, save, prop, propname); });
    } else {
      callback(window.configvm[propname]);
    }
  }
};
