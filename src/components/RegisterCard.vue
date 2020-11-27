<template lang="pug">
.register-card
  el-form(:model="form", label-width="80px", :rules="rules", ref="ruleForm")
    .register-title 加入 Wenote
    el-form-item(label="用户名")
      el-input.input(
        v-model="form.username"
        placeholder="请输入用户名"
        @input="notifyAddUser()"
      )
    el-form-item(label="邮箱")
      el-input.input(
        v-model="form.username"
        placeholder="请输入邮箱"
        @input="notifyAddUser()"
      )
    el-form-item(label="密码")
      el-input.input(
        v-model="form.password"
        placeholder="请输入密码"
        :show-password="true"
        @input="notifyAddUser()"
      )
    el-form-item(label="确认密码")
      el-input.input(
        v-model="form.password"
        placeholder="请再次输入密码"
        :show-password="true"
        @input="notifyAddUser()"
      )
    el-button.register-button(type="primary"
                              :underline = "false"
                              @click="notifySubmit()") 注册
    el-form
      el-link(type="primary", :underline="false", href="/login") 已有账号？前往登录
</template>

<script>
export default {
  name: "Register-Card",
  data() {
    return {
      form: {
        username : "",
        password : ""
      },
      rules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'add' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'add' }
        ],
      },
      submitEnabled: true,
    }
  },
  events :[
    'onRegiste',
    'onSubmit'
  ],
  methods :{
    notifyAddUser(){
      // TODO
    },
    notifySubmit(){
      // TODO
    }
  }
};
</script>

<style>
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
</style>