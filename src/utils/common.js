/**
 * 返回今天的日期
 * @param {Number} type 不传：年月日时分秒、1：年月日时分、2：年月日
 */
export const today = (type) => {
  let d = new Date();
  let oy = d.getFullYear();
  let om = d.getMonth() + 1;
  let od = d.getDate();
  let oh = d.getHours();
  let oM = d.getMinutes();
  let os = d.getSeconds();
  if (isUndefined(type)) {
    return oy + '-' + om + '-' + od + ' ' + oh + ':' + oM + ':' + os;
  } else if (type === 1) {
    return oy + '-' + om + '-' + od + ' ' + oh + ':' + oM;
  } else if (type === 2) {
    return oy + '-' + om + '-' + od;
  }
};

/**
 * 传入时间返回日期串
 * @param {Number} a 时间戳
 * @param {Number} type 1：年月日时分秒、2：年月日、3：时分、否则：年月日时分
 */
export const returnTime = (a, type) => {
  if (isUndefined(a)) {
    return '';
  }
  // a时间，type格式
  let oD = new Date(Number(a));
  let y = oD.getFullYear();
  let m = returnNum(oD.getMonth() + 1);
  let d = returnNum(oD.getDate());
  let h = returnNum(oD.getHours());
  let mi = returnNum(oD.getMinutes());
  let s = returnNum(oD.getSeconds());
  if (type === 1) {
    return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s;
  } else if (type === 2) {
    return y + '-' + m + '-' + d;
  } else if (type === 3) {
    return h + ':' + mi;
  } else {
    return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
  }
};

/**
 * 返回时区
 */
export const returnTimeZon = () => {
  return -(new Date().getTimezoneOffset()) / 60;
};

/**
 * 时间字符串反时间戳
 * @param {String} time 传入时间如：2018-06-05、2018-06-05 10:10:10、2018/06/05
 */
export const returnTimeStr = (time) => {
  if (isUndefined(time)) {
    return null;
  }
  if (time.indexOf(' ') === -1) {
    time = time + ' 00:00:00';
  }
  time = time.replace(/-/g, '/');
  return (new Date(time)).getTime();
};

/**
 * 小于10加0
 * @param {Number} a 传入小于10的数字
 */
export const returnNum = (a) => {
  return a < 10 ? '0' + a : a;
};

/**
 * 判断是否为空
 * @param {any} value 根据值判断是否等于null、undefined、''、'  '，并返回true或者false 
 */
export const isUndefined = (value) => {
  if (value !== null && typeof value === 'object') {
    return false;
  };
  if (value === undefined) {
    return true;
  } else if (value === null) {
    return true;
  } else if (String(value).trim().length === 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * 四舍五入数字
 * @param {Number} value 传入的数字
 * @param {Number} num 保留多少位小数
 */
export const toFixeds = (value, num) => {
  if (isUndefined(value)) {
    return '';
  }
  var str = String(value).split('.')[1];
  if (!str) {
    return value.toFixed(num);
  }
  str = str.substr(num, 1);
  if (parseInt(str, 10) === 5) {
    return (value.toFixed(num) * Math.pow(10, num) + 1) / Math.pow(10, num);
  } else {
    return value.toFixed(num);
  }
};

/**
 * 
 * @param {any} val 传入需要过滤的字符串 
 */
export const checkipt = (val) =>{
  val = val.replace(/[^\d]/g, '');
  return val;
};
