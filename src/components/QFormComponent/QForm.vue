<template>
	<div>
		<slot></slot>
	</div>
</template>

<script>
export default {
  // 跨级传值
  provide () {
    return {
      // 将表单数据传递给后代
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object
  },
  data () {
    return {
      error: 'error'
    }
  },
  methods: {
    validate (cb) {
      let validateArr = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validate())
      Promise.all(validateArr)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
  }
}
</script>
