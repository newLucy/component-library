import Vue from 'vue'
import QRouter from './qvue-router'
import QForm from '@/views/form/index'
import QTree from '@/views/tree/index'
import QVuex from '@/views/vuex/index'
import QRouterComponent from '@/views/router/index'

Vue.use(QRouter)

export default new QRouter({
  routes: [
    {
      path: '/tree',
      name: 'QTree',
      component: QTree
    },
    {
      path: '/form',
      name: 'QForm',
      component: QForm
    },
    {
      path: '/vuex',
      name: 'QVuex',
      component: QVuex
    },
    {
      path: '/router',
      name: 'QRouter',
      component: QRouterComponent,
      children: [{
        path: '/child1',
        name: 'Child1',
        component: {render (h) {
          return h('h1', {}, ['路由嵌套'])
        }}
      }]
    }
  ]
})
