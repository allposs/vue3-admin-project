import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import NProgress from 'nprogress' //进度条
import 'nprogress/nprogress.css'
Vue.use(Router)
// 路由懒加载
const getComponent = (name, component) => () => import(`@/views/${name}/${component}.vue`);
const myRouter = new Router({
  routes: [{
      path: '/login',
      name: 'login',
      component: getComponent('login', 'index')
    },
    {
      path: '/',
      redirect: '/login',
      component: getComponent('login', 'index')
    },
    {
      path: '/home',
      component: getComponent('layout', 'Layout'),
      children: [{
          path: '/home',
          component: getComponent('home', 'index'),
          meta: {
            title: 'menu.home'
          }
        },{
          path: '/piechart',
          component: getComponent('charts', 'cricle'),
          meta: {
            title: 'menu.pieChart'
          }
        },{
          path: '/settings',
          component: getComponent('settings', 'index'),
          meta: {
            title: 'menu.settings'
          }
        },{
          path: '/tty',
          component: getComponent('tty', 'index'),
          meta: {
            title: 'sys.tty'
          }
        },{
          path: '/404',
          component: getComponent('error', '404'),
          meta: {
            title: '404'
          }
        },
      ]
    }, {
      path: '*',
      redirect: '/404',
    }
  ]
})

//判断是否存在token
myRouter.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path !== '/login' && !store.state.user.token) {
    next('/login')
    NProgress.done() // 结束Progress
  } else {
  //权限鉴定
  if(to.meta.roles){
    to.meta.roles.includes(...store.getters.roles)?next():next('/404')
  }else{
    next();
  }}
})

myRouter.afterEach(() => {
  NProgress.done() // 结束Progress
})
export default myRouter