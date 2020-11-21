<template lang="pug">
  div.login-card
    el-form(ref="form", :model="form", class="logincard")
      <h3 class="logintitle"> WeNote登录 </h3>
      el-form-item(label="用户名")
        el-input(v-model="form.username" placeholder="用户名或邮箱" @input="notifyCreditChanged()")
      el-form-item(label="密码")
        el-input(v-model="form.password" placeholder="密码" :show-password="true" @input="notifyCreditChanged()")
      el-form-item(lable="用户名或邮箱")
        el-button.login-button(type="primary" @click="notifySubmit()") 登陆
</template>

<script>
export default {
  name: "LoginCard",
  data() {
    return {
      form: {
        username: this.username,
        password: this.password,
      }
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
  width: 35%;
}
.login-card{
    max-width: 400px;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 50px auto;
    width: 300px;
    padding: 15px 35px;
    background: rgb(248, 249, 250);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #c6c6c6;
}
.logintitle{
  margin: 10px 8px 20px auto;
  text-align: center;
  color: #505050;
}
.remember{
  margin: 0px 0px 15px;
  text-align: left;
}

</style>