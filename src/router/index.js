import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import Login from '../components/Login'
import register from "../components/register";
import  HelloWorld from  "../components/HelloWorld"
import  son1 from  "../components/son1"
import passfind from  "../components/passfind"
import  carset  from  "../components/carset"
import  routeselect  from  "../components/routeselect"
import  typeselect  from  "../components/typeselect"
import  submitselect  from  "../components/submitselect"


Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      // beforeRouteLeave (to, from, next) {
      //  导航离开该组件的对应路由时调用
      //  可以访问组件实例 `this`
      // }
    },
    {
      path:"/register",
      name:"register",
      component:register
    },
    {
      path:"/passfind",
      name:"passfind",
      component:passfind
    },
    {
      path:"/HelloWorld",
     // name:"HelloWorld",
      component:HelloWorld,
       meta: {
         requireAuth: true
       },
      children:[
        {
          path:"/",
          name:"son1",
          component:son1
        },
        {
          path:"/carset",
          name:"carset",
          component:carset
        },
        {
          path:"/routeselect",
          name:"routeselect",
          component:routeselect
        },
        {
          path:"/typeselect",
          name:"typeselect",
          component:typeselect
        },
        {
          path:"/submitselect",
          name:"submitselect",
          component:submitselect
        }

       /* {
          path:"/son2",
          name:son2,
          component:son2
        }
        */
      ]
    }
  ]
});

// if (sessionStorage.getItem('token')) {
//   store.commit('set_token', sessionStorage.getItem('token'))
// }

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (sessionStorage.getItem('username')) {// 判断是否登录
      next();
    } else {// 没登录则跳转到登录界面
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
});
export default router
