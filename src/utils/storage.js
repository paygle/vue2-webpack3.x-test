
import {isLogined} from './axios';

const hasOwn = Object.prototype.hasOwnProperty;

const isArray = (a) => Array.isArray(a);

const generater = () => {
  const ocode = 'abcdefghijklnmopqrstuvwxyz1234567890ABCDEFGHIJKLNMOPQRSTUVWXYZ.,-_*/\\()[]{}';
  const mcode = 'mr12abcijklBCDnyz34vwx56dh78FGHIJKopqLNMTstuUVWX90AEYZ.,-_*/\\(OPQRS)[]{efg}';
  const ncode = '1234567890,;.';
  const ocodes = ocode.split('');
  const mcodes = mcode.split('');
  const ncodes = ncode.split('');
  const olen = ocodes.length;
  const mlen = mcodes.length;
  const nlen = ncodes.length;

  let rs = {e: {nums: {}, alphas: {}}, d: {nums: {}, alphas: {}}};

  for (let i = 0; i < nlen; i++) {
    rs.e.nums[ncodes[i]] = [];
    for (let j = 0; j < mlen; j++) {
      if (i === j % nlen && mcodes[j]) rs.e.nums[ncodes[i]].push(mcodes[j]);
    }
  }

  for (let g = 0; g < olen; g++) {
    rs.e.alphas[ocodes[g]] = mcodes[g];
  }

  let nums = rs.e.nums;
  let alphas = rs.e.alphas;

  for (let p in nums) {
    if (hasOwn.call(nums, p)) {
      if (isArray(nums[p])) {
        rs.d.nums[nums[p].join('')] = p;
      }
    }
  }

  for (let a in alphas) {
    if (hasOwn.call(alphas, a)) {
      rs.d.alphas[alphas[a]] = a;
    }
  }

  return rs;
};

const keyLen = (d) => {
  if (d && typeof d === 'object') {
    for (let k in d) {
      if (hasOwn.call(d, k)) {
        return String(k).length;
      }
    }
  } else if (typeof d === 'string') {
    return String(d).length;
  }
};

const random = (len) => {
  let idx = Math.random() * len;
  if (idx < 1 && idx > 0) idx = 0;
  idx = Math.round(idx);
  if (idx > len - 1) idx = len - 1;
  return idx;
};

const translate = (code, d, t) => {
  let codes = code.split('');
  let tcode = [];
  let tc;
  if (t === 'nx') { // numbers
    if (keyLen(d.nums) > 1) {
      for (let i = 0; i < codes.length; i++) {
        tc = codes[i];
        for (let k in d.nums) {
          if (hasOwn.call(d.nums, k) && k.indexOf(tc) > -1) {
            tc = d.nums[k];
            break;
          }
        }
        tcode.push(tc);
      }
    } else {
      for (let i = 0; i < codes.length; i++) {
        tc = codes[i];
        if (d.nums[tc] && isArray(d.nums[tc])) {
          tc = d.nums[tc][random(d.nums[tc].length)] || tc;
        }
        tcode.push(tc);
      }
    }

  } else { // alphabet
    for (let i = 0; i < codes.length; i++) {
      tcode.push(d.alphas[codes[i]] || codes[i]);
    }
  }
  return tcode.join('');
};

const gen = generater();

// 仅支持英文数字简单加密解密
const encrypt = (code, t) => {
  if (typeof code === 'string') {
    return translate(code, gen.e, t);
  }
  return null;
};
// 仅支持英文数字简单加密解密
const decrypt = (code, t) => {
  if (typeof code === 'string') {
    return translate(code, gen.d, t);
  }
  return null;
};

/**
 *  支持格式： yyyy-mm-dd HH:mm:ss | DDD HH:mm:ss | ms
 */
export function getTimeStamp(dhms, flag) {
  let rs = new Date().getTime();
  let df = 0;

  if (/^\d+$/g.test(dhms)) {
    df = dhms;
  } else if (typeof dhms === 'string') {
    let ds = dhms.replace(/\-/g, '/').trim();
    if (/^\d{4}\/\d{1,2}\/\d{1,2}\s+\d+:\d+(:\d+)?/g.test(ds)) {
      ds = new Date(ds);
      if (ds && ds.getTime) return ds.getTime();
    } else if (/^\d+\s+\d+:\d+(:\d+)?/g.test(ds)) {
      let Dt = ds.split(/\s+/, 2);
      let ht = Dt[1] && Dt[1].split(':') || [];
      let m1 = 1000 * 60;
      let mss = parseInt(Dt[0] || 0, 10) * m1 * 60 * 24 +
                parseInt(ht[0] || 0, 10) * m1 * 60 +
                parseInt(ht[1] || 0, 10) * m1 +
                parseInt(ht[2] || 0, 10) * 60;
      df = mss;
    }
  }

  if (df > 0 && flag) { // 获取差值
    return df - rs;
  } else if (!dhms && typeof flag === 'undefined') { // 获取到期时间值
    return '0';
  } else if (typeof flag === 'undefined') { // 获取到期时间值
    return String(dhms) === '0' ? '0' : rs + df;
  }
  return '0';
}

