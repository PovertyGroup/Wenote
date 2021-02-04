<template lang="pug">
div.user-info-card
  .logged-in(v-if="isLogedIn")
    div.userinfo
      p.name {{user.name}}
      el-dropdown(trigger="click" @command="handleCommand")
          span.el-dropdown-link
            img.avatar(:src="user.avatar")
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(icon="el-icon-plus" command="creat-note") 新建笔记
            el-dropdown-item(icon="el-icon-user" command="info") 个人信息
            el-dropdown-item(icon="el-icon-close" command="logout") 退出登录
  .not-logged-in(v-else)
    ul.action
      li.action-item.login
        el-link(:underline="false", href="/login") 登录
      li.action-item.register
        el-link(:underline="false", href="/register") 注册
</template>

<script scoped>
import axios from 'axios'
import utils from '../util/utils'

export default {
  data () {
    return {
      user: {
        name: '',
        avatar: ''
      },
      isLogedIn: this.$auth.loggedIn
    }
  },
  mounted () {
    if (this.$auth.loggedIn) {
      this.$set(this.user, 'name', this.$auth.user.username)
      if (this.$auth.user.avatar) { this.$set(this.user, 'avatar', utils.composeUrl(this.$store.state.serverUrl, this.$auth.user.avatar.url)) } else { this.$set(this.user, 'avatar', 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png') }
    }
    // axios.get(utils.composeUrl(this.$store.state.serverUrl, '/users/me'), { headers: utils.getAuthorizedHeader() })
    //   .then((res) => {
    //     this.$set(this.user, 'name', res.data.username)
    //     if (res.data.avatar) { this.$set(this.user, 'avatar', utils.composeUrl(this.$store.state.serverUrl, res.data.avatar.url)) } else { this.$set(this.user, 'avatar', 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png') }
    //   })
    //   .catch(() => {
    //   // 失败
    //   })
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        this.$auth.logout()
        this.$router.push('/home')
      }
      if (command === 'info') {
        this.$router.push(`/info/${this.$auth.user.id}/notes`)
      }
      if (command === 'creat-note') {
        // this.$message.error("dnmd把接口给我！")
        axios.post(utils.composeUrl(this.$store.state.serverUrl, '/notes'), { title: '新笔记', content: '# ~~请在这儿输入你的笔记内容~~' }, { headers: utils.getAuthorizedHeader() })
          .then((res) => {
            this.$message.success('创建新笔记成功')
            setTimeout(() => {
              this.$router.push('/note/' + res.data.id)
            }, 100)
          })
          .catch((err) => {
            this.$message.error(err.data.message)
            // console.log(err.data)
            throw err
          })
      }
    }
  }
}
</script>

<style scoped>

.userinfo{
  height: 60px;
}

.action {
  padding: 0;
}

.avatar{
  margin: auto 30px auto 10px;
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
  margin: 0 5px 0 10px;
  padding-bottom: 5px;
  font-size: 20px;
  vertical-align:middle;
  display: inline-block;
}

.action-item {
  float: left;
  list-style: none;
  position: relative;
  margin: 0;
  margin-right: 20px;
  font-size: 17px;
}

@media screen and (max-width: 610px) {
  .register{
    display: none;
  }
  .action-item{
    margin-right: 10px;
  }
}

</style>
