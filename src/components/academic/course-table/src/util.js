const isArray = Array.isArray;

export const hasOwn = Object.prototype.hasOwnProperty;

/**
 * 是否为空对象
 * @param {Object} obj 判断对象
 */
export const isOEmpty = (obj) => {
  if (typeof obj === 'object' && obj !== null) {
    for (let k in obj) {
      if (hasOwn.call(obj, k)) return false;
    }
  }
  return true;
};

/**
 * 返回带前置零的串
 * @param {Number} dint   数字
 * @param {Number} limit  保持几位数加前置零
 */
export const getPreZero = (dint, limit) => {
  if (!isNaN(dint) && !isNaN(limit)) {
    let len = limit - String(parseInt(dint, 10)).length;
    let zeros = [];
    for (let i = 0; i < len; i++) zeros.push(0);
    return zeros.join('') + String(parseInt(dint, 10));
  }
  return dint;
};

/**
 * 列头选择
 * @param {Array} selections  已经选择内容
 * @param {Array} columns     列内容 { courses, head, id, type }
 * @param {Object} item       选择对象
 * @param {String | Number} type  数据类型
 */
export const columnSelector = (selections, columns, item, type) => {
  let selectyes = [];
  let selectmore = [];
  let idval = item.id;
  let selected = item.selected;
  let prop;
  let isfind;

  type = String(type); // 教室 1， 老师 2

  if (type === '1') {
    prop = 'classRoomID';
  } else if (type === '2') {
    prop = 'teacherID';
  }

  // search selections
  selections.forEach((item) => {
    if (item[prop] === idval) {
      selectyes.push(item);
    }
  });

  if (selected) {

    for (let i = 0; i < columns.length; i++) {
      if (columns[i]['id'] === idval) {
        selectmore = columns[i]['courses'];
        break;
      }
    }

    selectmore.forEach((item) => {
      isfind = false;
      for (let j = 0; j < selectyes.length; j++) {
        if (selectyes[j]['courseID'] === item['courseID']) {
          isfind = true;
          break;
        }
      }
      if (!isfind) {
        item.selected = true;
        selections.push(item);
      }
    });

  } else {

    selections.forEach((item) => {
      if (item[prop] !== idval) {
        selectmore.push(item);
      } else {
        item.selected = false;
      }
    });

    selections = selectmore;
  }

  return selections;
};
/**
 * 单个课程选择
 * @param {Array} selections 已选择内容
 * @param {Array} columns    列内容 { courses, head, id, type }
 * @param {Object} course    当前选择课程
 * @param {Array} headata   表头数据
 * @param {Number} type      数据类型
 */
export const courseSelector = (selections, columns, course, headata, type) => {

  let isfind;
  let orderProp;
  let column = {};
  let courses = [];
  let findIndex = -1;
  let isNotAllSelected = false;

  type = String(type); // 教室 1， 老师 2

  if (type === '1') {
    orderProp = 'classRoomID';
  } else if (type === '2') {
    orderProp = 'teacherID';
  }

  for (let i = 0; i < columns.length; i++) {
    if (columns[i]['id'] === course[orderProp]) {
      courses = columns[i]['courses'];
      break;
    }
  }

  for (let i = 0; i < headata.length; i++) {
    if (headata[i]['id'] === course[orderProp]) {
      column = headata[i];
      break;
    }
  }

  for (let j = 0; j < courses.length; j++) {
    if (!courses[j]['selected']) {
      isNotAllSelected = true;
      break;
    }
  }

  if (isNotAllSelected) {
    column.selected = false;
  } else {
    column.selected = true;
  }

  isfind = false;
  for (let k = 0; k < selections.length; k++) {
    if (selections[k]['courseID'] === course['courseID']) {
      isfind = true;
      findIndex = k;
      break;
    }
  }

  if (!isfind && course.selected) {
    selections.push(course);
  } else if (isfind) {
    selections.splice(findIndex, 1);
  }
  return selections;
};

// 获取转换数据
export const selectHeadProps = (o, d, type) => {
  //  { content: [1, '天河校区'], selector: 'nav', selected: false},
  let otmp;
  let result = [];

  if (type === 1) {
    for (let i = 0; i < d.length; i++) {
      otmp = JSON.parse(JSON.stringify(o));
      otmp.id = d[i]['classRoomID'];
      otmp.content.push(d[i]['classRoomName']);
      otmp.content.push(d[i]['campusName']);
      otmp.coldata = d[i];
      result.push(otmp);
    }
  } else if (type === 2) {
    for (let j = 0; j < d.length; j++) {
      otmp = JSON.parse(JSON.stringify(o));
      otmp.id = d[j]['teacherID'];
      otmp.content.push(d[j]['nickName']);
      result.push(otmp);
    }
  }
  return result;
};

// 获取结构数据
export const getLayout = (obj, refs) => {
  if (typeof obj === 'object' &&
      typeof obj.getBoundingClientRect === 'function') {
    return obj.getBoundingClientRect();
  } else if (refs && typeof obj === 'string' && refs[obj]) {
    let o = refs[obj];
    if (refs[obj].$el) o = refs[obj].$el;
    return o.getBoundingClientRect();
  }
};

export const isFFChrome = () => {
  return /(Chrome|Firefox)/ig.test(navigator.appVersion);
};

