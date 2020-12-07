<template lang="pug">
div.setting
    el-card(show="hover" style = "width : 350px").avatar-card
      img.avatar(:src="user.avatar", style="width: 250px; height: 250px" @click="handleAvatarSelect()")
      form(ref="avatar-form" @submit="uploadAvatar()").hidden-form
        input(type="text" name="ref" value="user")
        input(type="text" name="refId" :value="this.id")
        input(type="text" name="field" value="avatar")
        input(type="file" name="files" ref="file-selector")
    el-card(show="hover" style = "width : 350px" :model="form").info-card
      el-form(label-width="80px")
        el-form-item(label="用户名", prop="user.name")
          el-input(v-model="user.name", placeholder="用户名或邮箱", @input="")
        el-form-item(label="邮箱", prop="user.mail")
          el-input(v-model="user.email", @input="")
        el-form-item(label="性别", prop="user.gender")
          el-select(v-model="user.gender")
            el-option(label="小哥哥" value="boy")
            el-option(label="小姐姐" value="girl")
            el-option(label="隐藏" value="unknown")
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
        // TODO
      });
  },
  methods:{
    saveinfo(){
      console.log('submit')
      this.uploadAvatar();
      console.log('submit end')
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
        // location.reload()
      })
      .catch(() =>{
        this.$message({
          message: "保存失败",
          type: "error"
        });
      })
    },
    handleAvatarSelect(){
      this.$refs['file-selector'].click();
      // if(this.$refs['file-selector'].value)
      //   this.$refs['avatar-form'].submit();
    },
    uploadAvatar() {
      const request = new XMLHttpRequest();
      request.open('POST', '/upload');
      request.setRequestHeader('Authorization', 'Bearer ' + Vue.$jwt.get());
      console.log("submitting...");
      request.send(new FormData(this.$refs['avatar-form']));
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
      id: Vue.$info.get(),
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
  cursor: pointer;
}
.hidden-form{
  visibility: hidden;
}
</style>
