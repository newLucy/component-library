import Vue from 'vue'
import QRouter from './qvue-router'
import QForm from '@/views/form'
import QTree from '@/views/tree'
import QVuex from '@/views/vuex'
import QRouterComponent from '@/views/router'

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
