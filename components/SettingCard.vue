<template lang="pug">
el-card(show="hover").settings-card
  .card-content
    el-avatar(:src="avatar" @click.native="handleAvatarSelect").avatar
    form(ref="avatar-form" @submit="uploadAvatar").hidden-form
      input(name="ref" value="user")
      input(name="field" value="avatar")
      input(type="file" name="files" accept="image/png,image/webp,image/jpeg" ref="file-selector")
    el-form(label-width="80px")
      el-form-item(label="用户名", prop="user")
        el-input(v-model="username")
      el-form-item(label="ID", prop="id")
        el-input(v-model="id" :disabled="true")
      el-form-item(label="个人简介" prop="bio")
        el-input(v-model="bio")
      el-form-item(label="性别" prop="gender")
        el-select(v-model="gender")
          el-option(label="小哥哥" value="boy")
          el-option(label="小姐姐" value="girl")
          el-option(label="隐藏" value="unknown" style="height: 48px")
    el-button(type="primary" @click="saveinfo()") 保存
</template>

<script>
import axios from 'axios'
import utils from '../util/utils'

export default {
  name: 'SettingCard',
  data () {
    return {
      bio: '',
      username: '',
      gender: '',
      id: ''
    }
  },
  computed: {
    avatar () {
      if (!this.$auth.user) {
        return this.$store.state.defaultAvatar
      }
      if (this.$auth.user.avatar) {
        return utils.composeUrl(this.$store.state.serverUrl, this.$auth.user.avatar.url)
      } else {
        return this.$store.state.defaultAvatar
      }
    }
  },
  mounted () {
    this.bio = this.$auth.user.bio
    this.username = this.$auth.user.username
    this.gender = this.$auth.user.gender
    this.id = this.$auth.user.id
  },
  methods: {
    saveinfo () {
      if (this.$refs['file-selector'].value !== '') {
        this.uploadAvatar()
      }
      axios.put(utils.composeUrl(this.$store.state.serverUrl, '/users/' + this.$auth.user.id), {
        username: this.username,
        bio: this.bio,
        gender: this.gender
      })
        .then(() => {
          this.$message({
            message: '已保存',
            type: 'success'
          })
          this.$auth.fetchUser()
        })
        .catch(() => {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
        })
    },
    handleAvatarSelect () {
      this.$refs['file-selector'].click()
    },
    uploadAvatar () {
      const fileSelector = this.$refs['file-selector']
      const request = new XMLHttpRequest()
      const auth = this.$auth
      request.open('POST', utils.composeUrl(this.$store.state.serverUrl, '/upload'))
      request.setRequestHeader('Authorization', this.$auth.strategy.token.get())
      const data = new FormData(this.$refs['avatar-form'])
      data.append('source', 'users-permissions')
      data.append('refId', this.id)

      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          fileSelector.value = ''
          auth.fetchUser()
        }
      }

      request.send(data)
    }
  }
}
</script>

<style scoped>
.card-content {
  display: flex;
  flex-direction: column;
}
.card-content > * {
  margin: auto;
}
.avatar {
  cursor: pointer;
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}
.hidden-form{
  display: none;
}
.settings-card{
  margin: auto;
  width: 400px;
}
</style>
