/* 公共数据生成函数库 */
const isUndef = (d) => typeof d === 'undefined';
/**
 * 获取动态配置对象
 * @param {String}  prop   配置对象名称
 * @param {any}     value  配置值
 * @param {Boolean} update 更新值
 */
export function vmConfiger(prop, value, update) {

  if (!window.configvm) window.configvm = {}; // 初始化公共配置对象

  if (typeof prop === 'string') {
    // 处理未定义
    if (isUndef(window.configvm[prop])) {
      if (!isUndef(value)) {
        window.configvm[prop] = value;
      } else {
        window.configvm[prop] = {};
      }
    }
    // 是否更新值
    if (update) {
      window.configvm[prop] = value;
    }
    return window.configvm[prop];
  }
  return window.configvm;
}

/**
 * 生成小时值 0  ~ 23 数组
 */
export function genHours() {
  const config = vmConfiger('dynamicData');
  if (!config['hours023']) {
    config['hours023'] = [];
    for (let i = 0; i < 24; i++) {
      config['hours023'].push(i);
    }
  }
  return config['hours023'];
}

/**
 * 生成分钟值 0  ~ 60 数组，间隔5分钟
 */
export function genMinutes() {
  const config = vmConfiger('dynamicData');
  if (!config['minutes060']) {
    config['minutes060'] = [];
    for (let i = 0; i < 60; i += 5) {
      config['minutes060'].push(i);
    }
  }
  return config['minutes060'];
}
