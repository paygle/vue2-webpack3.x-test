'use strict';

exports.__esModule = true;
exports.Browser = exports.isAuthorizedUrl = exports.dateToWeek = exports.dateToStr = exports.strToDate = exports.dateCalc = exports.focusInput = exports.arrayMarkNew = exports.arrayFieldsdel = exports.arrayFieldsAdd = exports.getFloatNumber = exports.compatDateStr = exports.typeOf = exports.isOwnEmpty = exports.valueEquals = exports.generateId = exports.getValueByPath = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.noop = noop;
exports.hasOwn = hasOwn;
exports.toObject = toObject;
exports.getPropByPath = getPropByPath;

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 扩展

var hasOwnProperty = Object.prototype.hasOwnProperty;

function noop() {};

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
};

function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

var getValueByPath = exports.getValueByPath = function getValueByPath(object, prop) {
  prop = prop || '';
  var paths = prop.split('.');
  var current = object;
  var result = null;
  for (var i = 0, j = paths.length; i < j; i++) {
    var path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

function getPropByPath(obj, path, strict) {
  var tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  var keyArr = path.split('.');
  var i = 0;
  for (var len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    var key = keyArr[i];
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

var generateId = exports.generateId = function generateId() {
  return Math.floor(Math.random() * 10000);
};

var valueEquals = exports.valueEquals = function valueEquals(a, b) {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

/**
 * 判断对象是否为空对象
 * @author liuxp
 */
var isOwnEmpty = exports.isOwnEmpty = function isOwnEmpty(obj) {
  for (var name in obj) {
    if (obj.hasOwnProperty(name)) return false;
  }
  return true;
};

/**
 * 扩展-> 数据对象类型判断
 * 支持返回类型：String、 Number、Boolean、Array、Object、Function、Date、Math...
 * @author liuxp
 */
var typeOf = exports.typeOf = function typeOf(o) {
  var type = typeof o !== 'undefined' ? Object.prototype.toString.call(o) : undefined;
  if (type) {
    type = String(type).replace(/object\s+\w+/, function (rep) {
      return rep.replace(/object\s+/, '');
    }).replace(/[\[\]]*/g, '');
  }
  return type;
};

// 扩展-> 自定义转换日期格式为斜杠 YYYY/MM/DD/ HH:MM:SS 兼容格式
var compatDateStr = exports.compatDateStr = function compatDateStr(date) {
  function getZerov(v) {
    return v < 10 ? '0' + parseInt(v, 10) : v;
  }
  if (typeof date === 'string') {
    var t = date.split(':');
    var dt = new Date(),
        Y = dt.getFullYear(),
        M = dt.getMonth() + 1,
        D = dt.getDate();
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
var getFloatNumber = exports.getFloatNumber = function getFloatNumber(precision, value, roundoff) {
  // 自定义 float 获取

  precision = !isNaN(precision) ? Number(precision) : 0;

  if (precision > 0 && !isNaN(value) && value !== '') {
    var strNums = String(value).split('.');
    var pnum = strNums[1] ? strNums[1] : [];
    var newPnum = '';

    strNums[0] = !isNaN(strNums[0]) ? Number(strNums[0]) : 0;

    for (var i = 0; i < precision; i++) {
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
    var marknew = [];
    var opdata = arr.map(function (item) {
      var nf = JSON.parse(JSON.stringify(fo));
      marknew.push({});
      Object.keys(nf).forEach(function (f) {
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
  var fieldObj = {},
      nwarr = JSON.parse(JSON.stringify(arr));
  if (Array.isArray(field)) {
    for (var i = 0; i < field.length; i++) {
      fieldObj[field[i]] = '';
    }return mixFields(nwarr, fieldObj, op);
  } else if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
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
var arrayFieldsAdd = exports.arrayFieldsAdd = function arrayFieldsAdd(arr, field) {
  return mixFieldInArray(arr, field, 'add');
}; // 添加
var arrayFieldsdel = exports.arrayFieldsdel = function arrayFieldsdel(arr, field) {
  return mixFieldInArray(arr, field, 'del');
}; // 删除
var arrayMarkNew = exports.arrayMarkNew = function arrayMarkNew(arr, field) {
  return mixFieldInArray(arr, field, 'mark');
}; // 选取

/**
 * @param { Object, String } el   对象选择符或结点对象
 */
var focusInput = exports.focusInput = function focusInput(el) {

  function focus(elm) {
    var inputEl = null;
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
    var dom = document.body.querySelector(el);
    if (dom !== null && (typeof dom === 'undefined' ? 'undefined' : _typeof(dom)) === 'object') focus(dom);
  } else if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' && el !== null) {
    el.$el ? focus(el.$el) : focus(el);
  }
};

/**
 * 日期时间加减运算
 * 支持的初始格式:  2017-01-11 19:20、 2018-01-11 和  Date 对象
 * 支持的加减数格式： 12 18:12:15、 18、 12 18、 18:12、 18:12:15
 */
var dateCalc = exports.dateCalc = function dateCalc(datatime) {
  function getDateTimes(Dstr) {
    if (!/^\d+((\s+\d+)?(\:\d+){0,2})?/g.test(Dstr)) return 0;
    var DDT = void 0,
        TIME = void 0,
        dt = { DD: 0, hh: 0, mm: 0, ss: 0 };
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
    var YY = void 0,
        MM = void 0,
        DD = void 0,
        hh = void 0,
        mm = void 0,
        ss = void 0;
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

    return YY + '-' + getf(MM) + '-' + getf(DD) + ' ' + getf(hh) + ':' + getf(mm) + ':' + getf(ss);
  }

  // 加法
  undefined.add = function (dt) {
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
  undefined.sub = function (dt) {
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

  var ntime = void 0,
      cpdt = void 0;
  if (datatime instanceof Date) {
    cpdt = datatime;
    ntime = datatime.valueOf();
  }if (typeof datatime === 'string' && /\d/g.test(datatime)) {
    cpdt = new Date(String(datatime).replace(/\-/g, '/'));
    ntime = cpdt.valueOf();
  }
  return {
    add: undefined.add,
    sub: undefined.sub,
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
var strToDate = exports.strToDate = function strToDate(dateStr) {
  return new Date(dateStr);
};
/**
 * @author liuxp
 * Date类型转换为日期字符串类型
 * @param date    [Date]
 * @param format  [String]   如: yyyy-MM-dd
 */
var dateToStr = exports.dateToStr = function dateToStr(date, format) {
  date = new Date(date);
  if (isNaN(date.getTime())) return null;
  if (!date) return '';
  return _date2.default.format(date, format || 'yyyy-MM-dd');
};

/**
 * Date类型转换为星期几
 * @param {*} date [Date]
 */
var dateToWeek = exports.dateToWeek = function dateToWeek(date) {
  var weekArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return weekArray[date.getDay()];
};

/**
 * 检查是否是有权限的url
 */
var isAuthorizedUrl = exports.isAuthorizedUrl = function isAuthorizedUrl(url) {
  var reg = new RegExp(url + '$'); // endWith
  var menusData = window.userMenus || [];
  for (var _iterator = menusData, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var menu = _ref;

    if (reg.test(menu.url)) {
      return true;
    } else if (menu.subMenu && menu.subMenu.length > 0) {
      for (var _iterator2 = menu.subMenu, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var sMenu = _ref2;

        if (reg.test(sMenu.url)) {
          return true;
        } else if (sMenu.subMenu && sMenu.subMenu.length > 0) {
          for (var _iterator3 = sMenu.subMenu, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
              if (_i3 >= _iterator3.length) break;
              _ref3 = _iterator3[_i3++];
            } else {
              _i3 = _iterator3.next();
              if (_i3.done) break;
              _ref3 = _i3.value;
            }

            var ssMenu = _ref3;

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
var Browser = exports.Browser = function Browser() {
  this.browser = this.searchString(this.dataBrowser) || 'An unknown browser';
  this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'an unknown version';
  this.OS = this.searchString(this.dataOS) || 'an unknown OS';
};

Browser.prototype = {

  searchString: function searchString(data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) !== -1) return data[i].identity;
      } else if (dataProp) return data[i].identity;
    }
  },
  searchVersion: function searchVersion(dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index === -1) return;
    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },
  dataBrowser: [{
    string: navigator.userAgent,
    subString: 'Chrome',
    identity: 'Chrome'
  }, {
    string: navigator.vendor,
    subString: 'Apple',
    identity: 'Safari',
    versionSearch: 'Version'
  }, {
    prop: window.opera,
    identity: 'Opera'
  }, {
    string: navigator.userAgent,
    subString: 'Firefox',
    identity: 'Firefox'
  }, {
    string: navigator.userAgent,
    subString: 'MSIE',
    identity: 'IE',
    versionSearch: 'MSIE'
  }, {
    string: navigator.userAgent,
    subString: 'Gecko',
    identity: 'Mozilla',
    versionSearch: 'rv'
  }],
  dataOS: [{
    string: navigator.platform,
    subString: 'Win',
    identity: 'Windows'
  }, {
    string: navigator.platform,
    subString: 'Mac',
    identity: 'Mac'
  }, {
    string: navigator.userAgent,
    subString: 'iPhone',
    identity: 'iPhone/iPod'
  }, {
    string: navigator.platform,
    subString: 'Linux',
    identity: 'Linux'
  }]
};