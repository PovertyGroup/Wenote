<template lang="pug">
div.setting
    el-card(show="hover" style = "width : 350px; height : 350px" ).avatar-card
      img.avatar(:src="user.avatar" @click="handleAvatarSelect()")
      form(ref="avatar-form" @submit="uploadAvatar()").hidden-form
        input(type="text" name="ref" value="user")
        input(type="text" name="refId" :value="this.id")
        input(type="text" name="field" value="avatar")
        input(type="file" name="files" ref="file-selector")
    el-card(show="hover" style = "width : 350px").info-card
      el-form(label-width="80px")
        el-form-item(label="用户名", prop="user.name")
          el-input(v-model="user.name" @input="")
        el-form-item(label="ID", prop="id")
          el-input(v-model="id" :disabled="true")
        el-form-item(label="个人简介" prop="user.bio")
          el-input(v-model="user.bio" @input="")
        el-form-item(label="性别" prop="user.gender")
          el-select(v-model="user.gender" )
              el-option(label="小哥哥" value="boy")
              el-option(label="小姐姐" value="girl")
              el-option(label="隐藏" value="unknown" style="height: 48px")
    el-button.save(
      type="button",
      @click="saveinfo()",
      style="width: 100px; height: 50px; background: #8fbbfd3a; margin: 50px auto auto 35%"
    ) 保存
</template>

<script>
import axios from 'axios'
import utils from '../util/utils'

export default {
  name: 'SettingCard',
  data () {
    return {
      user: {
        name: '',
        gender: '',
        bio: ''
      },
      id: this.$auth.loggedIn ? this.$auth.user.id : ''
    }
  },
  created () {
    if (this.$auth.loggedIn) {
      this.user.bio = this.$auth.user.bio
      this.user.name = this.$auth.user.username
      this.user.gender = this.$auth.user.gender
      if (this.$auth.user.avatar) { this.user.avatar = utils.composeUrl(this.$store.state.serverUrl, this.$auth.user.avatar.url) } else { this.user.avatar = this.$store.state.defaultAvatar }
    }
  },
  methods: {
    saveinfo () {
      this.uploadAvatar()
      axios.put(utils.composeUrl(this.$store.state.serverUrl, '/users/' + this.$auth.user.id), {
        username: this.user.name,
        bio: this.user.bio,
        gender: this.user.gender
      })
        .then(() => {
          this.$message({
            message: '已保存',
            type: 'success'
          })
          location.reload()
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
      // if(this.$refs['file-selector'].value)
      //   this.$refs['avatar-form'].submit();
    },
    uploadAvatar () {
      const request = new XMLHttpRequest()
      request.open('PUT', '/upload')
      request.setRequestHeader('Authorization', this.$auth.strategy.token.get())
      request.send(new FormData(this.$refs['avatar-form']))
    }
  }
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
  padding: 2px;
  border-radius: 50%;
  vertical-align:middle;
  display: inline-block;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  width: 250px;
  height: 250px;
  margin: auto auto auto 9%
}
.hidden-form{
  visibility: hidden;
}
</style>
