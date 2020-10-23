<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot name="default"></slot>
    <div v-if="error" class="error">{{error}}</div>
  </div>
</template>

<script>
import Schema from 'async-validator'
import emitter from '@/mixins/emitter'
export default {
  componentName: 'QFormItem',
  inject: ['form'],
  mixins: [emitter],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: String
  },
  data () {
    return {
      error: ''
    }
  },
  mounted () {
    this.dispatch('QForm', 'form-item-add', this)
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate () {
      return new Promise((resolve, reject) => {
        const rules = this.form.rules[this.prop]
        const value = this.form.model[this.prop]

        const validator = new Schema({[this.prop]: rules})
        validator.validate({[this.prop]: value}, (errors) => {
          if (errors) {
            this.error = errors[0].message
            reject(new Error())
          } else {
            this.error = ''
            resolve()
          }
        })
      })
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
    font-size: 12px;
  }
</style>
