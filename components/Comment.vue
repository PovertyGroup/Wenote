<template lang="pug">
.comment
  el-avatar(:src="avatarUrl" :size="36")
  .comment-content
    .author-info-wrap
      b.author-name {{ this.author.username }}
      span(style="margin: 0 3px") ·
      span {{ commentDate }}
    div {{ content }}
</template>

<script>
import { format } from 'timeago.js'
import utils from '../util/utils'

export default {
  name: 'Comment',
  props: {
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
    }
  },
  computed: {
    avatarUrl () {
      return utils.composeUrl(this.$store.state.serverUrl, this.author.avatar.url)
    },
    commentDate () {
      return format(Date.parse(this.date), 'zh_CN')
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
  margin-left: 10px;
  max-width: calc(100% - 15px - 36px);
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
</style>
