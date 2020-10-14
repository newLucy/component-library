import Vue from 'vue'

// 动态生成组件实例，并挂载到body上
// component: 组件配置对象
// props: 组件属性
export function create (component, props) {
  // 方法一：使用render
  // const vm = new Vue({
  //   render (h) {
  //     // 返回一个虚拟dom
  //     return h(component, {props})
  //   }
  // })

  // vm.$mount()

  // document.body.appendChild(vm.$el)

  // // 返回组件实例
  // let comp = vm.$children[0]

  // // 销毁实例方法
  // comp.remove = () => {
  //   document.body.removeChild(vm.$el)
  //   comp.$destroy()
  // }

  // return comp

  // 方法二：使用extend
  component.$props = props
  let Profile = Vue.extend(component)
  let vm = new Profile()
  vm.$mount()
  document.body.appendChild(vm.$el)

  // 销毁实例方法
  vm.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
}
