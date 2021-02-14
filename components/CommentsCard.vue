<template lang="pug">
.comments-card
  h1(style="margin-left: 20px") 评论
  el-card(shadow="never").comments-wrap
    CommentBox(:noteId="noteId" @onSubmit="refreshComments")
    Comment(v-for="comment in comments" :key="comment._id" :id="comment._id" :date="comment.createdAt" :noteId="noteId" @onDelete="refreshComments"
      :content="comment.content" :likes="comment.points" :author="comment.authorUser" :isDeleted="comment.deleted ? true : false")
    .comment-tips {{ comments.length === 0 ? '暂无评论' : '到底啦' }}
</template>

<script>
import Comment from '@/components/Comment'
import CommentBox from '@/components/CommentBox'
import axios from 'axios'
import utils from '../util/utils'

export default {
  name: 'CommentsCard',
  components: {
    Comment,
    CommentBox
  },
  props: {
    noteId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      comments: []
    }
  },
  watch: {
    noteId (val) {
      axios.get(utils.composeUrl(this.$store.state.serverUrl, '/comments/note:' + val))
        .then((res) => {
          this.comments = res.data.reverse()
        })
        .catch((error) => {
          throw error
        })
    }
  },
  methods: {
    refreshComments () {
      axios.get(utils.composeUrl(this.$store.state.serverUrl, '/comments/note:' + this.noteId))
        .then((res) => {
          this.comments = res.data.reverse()
        })
        .catch((error) => {
          throw error
        })
    }
  }
}
</script>

<style scoped>
.comments-wrap > * {
  margin: 10px 0;
}
.comment-tips {
  font-family: sans-serif;
  color: #979797;
  padding: 30px;
  text-align: center;
  margin: auto;
}
</style>
