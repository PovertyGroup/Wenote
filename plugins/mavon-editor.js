import Vue from 'vue'
import mavonEditorComponent, { mavonEditor } from 'mavon-editor'
const md = mavonEditor.getMarkdownIt()
const mk = require('@iktakahiro/markdown-it-katex')

md.use(mk)
Vue.use(mavonEditorComponent)
