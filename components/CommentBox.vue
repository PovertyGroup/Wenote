<template lang="pug">
el-card(shadow="never")
    h3(style="margin-top: 0") 发表评论
    el-input(type="textarea" :autosize="{ minRows: 5, maxRows: 7}" v-model="commentContent" maxlength="500" show-word-limit placeholder="说点儿什么吧")
    .logged-in-user-info(v-if="this.$auth.loggedIn")
      el-avatar(:src="userAvatar" size="small")
      span {{ this.$auth.loggedIn ? this.$auth.user.username : '' }}
    el-button.submit-button(type="primary" size="small" :disabled="commentContent.length < 15" :loading="isSubmiting" @click="submitComment") 发表
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
      isSubmiting: false
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

.logged-in-user-info{
  line-height: 28px;
  font-family: sans-serif;
  margin: 10px;
  float: left;
}

.logged-in-user-info > *{
  vertical-align: middle;
  margin-right: 10px;
}

.submit-button{
  margin-top: 10px;
  float: right;
  margin-bottom: 20px;
  width: 150px;
}

@media screen and (max-width: 420px) {
  .submit-button{
    width: 100px;
  }
}
</style>
