
import merge from '@utils/merge';

function isObject(dat) {
  if (dat && typeof dat === 'object') {
    return true;
  }
  return false;
}

// 路由和store合并
export const mergeTarget = (target, data) => {
  for (let k = 0; k < data.length; k++) {
    for (let p in data[k]) {
      if (data[k].hasOwnProperty(p) && typeof data[k][p] !== 'undefined') {
        if (Array.isArray(target[p])) {
          target[p] = target[p].concat(data[k][p]);
        } else if (isObject(target[p]) && isObject(data[k][p])) {
          target[p] = merge(target[p], data[k][p]);
        } else {
          target[p] = data[k][p];
        }
      }
    }
  }
  return target;
};
