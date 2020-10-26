let Vue
class Store {
  constructor (options = {}) {
    this._vm = new Vue({
      data: {
        // $$表示不代理此变量，此变量为只读
        // 使用this._vm.$$state不能得到，只能通过this._vm._data.$$state得到
        $$state: options.state
      }
    })
    this._mutations = options.mutations
    this._actions = options.actions
    this._getters = options.getters
    this.getters = {}
    console.log(options, this)

    // this.getters = (function () {
    //   return options.getters
    // }())
    let store = this
    let { commit, dispatch, localGetters } = store
    this.commit = function boundCommit (type, payload) {
      commit.call(store, type, payload)
    }
    this.dispatch = function boundDispatch (type, payload) {
      dispatch.call(store, type, payload)
    }
    this.localGetters = function boundGetters (type, payload) {
      localGetters.call(store, type, payload)
    }
    this.localGetters()
  }

  get state () {
    return this._vm._data.$$state
  }
  set state (val) {
    console.error('不能修改，请通过使用store修改！')
  }

  commit (type, payload) {
    let entry = this._mutations[type]
    if (!entry) {
      console.error('未知mutation参数名！')
      return
    }
    entry(this.state, payload)
  }
  dispatch (type, payload) {
    let entry = this._actions[type]
    if (!entry) {
      console.error('未知dispatch参数名')
      return
    }
    entry(this, payload)
  }
  localGetters () {
    for (const [key, item] of Object.entries(this._getters)) {
      console.log(item, key)
      const state = this.state
      Object.defineProperty(this.getters, key, {
        get: function () {
          return item(state)
        }
      })
      console.log(this.getters.doubleCount)
    }
  }
  // getters (type, payload) {
  //   let entry = this._getters[type]
  //   if (!entry) {
  //     console.error('未知dispatch参数名')
  //     return
  //   }
  //   entry(this, payload)
  // }
}

function install (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install }
