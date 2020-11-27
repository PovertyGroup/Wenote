<template lang="pug">
.register-card
  el-form(:model="form", label-width="80px", :rules="rules", ref="ruleForm")
    .register-title 加入 Wenote
    el-form-item(label="用户名", prop="username")
      el-input.input(
        v-model="form.username"
        placeholder="请输入用户名"
        @input="notifyAddUser()"
        @blur="checkUsername(form.username)"
      )
    el-form-item(label="邮箱", prop="email")
      el-input.input(
        v-model="form.email"
        placeholder="请输入邮箱"
        @input="notifyAddUser()"
        @blur="checkEmail"
      )
    el-form-item(label="密码", prop="password")
      el-input.input(
        v-model="form.password"
        placeholder="请输入密码"
        :show-password="true"
        @input="notifyAddUser()"
        @blur="checkPassword"
      )
    el-form-item(label="确认密码", prop="passwordagain")
      el-input.input(
        v-model="form.passwordagain"
        placeholder="请再次输入密码"
        :show-password="true"
        @input="notifyAddUser()"
        @blur="doubleCheckPassword"
      )
    el-button.register-button(type="primary"
                              :underline = "false"
                              @click="notifySubmit()") 注册
    el-form
      el-link(type="primary", :underline="false", href="/login") 已有账号？前往登录
</template>

<script>
export default {
  name: "RegisterCard",
  data() {
    return {
      form: {
        username : "",
        email: "",
        password : "",
        passwordagain : "",
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
            { required: true, message: '请输入密码', trigger: 'change' },
            { type: 'string', message: '至少包含一个字母、数字和特殊符号，长度为 6-16位', pattern: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/}
        ],
        passwordagain: [
            { required: true, message: '请再次输入密码', trigger: 'change' },
            { validator(rule, value, cb, source, ) {
                if(value !== source.form.password)
                  return [new Error(
                    "两次输入的密码不一致"
                  )]
                cb()
              },
            }
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
      let u = this.form.username ? this.form.username : "";
      let e = this.form.email ? this.form.email : "";
      let p = this.form.password ? this.form.password : "";
      let pa = this.form.passwordagain ? this.form.passwordagain : "";
      this.submitEnabled = !(u !== "" && e !== ""&& p !== ""&& pa !== "");
      this.$emit("onLoginCreditChanged", u,e,p,pa);
    },
    notifySubmit(){
      // TODO
    },
    checkUsername(id){
      var reg = /^[A-Za-z0-9]{6,16}$/;
      if(!reg.test(id)){
        this.$notify({
            message: '用户名格式不正确：只能包含英文和数字,长度6~16',
            type: 'error'
          })
        this.form.username = '';
      }
    },
    checkEmail() {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (this.form.email != '' && !regEmail.test(this.form.email)) {
          this.$notify({
            message: '邮箱格式不正确',
            type: 'error'
          })
          this.form.email = ''
        }
    },
    checkPassword(){
      var check = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
      if (this.form.password != '' && !check.test(this.form.password)){
        this.$notify({
            message: '密码不符合要求：必须包含 字母、数字、特殊符号',
            type: 'error'
          })
        this.form.password = '';
      }
    },
    doubleCheckPassword(){
      if(this.form.password != this.form.passwordagain){
        this.$notify({
            message: '两次输入的密码不一样!',
            type: 'error'
          })
        this.form.passwordagain = '';
      }
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