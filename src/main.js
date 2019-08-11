// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios  from 'axios'
import Vuex from 'vuex'
import store from './store/store'
import BaiduMap from 'vue-baidu-map'


Vue.use(Vuex);
Vue.use(Element);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.use(BaiduMap,{
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key
  ak: 'h4VOl8IEGF9vuiIwbNq1lH6uCe7GtFBL'
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
});


