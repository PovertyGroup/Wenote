<template lang="pug">
el-card.login-card
  el-form(:model="form" label-width="80px" :rules="rules" ref="ruleForm")
    .login-title Wenote
    el-form-item.label(label="用户名", prop="username")
      el-input.input(v-model="form.username" placeholder="用户名或邮箱" @input="notifyCreditChanged()")
    el-form-item.label(label="密码", prop="password")
      el-input.input(v-model="form.password" placeholder="密码" @keyup.enter.native="keydown()" type="submit" :show-password="true" @input="notifyCreditChanged()")
  .login-button
    el-button.login-button(type="primary" :underline="false" @click="notifySubmit()" @keyup.enter.native="keydown()") 登陆
  .register-link
    el-link(type="primary" :underline="false", href="/register") 没有账号？注册一个
</template>

<script>
export default {
  name: 'LoginCard',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  events: ['onLoginCreditChanged', 'onSubmit'],
  methods: {
    notifySubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) { this.$emit('onSubmit') }
      })
    },
    keydown () {
      if (event.keyCode === 13) {
        this.notifySubmit()
      }
    },
    notifyCreditChanged () {
      const u = this.form.username ? this.form.username : ''
      const p = this.form.password ? this.form.password : ''
      this.submitEnabled = !(u !== '' && p !== '')
      this.$emit('onLoginCreditChanged', u, p)
    }
  }
}
</script>

<style scoped>
.login-card {
  padding: 30px 35px;
  width: 400px;
  /* flex: 1; */
}

.login-title {
  margin: 20px 8px 30px 8px;
  text-align: center;
  font-size: 30px;
}

.login-button{
  width: 200px;
  margin: auto;
}

.input {
  max-width: 300px;
  min-width: 200px;
}

.register-link{
  line-height: 50px;
  text-align: center;
}
</style>
