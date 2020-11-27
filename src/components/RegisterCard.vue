<template lang="pug">
.register-card
  el-form(:model="form", label-width="80px", :rules="rules", ref="ruleForm")
    .register-title Wenote
    el-form-item(label="用户名")
      el-input(
        v-model="form.username"
        placeholder="请输入用户名"
        @input="notifyAddUser()"
      )
    el-form-item(label="邮箱")
      el-input(
        v-model="form.username"
        placeholder="请输入邮箱"
        @input="notifyAddUser()"
      )
    el-form-item(label="密码")
      el-input(
        v-model="form.password"
        placeholder="请输入密码"
        :show-password="true"
        @input="notifyAddUser()"
      )
    el-form-item(label="确认密码")
      el-input(
        v-model="form.password"
        placeholder="请再次输入密码"
        :show-password="true"
        @input="notifyAddUser()"
      )
    el-button.register-button(type="primary"
                              :underline = "false" 
                              @click="notifySubmit()") 注册
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
  max-width: 100%;
  width: 200px;
  margin: auto;
  float: center;
}
.register-card{
  max-width: 380px;
  border-radius: 15px;
  background-clip: border-box;
  margin: auto;
  padding: 35px 35px;
  background: rgb(246, 246, 246);
  border: 1px solid  #5c9cfd41;
  box-shadow: 2px 2px 25px #8fbbfd3a;
  width: 80vh;
}
.register-title{
  margin: 20px 8px 20px auto;
  text-align: center;
  font-size: 30px;
}
</style>