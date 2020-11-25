<template lang="pug">
.login-card
  el-form(ref="form", :model="form")
    h3.logintitle Wenote
    el-form-item(label="用户名")
      el-input(
        v-model="form.username",
        placeholder="请输入用户名",
        @input="notifyCreditChanged()"
      )
    el-form-item(label="邮箱")
      el-input(
        v-model="form.username",
        placeholder="请输入邮箱",
        @input="notifyCreditChanged()"
      )
    el-form-item(label="密码")
      el-input(
        v-model="form.password",
        placeholder="请输入密码",
        :show-password="true",
        @input="notifyCreditChanged()"
      )
    el-form-item(label="再次输入密码")
      el-input(
        v-model="form.password",
        placeholder="请再次输入密码",
        :show-password="true",
        @input="notifyCreditChanged()"
      )
    el-button.login-button(type="primary", @click="notifySubmit()") 注册
</template>