// 获取时区
export const getTimezone = () => {
  return Math.abs(((new Date()).getTimezoneOffset() / 60));
};

/**
 * 获取 HH-mm 格式时间
 * @param {Date} date 日期类型或日期字符串
 */
export const getTimeHHmm = (date) => {
  let d = new Date(date);
  return `${getPreZero(d.getHours(), 2)} : ${getPreZero(d.getMinutes(), 2)}`;
};
/**
 * 返回字符串格式日期
 * @param {Date} date     日期类型
 * @param {String} type   是否全部返回 all, MD, YMD(默认), NOW-MD (当前年不显示年)
 */
export function getDateStr(date, type) {
  if (date) {
    date = date.getTime ? date : new Date(date);
    let NowYear = new Date().getFullYear();
    let year = date.getFullYear();
    let month = getPreZero(date.getMonth() + 1, 2);
    let day = getPreZero(date.getDate(), 2);
    let HH = getPreZero(date.getHours(), 2);
    let mm = getPreZero(date.getMinutes(), 2);
    let ss = getPreZero(date.getSeconds(), 2);

    if (type === 'all') return `${year}-${month}-${day} ${HH}:${mm}:${ss}`;
    if (type === 'NOW-MD' && NowYear === year) return `${month}-${day}`;   // 当前年不显示年
    if (type === 'MD') return `${month}-${day}`;
    return `${year}-${month}-${day}`;
  }
  return '';
}

/**
 * 获取周-日期数据
 * @param {Object} _main     cousrseTable对象
 * @param {String} date      开始日期格式 YYYY-MM-DD
 * @param {String} weekflag  前一周（pre) 后一周(next) 当前周（now）标志
 * @param {String} dformat   日期格式化 all, MD, YMD(默认)
 */
export const getWeeks = (_main, date, weekflag, dformat) => {

  let tmpDate;
  let weekday = 0;   // 当前星期数
  let weekdays = [];
  const daytamp = 1000 * 60 * 60 * 24;

  // type = type || 'cn';
  date = typeof date === 'string' ? String(date).trim() : date;

  if (/^\d{4}\-\d{1,2}\-\d{1,2}$/ig.test(date)) {
    date = new Date(date.replace(/\-/g, '/'));
  } else if (/^\d+$/ig.test(date)) {
    date = new Date(date);
  }

  if (date instanceof Date) {

    let dt = date.getTime();
    weekday = date.getDay();

    if (weekflag === 'pre') {
      dt = dt - daytamp * 7;
      _main.currentDate = dt;
    } else if (weekflag === 'next') {
      dt = dt + daytamp * 7;
      _main.currentDate = dt;
    }

    // if (type === 'en') {
    //   dt = dt - daytamp * weekday;
    //   for (let i = 0; i < 7; i++) {
    //     tmpDate = new Date(dt + daytamp * i);
    //     weekdays.push({
    //       week: i,
    //       date: getDateStr(tmpDate),
    //       checked: weekday === i
    //     });
    //   }
    // } else {
    dt = dt - daytamp * (weekday === 0 ? 7 : weekday);
    for (let j = 1; j < 8; j++) {
      tmpDate = new Date(dt + daytamp * j);
      weekdays.push({
        week: j === 7 ? 0 : j,
        date: getDateStr(tmpDate, dformat),
        value: tmpDate,                    // 完整日期
        checked: weekday === j || j === 7 && weekday === 0
      });
    }
    // }
  }
  return weekdays;
};

/**
 * 课程数据增删属性
 * @param {Array} data  需要操作的数据
 * @param {Object} obj  需要增删除的属性
 * @param {String} op   增加或删除标志 add, del
 */
export const courseProps = (data, obj, op) => {
  if ((!op || op === 'add') && isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      for (let item in obj) {
        if (hasOwn.call(obj, item)) data[i]['course'][item] = obj[item];
      }
    }
  } else if (op === 'del' && isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      for (let item in obj) {
        if (hasOwn.call(obj, item)) delete data[i]['course'][item];
      }
    }
  }
  return data;
};

/**
 * 获取列结构数据
 * @param {Array} headData  头部数据
 * @param {Array} courses   课程数据
 * @param {Number} type     排课类型 1 教室，2 教师
 */
export const getColumsData = (headData, courses, type) => {

  let colums = [];
  let headerIds = {};
  let tmpid = '';
  let typeProp = '';

  if (isArray(headData) && isArray(courses)) {

    if (type === 1) {          // 按教室排课
      typeProp = 'classRoomID';
    } else if (type === 2) {   // 按教师排课
      typeProp = 'teacherID';
    }

    for (let i = 0; i < courses.length; i++) {
      tmpid = courses[i]['course'][typeProp];
      if (isArray(headerIds[tmpid])) {
        headerIds[tmpid].push(courses[i]['course']);
      } else {
        headerIds[tmpid] = [courses[i]['course']];
      }
    }

    for (let j = 0; j < headData.length; j++) {
      tmpid = headData[j][typeProp];
      if (isArray(headerIds[tmpid])) {
        colums.push({id: tmpid, head: headData[j], courses: headerIds[tmpid], type: type});
      } else {
        colums.push({id: tmpid, head: headData[j], courses: [], type: type});
      }
    }
  }

  return colums;
};
