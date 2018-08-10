/* 公共全局过滤器 */

export default {
  filters: {
    // 过滤器： 0 ~ 6 数值转周
    weekday(val) {
      let weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      return weekdays[val];
    }

  }
};
