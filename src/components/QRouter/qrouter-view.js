export default {
  componentName: 'router-view',
  render (h) {
    // const { routeMap, current } = this.$router
    // const component = routeMap[current] ? routeMap[current].component : null
    let depth = 1
    let parent = this.$parent
    while (parent) {
      if (parent.componentName === 'router-view') {
        depth++
      }
      parent = parent.$parent
    }

    const component = this.$router.matched[depth - 1].component
    return h(component)
  }
}
