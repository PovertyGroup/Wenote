<template lang="pug">
.comment(@mouseenter="() => deleteBtnVisible=true" @mouseleave="() => deleteBtnVisible=false")
  el-avatar(:src="avatarUrl" :size="36")
  .comment-content
    .author-info-wrap
      b.author-name {{ this.author.username }}
      span(style="margin: 0 3px") ·
      span {{ commentDate }}
      a.delete-btn(:class="deleteBtnVisible ? 'show' : ''" @click="deleteComment" v-if="!isDeleted && this.$auth.loggedIn && author.id === this.$auth.user.id")
        i.fas.fa-trash-alt
        span(style="padding: 0 10px;") 删除
    div(v-if="!isDeleted") {{ content }}
    i(v-else).deleted-tips 已删除
</template>

<script>
import { format } from 'timeago.js'
import axios from 'axios'
import utils from '../util/utils'

export default {
  name: 'Comment',
  props: {
    noteId: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      required: true
    },
    author: {
      type: Object,
      required: true
    },
    isDeleted: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      deleteBtnVisible: false
    }
  },
  computed: {
    avatarUrl () {
      return utils.composeUrl(this.$store.state.serverUrl, this.author.avatar.url)
    },
    commentDate () {
      return format(Date.parse(this.date), 'zh_CN')
    }
  },
  events: [
    'onDelete'
  ],
  methods: {
    deleteComment () {
      this.$confirm('确认删除该评论?', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete(utils.composeUrl(this.$store.state.serverUrl, `/comments/note:${this.noteId}/${this.id}`))
          .then((res) => {
            if (res.data.deleted) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.$emit('onDelete')
            } else {
              this.$message({
                type: 'error',
                message: '删除失败'
              })
            }
          })
          .catch((res) => {
            if (res.status === 403) {
              this.$message({
                type: 'error',
                message: '请先登录'
              })
            }
          })
      })
    },
    thumbUp () {

    }
  }
}
</script>

<style scoped>
.comment{
  padding: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  border-bottom: 1px solid #eee;
}

.comment{
  display: flex;
  align-content: flex-end;
}

.comment > * {
  margin: 0 5px;
}

.comment:first-child {
  margin: 0;
}

.comment-content {
  padding-left: 10px;
  width: calc(100% - 15px - 36px);
}

.author-info-wrap {
  font-size: 13px;
  color: #979797;
}

.author-name{
  color: #242424;
  font-family: sans-serif;
  font-size: 15px;
}

.el-avatar{
  margin: 0 0 auto 0;
}

.delete-btn.show{
  opacity: 1;
}

.delete-btn {
  opacity: 0;
  color: #ff5f5f;
  float: right;
  cursor: pointer;
  transition: 0.3s;
}

.delete-btn:hover {
  color: #ff1010;
}

.deleted-tips {
  font-size: 14px;
  color: #b1b1b1;
}
</style>
