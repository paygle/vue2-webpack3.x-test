/* 公共工具类型函数库 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * 判断是否为obj的自己的属性
 * @param {Object} obj 给定对象
 * @param {String} key 在给定对象上是否存在key值
 */
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

/**
 * 判断是否为日期对象
 * @param {any} date 给定参数
 */
export function isDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * setTimeout 延迟处理
 * @param {Number} htime    时间句柄
 * @param {Function} cb     回调函数
 * @param {Array}  params   回调参数
 * @param {Number} time     时间毫秒
 */
export function setRunTimeout(htime, cb, params, time) {
  clearTimeout(htime);
  if (!time && params) { time = params; params = null; }
  htime = setTimeout(() => {
    if (typeof cb === 'function') cb.apply(null, params);
  }, time || 0);
  return htime;
}

/**
 * 设置标题内容
 * @param {Rounter}  to         VueRounter 对象
 * @param {Number} timeHandler  回调句柄
 */
export const setTitle = (to, timeHandler) => {
  setRunTimeout(timeHandler, (r) => {
    if (r.meta.label) {
      document.title = r.meta.label || '';
    } else if (r.matched.length >= 2) {
      document.title = r.matched[r.matched.length - 2].meta.label || '';
    }
  }, [to], 100);
};

/**
 * 插入一个或多个属性到一个对象或数组
 * @param {Object, Array} orgin  需要添加属性的原对象或数组
 * @param {Object} props         插入的属性对象，如 {a:1, b:2, ...}
 * @param {String} menu          菜单专用
 */
export const insertPropsTo = (orgin, props, menu) => {
  let newObj = orgin;
  if (orgin) {
    newObj = JSON.parse(JSON.stringify(orgin));
    if (Array.isArray(orgin)) {
      for (let i = 0; i < newObj.length; i++) {
        for (let p in props) {
          if (i === 0 && p === 'actived' && typeof menu === 'undefined') {
            newObj[i][p] = true;
          } else if (p === 'actived' && newObj[i]['value'] === String(menu)) {
            newObj[i][p] = true;
          } else if (props.hasOwnProperty(p)) {
            newObj[i][p] = props[p];
          }
        }
      }
    } else if (typeof orgin === 'object') {
      for (let p in props) {
        if (p === 'actived' && newObj['value'] === String(menu)) {
          newObj[p] = true;
        } else if (props.hasOwnProperty(p)) {
          newObj[p] = props[p];
        }
      }
    }
  }
  return newObj;
};

/**
 *  创建 script 链接
 * @param {String}   url    引入的链接地址
 * @param {Function} load   加载完成后的回调
 * @param {Boolean}  async  是否异步加载
 */
export const createScript = (url, load, async) => {
  if (typeof url === 'string') {
    let scripts = document.body.querySelectorAll('script');
    let script = document.createElement('script');
    let oscript;
    script.type = 'text/javascript';
    script.src = url;
    script.async = typeof load === 'boolean' ? load : async;
    script.onload = load;

    for (let k = 0; k < scripts.length; k++) {
      if (new RegExp(url + '$', 'ig').test(scripts[k]['src'])) {
        oscript = scripts[k];
      }
    }

    if (oscript) {
      document.body.replaceChild(script, oscript);
    } else {
      document.body.appendChild(script);
    }
  }
};
