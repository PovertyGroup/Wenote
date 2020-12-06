<template lang="pug">
div.setting
    el-card(show="hover" style = "width : 350px").avatar-card
      img.avatar(:src="user.avatar", style="width: 250px; height: 250px")
    el-card(show="hover" style = "width : 350px").info-card
      el-form(:model="form", label-width="80px", :rules="rules", ref="ruleForm")
        el-form-item(label="用户名", prop="user.name")
          el-input(v-model="user.name", placeholder="用户名或邮箱", @input="")
        el-form-item(label="邮箱", prop="user.mail")
          el-input(v-model="user.email", @input="")
        el-form-item(label="性别", prop="user.gender")
          el-select(v-model="user.gender")
            el-option(label="小哥哥" value="boy")
            el-option(label="小姐姐" value="girl")
            el-option(label="隐藏" value="unkown")
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
        this.user.name = res.data.username
        this.user.gender = res.data.gender
        this.user.email = res.data.email
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
      });
  },
  methods:{
    saveinfo(){
      console.log("dsadasd")
      Vue.$axios.put(Vue.$composeUrl(Vue.$baseUrl,"/users/"+Vue.$info.get()),{
        "username" : this.user.name,
        "email" : this.user.email,
        "gender" : this.user.gender
      },{
        headers: Vue.$getAuthorizedHeader(),
      })
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
        email: "",
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
</style>
