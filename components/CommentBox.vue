<template lang="pug">
el-card(shadow="never")
    h3(style="margin-top: 0") 发表评论
    .logged-in(v-if="userLoggedIn")
      el-input(type="textarea" :autosize="{ minRows: 5, maxRows: 7}" v-model="commentContent" maxlength="500" show-word-limit placeholder="说点儿什么吧")
      .user-info
        el-avatar(:src="userAvatar" size="small")
        span {{ userLoggedIn ? this.$auth.user.username : '' }}
      el-button.submit-button(type="primary" size="small" :disabled="commentContent.length < 15" :loading="isSubmiting" @click="submitComment") 发表
    .not-logged-in(v-else)
      span 登录后才能发表评论。
      NuxtLink.nuxtlink(to="/login") 前去登陆
</template>

<script>
import axios from 'axios'
import utils from '../util/utils'

export default {
  name: 'CommentBox',
  props: {
    noteId: {
      type: String,
      required: true
    }
  },
  events: [
    'onSubmit'
  ],
  data () {
    return {
      commentContent: '',
      isSubmiting: false,
      userLoggedIn: false // always assume user is not logged in
    }
  },
  computed: {
    userAvatar () {
      if (this.$auth.loggedIn) {
        return utils.composeUrl(this.$store.state.serverUrl, this.$auth.user.avatar.url)
      }
      return ''
    }
  },
  mounted () {
    this.userLoggedIn = this.$auth.loggedIn
  },
  methods: {
    submitComment () {
      if (!this.$auth.loggedIn) {
        this.$message.error('您还没有登陆')
      } else {
        this.isSubmiting = true
        axios.post(utils.composeUrl(this.$store.state.serverUrl, '/comments/note:' + this.noteId), { content: this.commentContent })
          .then(() => {
            this.$emit('onSubmit')
            this.$message({
              message: '发表成功',
              type: 'success'
            })
          })
          .catch(() => {
            this.$message.error('发表失败')
          })
          .finally(() => {
            this.isSubmiting = false
          })
      }
    }
  }
}
</script>

<style scoped>
.el-card {
  border: none;
  border-bottom: 1px solid #EBEEF5;
}

.user-info{
  line-height: 28px;
  font-family: sans-serif;
  margin: 10px;
  float: left;
}

.user-info > *{
  vertical-align: middle;
  margin-right: 10px;
}

.submit-button{
  margin-top: 10px;
  float: right;
  margin-bottom: 20px;
  width: 150px;
}

.not-logged-in {
  font-size: 14px;
  font-family: sans-serif;
  padding: 20px 0;
  text-align: center;
}

.not-logged-in > * {
  vertical-align: middle;
}

@media screen and (max-width: 420px) {
  .submit-button{
    width: 100px;
  }
}
</style>
