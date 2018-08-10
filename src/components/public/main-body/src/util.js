// main-body util
/**
 * 添加菜单checked属性
 * @param {Array} menusdata 菜单数据
 */
export const addMenusCheckProps = (menusdata) => {
  let newmenus = JSON.parse(JSON.stringify(menusdata));
  if (Array.isArray(menusdata)) {
    let chkmenus = [];
    let children;
    for (let k = 0; k < newmenus.length; k++) {
      chkmenus.push(newmenus[k]);
      if (newmenus[k].children) {
        children = newmenus[k].children;
        for (let ch = 0; ch < children.length; ch++) {
          children[ch].checked = false;
        }
      }
    }
    return chkmenus;
  }
  return menusdata;
};