/**
 * 获取本地存储数据
 */
export function getLocalStore(key) {
  let d = localStorage.getItem(key);
  let dt = d ? JSON.parse(d) : false;
  if (dt && /[^\d+]$/g.test(dt.stamp)) {
    return decrypt(dt.data, dt.stamp);
  } else if (dt && getTimeStamp(dt.stamp, true) >= 0) {
    return dt.data;
  } else if (dt) {
    localStorage.removeItem(key);
  }
  return undefined;
}

/**
 * 设置本地存储数据
 * @param {String} key  键
 * @param {不限}   dat  保存的数据
 * @param {String} time 过期时间支持格式： yyyy-mm-dd HH:mm:ss | DDD HH:mm:ss | ms
 */
export function setLocalStore(key, dat, time) {
  localStorage.setItem(key, JSON.stringify({data: dat,  stamp: getTimeStamp(time)}));
}

/**
 * 设置本地加密存储数据
 */
export function setEncryptStore(key, dat) {
  let enctype = 'ax'; // alphabet compose
  if (typeof dat === 'string' && /[\d\,\.\;]+/g.test(dat)) enctype = 'nx';
  localStorage.setItem(key, JSON.stringify({data: encrypt(dat, enctype),  stamp: enctype }));
}

/**
 * 获取Session存储数据
 */
export function getSessionStore(key) {
  return sessionStorage.getItem(key);
}

/**
 * 设置Session存储数据
 */
export function setSessionStore(key, dat) {
  sessionStorage.setItem(key, dat);
}

/**
 *
 * @param {String | Number } code 权限代码
 * @param {String } skey 权限代码本地存储Key值, 默认值 allows
 */
export function hasPermission(code, skey = 'allows') {
  if (isLogined()) {
    return true; // 到时改
    // const pm = getLocalStore(skey); console.log('Decode: ', pm);
    // if (typeof pm === 'string') {
    //   const ps = pm.split(',');
    //   for (let i = 0; i < ps.length; i++) {
    //     if (/\d+/g.test(code) && String(code) === String(ps[i])) return true;
    //   }
    // }
    // return false;
  }
}

/**
 * 添加路由指示信息
 * @param {Object} route 路由信息
 */
export function setDirectorEntrys(route) {
  let hostpath = `//${location.host}${location.pathname}`;
  let directors = [];
  let matched;
  // let recentlyEntrys = getLocalStore('recentlyEntrys') || [];
  // let pathhash = `${hostpath}${location.hash}`;
  // let hasRoute = false;

  // if (!recentlyEntrys.length) {
  //   setLocalStore('recentlyEntrys', [{label: route.meta.label, url: pathhash}]);
  // } else if (recentlyEntrys.length) {
  //   for (let k = 0; k < recentlyEntrys.length; k++) {
  //     if (recentlyEntrys[k].url === pathhash || route.meta.label === recentlyEntrys[k].label) {
  //       hasRoute = true;
  //       break;
  //     }
  //   }
  //   // 只有不存在的路由才添加
  //   if (!hasRoute) {
  //     recentlyEntrys.push({label: route.meta.label, url: pathhash});
  //     if (recentlyEntrys.length > 8) recentlyEntrys.splice(0, 1);
  //     setLocalStore('recentlyEntrys', recentlyEntrys);
  //   }
  // }

  // 指示器数据
  if (Array.isArray(route.matched)) {
    for (let i = 0; i < route.matched.length; i++) {
      matched = route.matched[i];
      if (matched.meta.label) {
        directors.push({label: matched.meta.label, url: `${hostpath}#${matched.path}`});
      }
    }
  }

  if (window.rootvuevm) {
    window.rootvuevm.directorData =  directors;
  }
  // 修复body宽度调整
  var body = document.body.querySelector('section.body');
  if (body) {
    body.style.width = 'auto';
  }
}
