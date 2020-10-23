// 1、实现一个插件，挂载$router，声明router-link和router-view两个全局组件
// 2、监听路由变化
import QrouterView from './qrouter-view'
import QrouterLink from './qrouter-link'
let Vue
class QVueRouter {
  constructor (options) {
    const initial = window.location.hash.slice('1') || '/'
    Vue.util.defineReactive(this, 'current', initial)
    this.$options = options
    this.routeMap = {}
    options.routes.forEach(item => {
      this.routeMap[item.path] = item
    })
    window.addEventListener('hashchange', this.handleHashChange.bind(this))
    window.addEventListener('load', this.handleHashChange.bind(this))
  }
  handleHashChange () {
    this.current = window.location.hash.slice(1)
  }
}

QVueRouter.install = function (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  Vue.component('qrouter-view', QrouterView)
  Vue.component('qrouter-link', QrouterLink)
}

export default QVueRouter
