<template lang="pug">
div.setting
    el-card(show="hover" style = "width : 350px").avatar-card
      img.avatar(:src="user.avatar", style="width: 250px; height: 250px")
    el-card(show="hover" style = "width : 350px").info-card
      el-form(:model="form", label-width="80px" :rules="rules" ref="ruleForm")
        el-form-item(label="用户名", prop="user.name")
          el-input(v-model="user.name" @input="")
        el-form-item(label="个人简介" prop="user.bio")
          el-input(v-model="user.bio" @input="")
        el-form-item(label="性别" prop="user.gender")
          el-select(v-model="user.gender")
            el-option(label="boy" value="boy")
            el-option(label="girl" value="girl")
            el-option(label="unkown" value="unkown")
    el-button.save(
      type="button",
      @click="saveinfo()",
      style="width: 100px; height: 50px; background: #8fbbfd3a"
    ) 保存
</template>


<script>
import Vue from "vue";
export default {
  name: "SettingCard",
  components :{
  },
  created() {
    Vue.$axios
      .get(Vue.$composeUrl(Vue.$baseUrl, "/users/me"), {
        headers: Vue.$getAuthorizedHeader(),
      })
      .then((res) => {
        this.bio = res.data.bio
        this.user.name = res.data.username
        this.user.gender = res.data.gender
        if (res.data.avatar)
          this.user.avatar = Vue.$composeUrl(Vue.$baseUrl, res.data.avatar.url);
        else
          this.user.avatar ="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      })
      .catch(() => {
      });
  },
  methods:{
    saveinfo(){
      Vue.$axios.put(Vue.$composeUrl(Vue.$baseUrl,"/users/"+Vue.$info.get()),
                     {
                      "username" : this.user.name,
                      "bio" : this.user.bio,
                      "gender" : this.user.gender
                     },
                     {headers: Vue.$getAuthorizedHeader()})
      .then(() =>{
        this.$message({
          message: "已保存",
          type: "success"
        });
        location.reload()
      })
      .catch(() =>{
        this.$message({
          message: "保存失败",
          type: "error"
        });
      })
    }
  },
  props :{
  },
  data() {
    return {
      user: {
        name: "",
        gender: "",
        bio: "",
      },
    };
  },
}
</script>

<style scoped>
.setting{
  margin: auto;
}
.save {
  margin-top: 100px;
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
</style>
