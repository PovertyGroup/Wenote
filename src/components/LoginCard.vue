<template lang="pug">
  div.login-card
    el-form(:model="form" label-width="80px" :rules="rules" ref="ruleForm")
      h3.logintitle Wenote
      el-form-item(label="用户名" prop="username")
        el-input(v-model="form.username" placeholder="用户名或邮箱" @input="notifyCreditChanged()")
      el-form-item(label="密码" prop="password")
        el-input(v-model="form.password" placeholder="密码" :show-password="true" @input="notifyCreditChanged()")
      el-form-item
        el-button.login-button(type="primary" @click="notifySubmit()" :disabled="this.submitEnabled") 登陆
</template>

<script>
export default {
  name: "LoginCard",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'change' }
        ],
      },
      submitEnabled: true,
    }
  },
  events: [
    'onLoginCreditChanged',
    'onSubmit'
  ],
  methods: {
    notifyCreditChanged(){
      let u = this.form.username ? this.form.username : '';
      let p = this.form.password ? this.form.password : '';
      this.submitEnabled = !(u !== '' && p !== '');
      this.$emit('onLoginCreditChanged', u, p);
    },
    notifySubmit(){
      this.$emit('onSubmit');
    }
  },
};
</script>

<style scoped>

.login-button{
  width: 70%;
  margin: 10px 15px auto 25px;
}
.login-card{
  max-width: 400px;
  border-radius: 15px;
  background-clip: border-box;
  margin: 50px auto;
  width: 300px;
  padding: 15px 35px;
  background: rgb(246, 246, 246);
  border: 1px solid  #5c9cfd41;
  box-shadow: 2px 2px 25px #8fbbfd3a;
  width: 100vh;
  max-width: 400px;
}
.logintitle{
  margin: 20px 8px 20px auto;
  text-align: center;
  font-size: 25px;
}


</style>