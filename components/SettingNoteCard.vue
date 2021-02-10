<template lang="pug">
el-card.home-note(:class="'folded'")
  div(slot="header").note-info
    el-link(:underline="false" @click="ClicknoteUrl()")
      i.note-title.el-icon-notebook-2
      span.note-title {{ noteTitle }}
    .info-wrap
      el-button.expand-btn(@click="editNote" size="mini") 编辑
      div.info-item
        i.fas.fa-calendar-alt
        span {{ dateFormatted }}
      div.info-item
        i.fas.fa-user
        span {{ noteAuthor }}
    link(rel="stylesheet" :href="katexCss")
    link(rel="stylesheet" :href="githubMarkdownCss")
  div(v-html="stripedMd" :class="markdown-body-minimized")
</template>

<script>
import config from '@/config'
import axios from 'axios'
import remark from 'remark'
import strip from 'strip-markdown'
import { format } from 'timeago.js'
import utils from '../util/utils'

const md = require('markdown-it')()
const mk = require('@iktakahiro/markdown-it-katex')

md.use(mk)

export default {
  name: 'ShowViewNoteCard',
  props: {
    id: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      noteTitle: '',
      noteDate: '',
      noteMd: '',
      noteAuthor: '',
      stripedMd: '',
      githubMarkdownCss: config.mavonEditorExternalLink.markdown_css(),
      katexCss: config.mavonEditorExternalLink.katex_css()
    }
  },
  computed: {
    renderedMd () {
      return md.render(this.noteMd)
    },
    dateFormatted () {
      return format(Date.parse(this.noteDate), 'zh_CN')
    }
  },
  created () {
    axios.get(utils.composeUrl(this.$store.state.serverUrl, '/notes/' + this.id))
      .then((res) => {
        this.noteTitle = res.data.title
        // this.noteMd = res.data.content.substring(0, 50) + '......'
        // this.noteDate = res.data.createdAt.substring(0, 10)
        this.noteMd = res.data.content
        this.stripeMd()
        this.noteDate = res.data.createdAt
        this.noteAuthor = res.data.author.username
        if (this.noteTitle.length > 14) {
          this.noteTitle = this.noteTitle.substring(0, 12) + '......'
        }
      })
      .catch((error) => {
        throw error
      })
  },
  methods: {
    ClicknoteUrl () {
      this.$router.push('/viewnote/' + this.id)
    },
    stripeMd () {
      const component = this
      remark()
        .use(strip)
        .process(this.noteMd)
        .then((file, err) => {
          if (err) { throw err }
          component.stripedMd = md.render(component.takeFirstNLines(file.contents, 10))
        })
    },
    editNote () {
      this.$router.push('/note/' + this.id)
    },
    takeFirstNLines (txt, l) {
      let ret = ''
      let n = 0
      const lines = txt.split('\n')
      for (let i = 0; i < lines.length && n < l; i++) {
        if (lines[i] !== '') {
          ret += lines[i]
          ret += '\n'
          n++
        }
      }
      return ret
    }
  }
}
</script>

<style scoped>
.home-note.folded{
  height: 225px;
}

.home-note.expanded{
  height: fit-content;
}

.info-wrap {
  display: flex;
  float: right;
  color: #757575;
  font-size: 10px;
}

.note-info{
  display: flex;
  justify-content: space-between;
  font-family: '微软雅黑', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.note-title{
  font-weight: bold;
  font-size: 20px;
}

.markdown-body-minimized {
  overflow: hidden;
  max-height: 140px;
}

.info-item i {
  margin: 0 10px;
}

.info-item{
  margin: auto 10px;
}

.expand-btn{
  margin: auto 10px auto 10px;
}

@media screen and (max-width: 610px) {
  .info-item * {
    width: fit-content;
    margin: auto;
    display: block;
  }
  i.note-title{
    display: none;
  }
}
</style>

<style>
.home-note .markdown-body-minimized p {
  margin: 0;
}
</style>
