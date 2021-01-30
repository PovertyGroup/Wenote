<template lang="pug">
.register-card
  el-form(:model="form", label-width="80px", :rules="rules", ref="ruleForm")
    .register-title 加入 Wenote
    el-form-item(label="用户名", prop="username")
      el-input.input(v-model="form.username" placeholder="请输入用户名" @input="notifyUserCreditChanged()")
    el-form-item(label="邮箱", prop="email")
      el-input.input(v-model="form.email" placeholder="请输入邮箱" @input="notifyUserCreditChanged()")
    el-form-item(label="密码", prop="password")
      el-input.input(v-model="form.password" placeholder="请输入密码" :show-password="true" @input="notifyUserCreditChanged()")
    el-form-item(label="确认密码", prop="passwordagain")
      el-input.input(v-model="form.passwordagain" placeholder="请再次输入密码" :show-password="true")
    el-button.register-button(type="primary" :underline = "false" @click="notifySubmit()") 注册
  el-link.login-link(type="primary", :underline="false", href="/login") 已有账号？前往登录
</template>

<script>
export default {
  name: 'RegisterCard',
  data () {
    const validatePassword = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        cb(new Error('两次输入密码不一致!'))
      } else {
        cb()
      }
    }
    return {
      form: {
        username: '',
        email: '',
        password: '',
        passwordagain: ''
      },
      rules: {
        username: [
          { type: 'string', required: true, message: '请输入用户名', trigger: 'change' },
          { type: 'string', message: '格式不正确，只能包含字母和数字，长度为 6-16', pattern: /^[A-Za-z0-9]{6,16}$/ }
        ],
        email: [
          { type: 'string', required: true, message: '请输入邮箱', trigger: 'change' },
          { type: 'string', message: '格式不正确', pattern: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }
        ],
        password: [
          { type: 'string', required: true, message: '请输入密码', trigger: 'change' },
          { type: 'string', required: true, message: '密码长度为 6-16 位', trigger: 'change', pattern: /.{6,16}/ },
          { type: 'string', message: '至少包含一个字母、数字和特殊符号', pattern: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/ }
        ],
        passwordagain: [
          { required: true, message: '请再次输入密码', trigger: 'change' },
          { validator: validatePassword }
        ]
      }
    }
  },
  events: [
    'onUserInfoChanged',
    'onSubmit'
  ],
  methods: {
    notifyUserCreditChanged () {
      const u = this.form.username
      const e = this.form.email
      const p = this.form.password
      const pa = this.form.passwordagain
      this.$emit('onLoginCreditChanged', u, e, p, pa)
    },
    notifySubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) { this.$emit('onSubmit') }
      })
    }
  }
}
</script>

<style scoped>
.register-button{
  max-width: 60%;
  width: 200px;
  margin: 10px 15px auto 25px;
  float: center;
}
.register-card{
  max-width: 400px;
  border-radius: 15px;
  background-clip: border-box;
  margin: auto;
  padding: 35px 35px;
  background: rgb(246, 246, 246);
  border: 1px solid  #5c9cfd41;
  box-shadow: 2px 2px 25px #8fbbfd3a;
  width: 100vh;
}
.register-title{
  margin: 20px 8px 30px 8px;
  text-align: center;
  font-size: 30px;
}
.input {
  max-width: 255px;
  text-align: left;
}

.login-link {
  margin-top: 10px;
}
</style>
