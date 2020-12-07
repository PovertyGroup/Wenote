<template lang="pug">
div
  img.avatar(:src="avatar")
  div.info
    p(style="padding-bottom:5px; font-size:20px") {{this.username}}
    p() {{this.bio}}
  div.button
    el-button.button(v-if="!this.followed",
                    type="primary",
                    icon="el-icon-plus",
                    size="mini",
                    @click="follow()") 未关注
    el-button.button(v-if="this.followed" 
                    icon="el-icon-check"
                    size="mini" 
                    @click="unfollow()") 已互粉
</template>

<script>
import Vue from "vue";
export default {
  name: "ShowFollowersCard",
  data() {
    return {
      username: "",
      avatar: "",
      bio: "",
      followed: false
    };
  },
  props: {
    frid: String
  },
  created() {
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, "/users/" + this.frid),
                   {headers: Vue.$getAuthorizedHeader()})
    .then((res) => {
      this.username = res.data.username;
      this.bio = res.data.bio;
      if (res.data.avatar)
        this.avatar = Vue.$composeUrl(Vue.$baseUrl, res.data.avatar.url);
      else
        this.avatar ="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      for (var fri = 0; fri<res.data.followers.length; fri++){
        if(res.data.followers[fri] == Vue.$info.get()){
          this.followed = true;
          break
        }
      }
    });
  },
  methods: {
    follow() {
      Vue.$axios.post(Vue.$composeUrl(Vue.$baseUrl, "/users/follow/" + this.frid),{},
                                      {headers: Vue.$getAuthorizedHeader()})
      .then(() => {
        this.$message.success("已成功互粉~");
        this.followed = true;
      })
      .catch((error) => {
        if (error.response.status == 403) 
          this.$message.error("你还没有登陆！");
        else
          this.$message.error("发生了一点错误...请重试!");
      });
    },
    unfollow() {
      Vue.$axios.post(Vue.$composeUrl(Vue.$baseUrl,"/users/unfollow/" + this.frid),{},
                                      {headers: Vue.$getAuthorizedHeader()})
      .then(() => {
        this.$message.info("取消关注对方了呢，哭唧唧~");
        this.followed = false;
      })
      .catch((error) => {
        if (error.response.data.statusCode == 403)
          this.$message.error("您还没有登陆...");
      });
    },
  },
};
</script>

<style scoped>
.avatar {
  margin: 5px;
  padding: 2px;
  border-radius: 50%;
  align-items: center;
  overflow: hidden;
  width:60px;
  height:60px;
  float: left;
}
.info{
  padding: 0 1000px 0 0;
  position: relative;
  margin-left: 20px;
  margin-top: 15px;
  float: left;
}
.button{
  float: right;
  margin: 10px 30px 0px 0px;
}
</style>

