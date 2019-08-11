import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


  // state===data
  //Getter 是一个纯函数，用于接收state 参数。返回你需要取的值
  // mutation  是对  state 进行修改
  // action  处理数据，对处理的数据 返回给 mutation 从而对 state 进行修改

// 1.action 提交mutation,而不是直接更改状态
// 2.action 可以包括异步操作，mutation只能同步
// 3.modules  将store分割成模块（modules）,每个模块拥有自己的(state,mutations,actions,getter);方便维护
// 4.store 改变状态时通过 （commit） mutations

  const store = new Vuex.Store({
  state: {
    count: 0,
    username:'',
    token:'',
  },
    mutations: {
      increment (state) {
        state.count++
      },
      del_username(state){
        state.username='';
      },
      // //获取token，删除token
      // set_token(state, token) {
      //   state.token = token;
      //   sessionStorage.token = token;
      // },
      // del_token(state) {
      //   state.token = '';
      //   sessionStorage.removeItem('token')
      // }

      // updateusername(state,user){
      //   state.username=user;
      // }
    },
    actions: {

    },

  });

export default store;

