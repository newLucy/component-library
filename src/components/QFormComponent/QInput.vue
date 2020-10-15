<template>
    <div>
      <!--
        v-bind="$attrs" 展开父组件传入的属性到此元素上
        注意!!! class和style不会被归纳到$attrs里面去
        -->
        <input type="text" :value="value" @input="onInput" v-bind="$attrs">
    </div>
</template>
<script>
import emitter from '@/mixins/emitter.js'
export default {
  componentName: 'QInput',
  inheritAttrs: false, // 根节点默认会继承父组件中传入的属性，false表示不继承父组件的属性
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    console.log(this)
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
      this.dispatch('QFormItem', 'validate')
    }
  }
}
</script>
