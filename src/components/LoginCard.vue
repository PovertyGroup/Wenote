<template lang="pug">
  div.login-card
    el-form(ref="form", :model="form", label-width="80px")
      el-form-item(label="用户名")
        el-input(v-model="form.username" placeholder="用户名或邮箱" @input="notifyCreditChanged()")
      el-form-item(label="密码")
        el-input(v-model="form.password" placeholder="密码" :show-password="true" @input="notifyCreditChanged()")
      el-form-item(lable="用户名或邮箱")
        el-button.login-button(type="primary" @click="this.$emit('onSubmit')") 登陆
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
    }
  },
};
</script>

<style scoped>
.login-card{
  max-width: 400px;
}
.login-button{
  width: 100%;
}
</style>