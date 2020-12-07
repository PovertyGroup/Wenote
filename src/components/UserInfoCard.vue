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
            el-dropdown-item(icon="el-icon-close" command="logout") 退出登录
  .notLogin(v-else)
    el-link.doc(:underline="false", href="/about") 关于
    el-link.regist(:underline="false", href="/login") 登录
</template>

<script scoped>
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
        if(command=="logout"){
          localStorage.removeItem('jwt')
          localStorage.removeItem('id')
          this.$router.push("/login")
        }
        if(command == "info"){
          this.$router.push(`/info/${Vue.$info.get()}/notes`);
        }
        if(command == "creat-note"){
          // this.$message.error("dnmd把接口给我！")
          Vue.$axios.post(Vue.$composeUrl(Vue.$baseUrl, '/notes'), {"title": "新笔记","content":"# ~~请在这儿输入你的笔记内容~~"}, { headers: Vue.$getAuthorizedHeader() })
          .then((res => {
            this.$message.success('创建新笔记成功')
            setTimeout(() => {
              this.$router.push('/note/' + res.data.id)
            }, 2000);
          }))
          .catch(err => {
            this.$message.error(err.data.message);
            console.log(err.data);
          })
        }
      }
  },
  mounted(){
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, '/users/me'), {
                   headers: Vue.$getAuthorizedHeader(),})
    .then((res) => {
      this.$set(this.user,"name",res.data.username)
      if(res.data.avatar)
        this.$set(this.user,"avatar",Vue.$composeUrl(Vue.$baseUrl,res.data.avatar.url))
      else
        this.$set(this.user,"avatar","https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png") 
    })
    .catch(() => {
      // 失败
    })
  }
};
</script>

<style scoped>
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