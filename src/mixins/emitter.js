export default {
  methods: {
    dispatch (componentName, eventName, params) {
      let parent = this.$parent || this.$root
      while (parent) {
        if (parent.$options.componentName === componentName) {
          parent.$emit.apply(parent, [eventName].concat(params))
          break
        }
        parent = parent.$parent
      }
    }
  }
}
