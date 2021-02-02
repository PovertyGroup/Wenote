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
          el-input(v-model="user.name" @input="")
        el-form-item(label="个人简介" prop="user.bio")
          el-input(v-model="user.bio" @input="")
        el-form-item(label="性别" prop="user.gender")
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
import axios from 'axios'
import utils from '../util/utils'

export default {
  name: 'SettingCard',
  components: {
  },
  props: {
  },
  data () {
    return {
      user: {
        name: '',
        gender: '',
        bio: ''
      },
      id: utils.store.info
    }
  },
  created () {
    axios
      .get(utils.composeUrl(this.$store.state.serverUrl, '/users/me'), {
        headers: utils.getAuthorizedHeader()
      })
      .then((res) => {
        this.user.bio = res.data.bio
        this.user.name = res.data.username
        this.user.gender = res.data.gender
        if (res.data.avatar) { this.user.avatar = utils.composeUrl(this.$store.state.serverUrl, res.data.avatar.url) } else { this.user.avatar = this.$store.state.defaultAvatar }
      })
      .catch(() => {
        // TODO
      })
  },
  methods: {
    saveinfo () {
      this.uploadAvatar()
      axios.put(utils.composeUrl(this.$store.state.serverUrl, '/users/' + utils.store.info), {
        username: this.user.name,
        bio: this.user.bio,
        gender: this.user.gender
      }, {
        headers: utils.getAuthorizedHeader()
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
      request.setRequestHeader('Authorization', 'Bearer ' + utils.store.jwt)
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
  cursor: pointer;
}
.hidden-form{
  visibility: hidden;
}
</style>
