<template lang="pug">
div
  div.c1
    img.avatar(:src="avatar")
  div.c2
    p {{ this.username }}
    p {{ this.bio }}
  div.c3
    el-button.button(v-if="this.followed" 
                    icon="el-icon-check"
                    size="mini" 
                    @click="unfollow()") 已关注
</template>

<script>
import Vue from "vue";
export default {
  name: "ShowFolloweesCard",
  data() {
    return {
      username: "",
      avatar: "",
      bio: "",
      followed: true
    };
  },
  props: {
    feid: String
  },
  created() {
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, "/users/" + this.feid),
                   {headers: Vue.$getAuthorizedHeader()})
    .then((res) => {
      console.log(this.feid)
      this.username = res.data.username;
      this.bio = res.data.bio;
      if (res.data.avatar)
        this.avatar = Vue.$composeUrl(Vue.$baseUrl, res.data.avatar.url);
      else
        this.avatar ="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      for (var fei = 0; fei<res.data.followees.length; fei++){
        if(res.data.followes[fei] == this.feid)
          this.followed = true;
      } 
    });
  },
  methods: {
    unfollow() {
      Vue.$axios.post(Vue.$composeUrl(Vue.$baseUrl,"/users/unfollow/" + this.feid),{},
                                      {headers: Vue.$getAuthorizedHeader()})
      .then(() => {
        this.$message.warning("取消关注对方了呢，哭唧唧~,你还会再来的对吧？");
        this.followed = false;
      })
      .catch((error) => {
        if (error.response.data.statusCode == 403)
          this.$message.error("您还没有登陆...");
      });
      location.reload()
    },
  },
};
</script>

<style scoped>
.avatar {
  margin: 5px;
  padding: 2px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  vertical-align: middle;
  display: inline-block;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width:60px;
  height:60px
}
</style>

