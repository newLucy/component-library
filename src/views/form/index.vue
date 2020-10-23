<template>
  <div>
   <q-form :model="model" :rules="rules" ref="q-form">
      <q-form-item label="姓名" prop="userName">
        <q-input v-model="model.userName" placeholder="请输入姓名"></q-input>
      </q-form-item>
      <q-form-item label="密码" prop="password">
        <q-input v-model="model.password" placeholder="请输入密码" type="password"></q-input>
      </q-form-item>
      <q-form-item>
        <button @click="onLogin">登录</button>
      </q-form-item>
   </q-form>
  </div>
</template>

<script>
import QForm from '@/components/QFormComponent/QForm'
import QFormItem from '@/components/QFormComponent/QFormItem'
import QInput from '@/components/QFormComponent/QInput'
export default {
  components: {
    QForm,
    QFormItem,
    QInput
  },
  data () {
    return {
      model: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{required: true, message: '用户名不能为空！', trigger: 'change'}],
        password: [{required: true, message: '密码不能为空！', trigger: 'change'}]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs['q-form'].validate((valid) => {
        if (valid) {
          this.$notice({
            title: '成功',
            message: '提交成功！'
          })
        } else {
          this.$notice({
            title: '警告',
            message: '表单验证不通过！'
          })
        }
      })
    }
  }
}
</script>
