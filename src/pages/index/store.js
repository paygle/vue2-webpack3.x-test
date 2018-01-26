// Vuex store 存储
// 警告： 模块和全局mutations中的方法名称不得重名
export default new Vuex.Store({
  // 全局存储
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },

  // 局部模块存储
  modules: {

    // API 模块
    api: {
      state: {
        bhTile: '',
        descParams: ''
      },
      mutations: {
        // 设置标题
        setBhTile(state, title) {
          state.bhTile = title;
        },

        // 设置参数
        setDescParams(state, params) {
          state.descParams = params;
        }

      }
    }

  }
});
