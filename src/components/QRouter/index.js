import Vue from 'vue'
import QRouter from './qvue-router'
import QForm from '@/views/form/index'
import QTree from '@/views/tree/index'
import QVuex from '@/views/vuex/index'

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
    }
  ]
})
