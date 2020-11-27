<template lang="pug">
.login-card
  el-form(:model="form" 
          label-width="80px" 
          :rules="rules" ref="ruleForm")
    .logintitle Wenote
    el-form-item(label="用户名" prop="username")
      el-input(v-model="form.username" 
               placeholder="用户名或邮箱" 
               @input="notifyCreditChanged()")
    el-form-item(label="密码" prop="password")
      el-input(v-model="form.password" 
               placeholder="密码" 
               @keyup.enter.native="keydown()"
               type = "submit"
               :show-password="true"
               @input="notifyCreditChanged()")
    el-button.login-button(type="primary" 
                           :underline="false" 
                           @click="notifySubmit()"
                           @keyup.enter.native="keydown()"
                           :disabled="this.submitEnabled"
                           ) 登陆
    el-form
    el-link(type = "primary"
            :underline="false"  
            href = "/register") 没有账号？注册一个
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
    notifySubmit(){
      this.$emit('onSubmit');
    },
    keydown() {
      if (event.keyCode === 13) {
        this.notifySubmit();
      }
    },
    notifyCreditChanged(){
      let u = this.form.username ? this.form.username : '';
      let p = this.form.password ? this.form.password : '';
      this.submitEnabled = !(u !== '' && p !== '');
      this.$emit('onLoginCreditChanged', u, p);
    },
  },
};
</script>

<style scoped>
.logintitle{
  margin: 20px 8px 20px 8px;
  text-align: center;
  font-size: 27px;
}
.login-card{
  max-width: 380px;
  border-radius: 15px;
  background-clip: border-box;
  margin: 50px auto;
  padding: 40px 35px;
  background: rgb(246, 246, 246);
  border: 1px solid  #5c9cfd41;
  box-shadow: 2px 2px 25px #8fbbfd3a;
  width: 100vh;
  max-width: 400px;
  text-align: left;
}
.login-button{
  width: 60%;
  margin: 10px 15px auto 25px;
}
.input{
  max-width: 285px;
}
</style>