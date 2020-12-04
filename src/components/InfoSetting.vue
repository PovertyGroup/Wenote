<template lang="pug">
.setting
  el-border()
    el-card(show="hover" style = "width : 350px").avatar-card
      img.avatar(:src="user.avatar", style="width: 250px; height: 250px")
    el-card(show="hover" style = "width : 350px").info-card
      el-form(:model="form", label-width="80px", :rules="rules", ref="ruleForm")
        el-form-item(label="用户名", prop="user.name")
          el-input(v-model="user.name", placeholder="用户名或邮箱", @input="")
        el-form-item(label="邮箱", prop="user.mail")
          el-input(v-model="user.email", @input="")
        el-form-item(label="性别", prop="user.gender")
          el-input(v-model="user.gender", @input="")
  el-button.save(
    type="button",
    @click="",
    style="width: 100px; height: 50px; background: #8fbbfd3a"
  ) 保存
</template>


<script>
import Vue from "vue";
export default {
  name: "InfoSetting",
  components :{
  },
  created() {
    Vue.$axios
      .get(Vue.$composeUrl(Vue.$baseUrl, "/users/me"), {
        headers: Vue.$getAuthorizedHeader(),
      })
      .then((res) => {
        this.$set(this.user, "name", res.data.username);
        this.$set(this.user, "gender", res.data.gender);
        this.$set(this.user, "followees", res.data.followees);
        this.$set(this.user, "followers", res.data.followers);
        this.$set(this.user, "email", res.data.email);
        this.$set(this.user, "likes", res.data.likes);
        this.$set(this.user, "notes", res.data.notes);
        if (res.data.avatar)
          this.$set(
            this.user,
            "avatar",
            Vue.$baseUrl.substring(0, Vue.$baseUrl.length - 1) +
              res.data.avatar.url
          );
        else
          this.$set(
            this.user,
            "avatar",
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          );
      })
      .catch(() => {
        // 失败
      });
  },
  props :{
    noteTitle:String
  },
  data() {
    return {
      user: {
        name: "",
        avatar: "",
        followees: "",
        followers: "",
        gender: "",
        likes: "",
        notes: "",
        stard_notes: "",
        email: "",
        noteTitle: "",
      },
    };
  },
}
</script>

<style>
.setting{
  margin: auto;
}
.save {
  margin-top: 100px;
}
.avatar-card{
  bottom: 0;
}
</style>
