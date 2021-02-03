<template lang="pug">
div
    link(rel="stylesheet" :href="katexCss")
    link(rel="stylesheet" :href="githubMarkdownCss")
    div(v-html="this.mdHtml").md-wrap.markdown-body
</template>

<script>
// var md = require('markdown-it')(),

import { mavonEditor } from 'mavon-editor'
import config from '@/config'
const md = mavonEditor.getMarkdownIt()
const mk = require('@iktakahiro/markdown-it-katex')

md.use(mk)

export default {
  name: 'MarkdownCard',
  props: {
    mdSource: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      githubMarkdownCss: config.mavonEditorExternalLink.markdown_css(),
      katexCss: config.mavonEditorExternalLink.katex_css()
    }
  },
  computed: {
    mdHtml () {
      return md.render(this.mdSource)
    }
  }
}
</script>

<style scoped>
.md-wrap{
    margin: 0;
    padding: 10px;
    line-height: 2rem;
    text-align: left;
}

h1, h2, h3 {
    margin-bottom: 10px;
}
</style>
