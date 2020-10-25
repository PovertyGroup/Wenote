<template lang="pug">
  div.login-card
    el-form(ref="form", :model="form", label-width="80px")
      el-form-item
        el-input(v-model="form.username" placeholder="用户名或邮箱" @input="emitUsername")
      el-form-item
        el-input(v-model="form.password" placeholder="密码" :show-password="true" @input="emitPassword")
      el-form-item
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
  props: {
    'username': String,
    'password': String,
  },
  methods: {
    emitUsername(){
      this.$emit('update:username', this.form.username);
    },
    emitPassword(){
      this.$emit('update:password', this.form.password);
    }
  },
  events: []
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