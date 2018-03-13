import dateUtil from './date'; // 扩展

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function noop() {};

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
};

export function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

export const getValueByPath = function(object, prop) {
  prop = prop || '';
  const paths = prop.split('.');
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

export function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  let keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

export const generateId = function() {
  return Math.floor(Math.random() * 10000);
};

export const valueEquals = (a, b) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

/**
 * 判断对象是否为空对象
 * @author liuxp
 */
export const isOwnEmpty = (obj) => {
  for (var name in obj) { if (obj.hasOwnProperty(name)) return false; }
  return true;
};

/**
 * 扩展-> 数据对象类型判断
 * 支持返回类型：String、 Number、Boolean、Array、Object、Function、Date、Math...
 * @author liuxp
 */
export const typeOf = (o) => {
  let type = typeof o !== 'undefined' ? Object.prototype.toString.call(o) : undefined;
  if (type) {
    type = String(type).replace(/object\s+\w+/, function(rep) {
      return rep.replace(/object\s+/, '');
    }).replace(/[\[\]]*/g, '');
  }
  return type;
};

// 扩展-> 自定义转换日期格式为斜杠 YYYY/MM/DD/ HH:MM:SS 兼容格式
export const compatDateStr = function(date) {
  function getZerov(v) { return v < 10 ? '0' + parseInt(v, 10) : v; }
  if (typeof date === 'string') {
    let t = date.split(':');
    let dt = new Date(), Y = dt.getFullYear(), M = dt.getMonth() + 1, D = dt.getDate();
    if (/^\d{1,2}(:\d{1,2}){0,2}$/.test(date)) {
      if (t.length === 1) {
        return Y + '/' + M + '/' + D + ' ' + getZerov(t[0]) + ':00:00';
      } else if (t.length === 2) {
        return Y + '/' + M + '/' + D + ' ' + getZerov(t[0]) + ':' + getZerov(t[1]) + ':00';
      } else if (t.length === 3) {
        return Y + '/' + M + '/' + D + ' ' + getZerov(t[0]) + ':' + getZerov(t[1]) + ':' + getZerov(t[2]);
      } else {
        return dt;
      }
    } else {
      return String(date).replace(/\-/g, '/');
    }
  } else {
    return date;
  }
};

/**
 * @author liuxp
 * 获取浮点数据值
 * precision [Number] 小数点后精度位数
 * value [Number, String] 数值或字符型数值
 * roundoff [Boolean] 是否四舍五入，默认false 直接舍弃多余部分
 * 返回类型浮点数字： [String]
 */
export const getFloatNumber = (precision, value, roundoff) => { // 自定义 float 获取

  precision = !isNaN(precision) ? Number(precision) : 0;

  if (precision > 0 && !isNaN(value) && value !== '') {
    let strNums = String(value).split('.');
    let pnum = strNums[1] ? strNums[1] : [];
    let newPnum = '';

    strNums[0] = !isNaN(strNums[0]) ? Number(strNums[0]) : 0;

    for (let i = 0; i < precision; i++) {
      if (!isNaN(pnum[i])) {
        if (i === precision - 1 && pnum[i + 1] && roundoff) {
          // 四舍五入
          newPnum += Math.round(parseInt(pnum[i], 10) + parseInt(pnum[i + 1], 10) / 10);
        } else {
          newPnum += pnum[i];
        }
      } else {
        newPnum += '0';
      }
    }
    if (strNums.length === 2) {
      strNums.splice(1, 1, newPnum);
    } else {
      strNums[1] = newPnum;
    }
    return strNums.join('.');
  }
  return value;
};

function mixFields(arr, fo, op) {
  if (arr.length) {
    let marknew = [];
    let opdata = arr.map((item) => {
      let nf = JSON.parse(JSON.stringify(fo));
      marknew.push({});
      Object.keys(nf).forEach((f) => {
        if (op === 'add') {
          item[f] = nf[f];
        } else if (op === 'del') {
          delete item[f];
        } else if (op === 'mark' && item.hasOwnProperty(f)) {
          marknew[marknew.length - 1][f] = item[f];
        }
      });
      return item;
    });
    return op === 'mark' ? marknew : opdata;
  }
  return arr;
}

function mixFieldInArray(arr, field, op) {
  if (!Array.isArray(arr)) return [];
  let fieldObj = {}, nwarr = JSON.parse(JSON.stringify(arr));
  if (Array.isArray(field)) {
    for (let i = 0; i < field.length; i++) fieldObj[field[i]] = '';
    return mixFields(nwarr, fieldObj, op);
  } else if (typeof field === 'object') {
    return mixFields(nwarr, field, op);
  } else if (typeof field === 'string') {
    fieldObj[field] = '';
    return mixFields(nwarr, fieldObj, op);
  }
}

/**
 * 数组添加字段对象
 * 格式： ['a', 'b', 'c' ...] 内部元素必须都是字段名称，初始化为空字串
 * 格式： {'a': true, 'b': 'bb', c: 123} 合并到数组内的每一条数据
 * 格式： 'fieldname'  添加单个字段到数组
 * @param { Object | String | Array } field
 */
export const arrayFieldsAdd = (arr, field) => mixFieldInArray(arr, field, 'add'); // 添加
export const arrayFieldsdel = (arr, field) => mixFieldInArray(arr, field, 'del'); // 删除
export const arrayMarkNew = (arr, field) => mixFieldInArray(arr, field, 'mark'); // 选取

/**
 * @param { Object, String } el   对象选择符或结点对象
 */
export const focusInput = (el) => {

  function focus(elm) {
    let inputEl = null;
    if (elm.tagName === 'INPUT') {
      inputEl = elm;
    } else if (elm.querySelector) {
      inputEl = elm.querySelector('input') || elm.querySelector('textarea');
    }
    if (inputEl) {
      inputEl.focus();
    }
  }

  if (typeof el === 'string') {
    let dom = document.body.querySelector(el);
    if (dom !== null && typeof dom === 'object') focus(dom);
  } else if (typeof el === 'object' && el !== null) {
    el.$el ? focus(el.$el) : focus(el);
  }
};

/**
 * 日期时间加减运算
 * 支持的初始格式:  2017-01-11 19:20、 2018-01-11 和  Date 对象
 * 支持的加减数格式： 12 18:12:15、 18、 12 18、 18:12、 18:12:15
 */
export const dateCalc = (datatime) => {
  function getDateTimes(Dstr) {
    if (!/^\d+((\s+\d+)?(\:\d+){0,2})?/g.test(Dstr)) return 0;
    let DDT, TIME, dt = { DD: 0, hh: 0, mm: 0, ss: 0 };
    if (/^\d+\s+\d+/g.test(Dstr)) {
      DDT = Dstr.split(/\s+/);
      dt.DD = DDT[0];
      TIME = String(DDT[1]).split(':');

    } else if (/^\d+((\:\d+){0,2})?/g.test(Dstr)) {
      TIME = String(Dstr).split(':');
    }
    dt.hh = TIME[0] || 0;
    dt.mm = TIME[1] || 0;
    dt.ss = TIME[2] || 0;
    dt.DD = dt.DD * 24 * 60 * 60 * 1000;
    dt.hh = dt.hh * 60 * 60 * 1000;
    dt.mm = dt.mm * 60 * 1000;
    dt.ss = dt.ss * 1000;
    return dt.DD + dt.hh + dt.mm + dt.ss;
  }

  function getStrDate(date) {
    let YY, MM, DD, hh, mm, ss;
    function getf(n) {
      if (n < 10) return '0' + n;
      return n;
    }
    YY = date.getFullYear();
    MM = date.getMonth() + 1;
    DD = date.getDate();
    hh = date.getHours();
    mm = date.getMinutes();
    ss = date.getSeconds();

    return YY + '-' +
      getf(MM) + '-' +
      getf(DD) + ' ' +
      getf(hh) + ':' +
      getf(mm) + ':' +
      getf(ss);
  }

  // 加法
  this.add = function(dt) {
    this.ntime += getDateTimes(dt);
    this.date = new Date(this.ntime);
    return {
      add: this.add,
      sub: this.sub,
      ntime: this.ntime,
      date: this.date,
      val: getStrDate(this.date)
    };
  };
  // 减法
  this.sub = function(dt) {
    this.ntime -= getDateTimes(dt);
    this.date = new Date(this.ntime);
    return {
      add: this.add,
      sub: this.sub,
      ntime: this.ntime,
      date: this.date,
      val: getStrDate(this.date)
    };
  };

  let ntime, cpdt;
  if (datatime instanceof Date) {
    cpdt = datatime;
    ntime = datatime.valueOf();
  } if (typeof datatime === 'string' && /\d/g.test(datatime)) {
    cpdt = new Date(String(datatime).replace(/\-/g, '/'));
    ntime = cpdt.valueOf();
  }
  return {
    add: this.add,
    sub: this.sub,
    ntime: ntime,
    date: cpdt,
    val: getStrDate(cpdt)
  };
};

/**
 * @author liuxp
 * 日期字符串转换为 Date 类型
 * @param dataStr [String]  例如 2017-12-12
 */
export const strToDate = (dateStr) => {
  return new Date(dateStr);
};
/**
 * @author liuxp
 * Date类型转换为日期字符串类型
 * @param date    [Date]
 * @param format  [String]   如: yyyy-MM-dd
 */
export const dateToStr = (date, format) => {
  date = new Date(date);
  if (isNaN(date.getTime())) return null;
  if (!date) return '';
  return dateUtil.format(date, format || 'yyyy-MM-dd');
};

/**
 * Date类型转换为星期几
 * @param {*} date [Date]
 */
export const dateToWeek = (date) => {
  var weekArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return weekArray[date.getDay()];
};

/**
 * 检查是否是有权限的url
 */
export const isAuthorizedUrl = (url) => {
  var reg = new RegExp(url + '$'); // endWith
  let menusData = window.userMenus || [];
  for (var menu of menusData) {
    if (reg.test(menu.url)) {
      return true;
    } else if (menu.subMenu && menu.subMenu.length > 0) {
      for (var sMenu of menu.subMenu) {
        if (reg.test(sMenu.url)) {
          return true;
        } else if (sMenu.subMenu && sMenu.subMenu.length > 0) {
          for (var ssMenu of sMenu.subMenu) {
            if (reg.test(ssMenu.url)) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
};

/** 浏览器版本测试 */
export const Browser = function() {
  this.browser = this.searchString(this.dataBrowser) || 'An unknown browser';
  this.version = this.searchVersion(navigator.userAgent) ||
    this.searchVersion(navigator.appVersion) || 'an unknown version';
  this.OS = this.searchString(this.dataOS) || 'an unknown OS';
};

Browser.prototype = {

  searchString: function(data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) !== -1) return data[i].identity;
      } else if (dataProp) return data[i].identity;
    }
  },
  searchVersion: function(dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index === -1) return;
    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },
  dataBrowser: [{
    string: navigator.userAgent,
    subString: 'Chrome',
    identity: 'Chrome'
  },
  {
    string: navigator.vendor,
    subString: 'Apple',
    identity: 'Safari',
    versionSearch: 'Version'
  },
  {
    prop: window.opera,
    identity: 'Opera'
  },
  {
    string: navigator.userAgent,
    subString: 'Firefox',
    identity: 'Firefox'
  },
  {
    string: navigator.userAgent,
    subString: 'MSIE',
    identity: 'IE',
    versionSearch: 'MSIE'
  },
  {
    string: navigator.userAgent,
    subString: 'Gecko',
    identity: 'Mozilla',
    versionSearch: 'rv'
  }],
  dataOS: [{
    string: navigator.platform,
    subString: 'Win',
    identity: 'Windows'
  },
  {
    string: navigator.platform,
    subString: 'Mac',
    identity: 'Mac'
  },
  {
    string: navigator.userAgent,
    subString: 'iPhone',
    identity: 'iPhone/iPod'
  },
  {
    string: navigator.platform,
    subString: 'Linux',
    identity: 'Linux'
  }]
};
