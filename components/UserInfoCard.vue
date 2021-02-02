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
    ul.action
      li.action-item
        el-link.doc(:underline="false", href="/about") 关于
      li.action-item
        el-link.regist(:underline="false", href="/login") 登录
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
      isLogedIn: false
    }
  },
  mounted () {
    this.updateLoginStatus()
    axios.get(utils.composeUrl(this.$store.state.serverUrl, '/users/me'), { headers: utils.getAuthorizedHeader() })
      .then((res) => {
        this.$set(this.user, 'name', res.data.username)
        if (res.data.avatar) { this.$set(this.user, 'avatar', utils.composeUrl(this.$store.state.serverUrl, res.data.avatar.url)) } else { this.$set(this.user, 'avatar', 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png') }
      })
      .catch(() => {
      // 失败
      })
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        localStorage.removeItem('jwt')
        localStorage.removeItem('id')
        this.$router.push('/login')
      }
      if (command === 'info') {
        this.$router.push(`/info/${utils.store.info}/notes`)
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
            console.log(err.data)
          })
      }
    },
    updateLoginStatus () {
      if (utils.store.jwt) {
        this.isLogedIn = true
      }
    }
  }
}
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
  padding: 2px 2px 5px 2px;
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
}

</style>
