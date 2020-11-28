<template lang="pug">
div
  .isLogin(v-if="isLogedIn")
    div.userinfo
      p.name {{user.name}}
      img.avatar(:src="user.avatar")

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
  mounted(){
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, '/users/me'),{
      headers: Vue.$getAuthorizedHeader(),
    })
    .then((res) => {
        this.$set(this.user,"name",res.data.username)
        this.$set(this.user,"avatar",Vue.$baseUrl.substring(0,Vue.$baseUrl.length-1)+res.data.avatar.url)
        console.log(this.user.Avatar);
         // 成功
    })
    .catch(() => {
         // 失败
    })
  }
};
</script>

<style>
.regist {
  margin-right: 20px;
  font-size: 17px;
}
.doc {
  margin-right: 20px;
  font-size: 17px;
}
.userinfo{
  height: 50px;
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
.name{
  margin: 5px;
  font-size: 20px;
  vertical-align:middle;
  display: inline-block;
}
</style>