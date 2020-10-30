export default {
  render (h) {
    // const { routeMap, current } = this.$router
    // const component = routeMap[current] ? routeMap[current].component : null
    console.log('router-view')
    this.$vnode.data.routerView = true

    let depth = 0
    let parent = this.$parent
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if (vnodeData && vnodeData.routerView) {
        depth++
      }
      parent = parent.$parent
    }

    let component = null
    if (this.$router.matched[depth]) {
      component = this.$router.matched[depth].component
    }
    return h(component)
  }
}
