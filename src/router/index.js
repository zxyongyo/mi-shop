import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'

Router.prototype.openPage = function (link, query) {
  this.push({
    path: link,
    /**
     *  合并对象  _.assignIn(object,[sources])
     *  _.assignIn({query:'12345'},{query:'67890'})   -->{query:'67890'}
     * 如果要打开的路由没有time添加当前time
     * 如果有用当前被time替换掉
     */
    query: _.assignIn({
      time: new Date().getTime()
    }, query || {})
  })
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      // component: import('@/views/home')
      component: resolve => require(['@/views/home'], resolve)
    },
    {
      path: '/classification',
      name: 'classification',
      component: resolve => require(['@/views/classification'], resolve)
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: resolve => require(['@/views/shoppingcart'], resolve)
    },
    {
      path: '/mine',
      name: 'mine',
      component: resolve => require(['@/views/mine'], resolve)
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/views/search'], resolve)
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: resolve => require(['@/views/detail'], resolve)
    },
    {
      path: '/pay',
      name: 'pay',
      component: resolve => require(['@/views/pay'], resolve)
    }
  ]
})
