// 1、实现一个插件，挂载$router，声明router-link和router-view两个全局组件
// 2、监听路由变化
import QrouterView from './qrouter-view'
import QrouterLink from './qrouter-link'
let Vue
class QVueRouter {
  constructor (options) {
    this.$options = options
    this.current = window.location.hash.slice('1') || '/'
    // Vue.util.defineReactive(this, 'current', initial)
    // this.routeMap = {}
    // options.routes.forEach(item => {
    //   this.routeMap[item.path] = item
    // })
    this.matched = []
    window.addEventListener('hashchange', this.handleHashChange.bind(this))
    window.addEventListener('load', this.handleHashChange.bind(this))
    this.getMatched()
    console.log(this.matched)
  }
  handleHashChange () {
    this.current = window.location.hash.slice(1)
    this.matched = []
    this.getMatched()
    console.log(this.matched)
  }

  getMatched (routes) {
    let route = routes || this.$options.routes
    route.forEach(item => {
      console.log(this.current)
      if (item.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      if (this.current.indexOf(item.path) > -1) {
        this.matched.push(item)
        if (item.children && item.children.length > 0) {
          this.getMatched(item.children)
        }
      }
    })
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
