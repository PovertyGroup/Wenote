<template lang="pug">
div
  .isLogin(v-if="isLogedIn")
    div.userinfo
      p.name {{user.Name}}
      el-avatar.avatar(src='http://172.21.4.9:1337/uploads/20a57fce8b3da61dee8c611699e5a8c8_51df968e15.jpg',shape="square")
      //- img.avatar(src='http://172.21.4.9:1337/uploads/20a57fce8b3da61dee8c611699e5a8c8_51df968e15.jpg')

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
          Name: '',
          Avatar: '',
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
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, '/users/5f92d83ce4c0d97786f5bc73')).then((res) => {
        this.$set(this.user,"Name",res.data.username)
        this.$set(this.user,"Avatar",Vue.$baseUrl.substring(0,Vue.$baseUrl.length-1)+res.data.avatar.url)
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