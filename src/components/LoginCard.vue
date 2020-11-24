<template lang="pug">
  div.login-card
    el-form(ref="form" :model="form")
      h3.logintitle Wenote
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
}
.logintitle{
  margin: 20px 8px 20px auto;
  text-align: center;
  font-size: 25px;
}


</style>