<template lang="pug">
div.user-info-card
  .isLogin(v-if="isLogedIn")
    div.userinfo
      p.name {{user.name}}
      el-dropdown(trigger="click" @command="handleCommand")
          span.el-dropdown-link
            img.avatar(:src="user.avatar")
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(icon="el-icon-plus" command="creat-note") 新建笔记
            el-dropdown-item(icon="el-icon-user" command="info") 个人信息
            el-dropdown-item(icon="el-icon-close" command="loginout") 退出登录
  .notLogin(v-else)
    el-link.doc(:underline="false", href="/about") 关于
    el-link.regist(:underline="false", href="/login") 登录
</template>

<script>
import Vue from "vue";
export default {
  data() {
    if (Vue.$jwt.get() != undefined) {
      return {
        user:{
          name: '',
          avatar: '',
        },
        isLogedIn: true,
      };
    } else {
      return {
        isLogedIn: false,
      };
    }
  },
  methods: {
      handleCommand(command) {
        if(command=="loginout"){
          localStorage.removeItem('jwt')
          location.reload()
        }
        if(command=="info"){
          this.$router.push("/info");
        }
        if(command=="creat-note"){
          this.$message.error("dnmd把接口给我！")
        }
      }
  },
  mounted(){
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, '/users/me'),{
      headers: Vue.$getAuthorizedHeader(),
    })
    .then((res) => {
        this.$set(this.user,"name",res.data.username)
        if(res.data.avatar)
          this.$set(this.user,"avatar",Vue.$baseUrl.substring(0,Vue.$baseUrl.length-1)+res.data.avatar.url)
        else
          this.$set(this.user,"avatar","https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png")
         // 成功
    })
    .catch(() => {
         // 失败
    })
    // let userInfo = Vue.$getInfo()
    // console.log(userInfo)
    // this.$set(this.user,"name",userInfo.data.username)
    // this.$set(this.user,"avatar",Vue.$baseUrl.substring(0,Vue.$baseUrl.length-1)+userInfo.data.avatar.url)
  }
};
</script>

<style>
.user-info-card{
  width: fit-content;
}
.regist {
  margin-right: 20px;
  font-size: 17px;
}
.doc {
  margin-right: 20px;
  font-size: 17px;
}

.isLogin{
  width: fit-content;
  margin-right: 0;
}

.userinfo{
  height: 50px;
  width: fit-content;
}

.avatar{
  margin: 5px;
  padding: 2px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  vertical-align:middle;
  display: inline-block;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.dropdown{
  height: 40px;
  display: inline-block;
}

.name{
  margin: 5px;
  font-size: 20px;
  vertical-align:middle;
  display: inline-block;
}
</style>