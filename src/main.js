// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './QRouter/index'
import store from './components/QStore/index'
import Notice from './utils/create-notice.js'

Vue.use(Notice)
Vue.config.productionTip = false
// Vue.prototype.$create = create

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
