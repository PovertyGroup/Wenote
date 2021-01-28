<template lang="pug">
.note
  el-link.link-to(:underline="false" @click="ClicknoteUrl()")
    .note-head
      .note-title()
        i#note-icon.el-icon-notebook-2
        span() 标题:{{noteTitle}}
    .line
    .note-info
      .note-info-wrap
      span.note-content 创建日期: {{createdtime}}
      span.note-content 最后更新日期: {{updatatime}}
      span#content.note-content 概要: {{noteMd}}
</template>

<script>
import axios from 'axios'
import utils from '../util/utils'

export default {
  name :"ShowNoteCard",
  data(){
    return{
        noteTitle: "",
        noteMd:"",
        createdtime:"",
        updatatime:"",
        author:"",
        noteUrl:""
    }
  },
  props : {
    id: String,
  },
  created(){
    axios.get(utils.composeUrl(this.$store.state.serverUrl, "/notes/" + this.id),
                   {headers: utils.getAuthorizedHeader()})
    .then((res)=>{
      if (res.data.title.length>10) this.noteTitle = res.data.title.substring(0,9)+"......"
      else this.noteTitle = res.data.title
      if (res.data.content.length > 49) this.noteMd = res.data.content.substring(0,49)+"......"
      else this.noteMd = res.data.content
      this.author = res.data.author.username
      this.createdtime = res.data.createdAt.substring(0,10)
      this.updatatime = res.data.updatedAt.substring(0,10)
    })
  },
  methods: {
    ClicknoteUrl() {this.$router.push("/note/" + this.id)}
  }
}
</script>

<style scoped>
.note {
  width: 360px;
  height: 225px;
  border-radius: 4px;
  background: rgb #ffffff;
  border: solid 1px rgb(142, 186, 252);
  box-shadow: rgba(161, 194, 245, 0.658) 0px 2px 12px 0px;
}

.note-head {
  width: inherit;
  height: 40px;
}

#note-icon {
  font-size: 22px;
}

.note-title span {
  display: inline-block;
  margin-left: 6px;
}
.note-title {
  font-size: 20px;
  line-height: 40px;
  float: left;
  text-align: left;
  padding-left: 10px;
}

.line {
  width: 355px;
  height: 0.5px;
  margin: 2px;
  background: #000;
}

.note-info {
  width: 300px;
  text-align: left;
}

.note-content {
  width: 280px;
  font-size: 16px;
  display: block;
  padding-left: 10px;
  margin: 10px 0 10px 0;
}

#content {
  margin-top: 15px;
}

.link-to{
  cursor: pointer;
  display: block;
  width: 360px;
  height: 225px;
}
</style>

