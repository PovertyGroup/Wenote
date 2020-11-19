<template lang="pug">
  div.login-card
    el-form(ref="form", :model="form",)
      el-form-item()
        el-title().title  Wenote
      el-form-item()
        el-input(v-model="form.username"
                 placeholder="用户名或邮箱"
                 @input="notifyCreditChanged()")
      el-form-item()
        el-input(v-model="form.password"
                 placeholder="密码"
                 :show-password="true"
                 @input="notifyCreditChanged()")
      el-form-item(lable="用户名或邮箱")
        el-button.login-button(type="primary"
                               @click="notifySubmit()") 登陆
        
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

.login-card{
  margin :auto;
  padding-top: 20em;
  max-width: 300px;
  min-height: 100%;
}
.login-button{
  width: 40%;
}

.title{
  font-size: 40px;
}

</style>