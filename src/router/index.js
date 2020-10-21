import Vue from 'vue'
import Router from 'vue-router'
import QTree from '@/components/QTreeComponent/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QTree',
      component: QTree
    }
  ]
})
