import CourseTable from './src/main';

/* istanbul ignore next */
CourseTable.install = function(Vue) {
  Vue.component(CourseTable.name, CourseTable);
};

export default CourseTable;
