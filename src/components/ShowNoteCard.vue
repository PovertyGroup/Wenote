<template lang="pug">
.note
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
import Vue from 'vue'
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
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, "/notes/" + this.id), {
    })
    .then((res)=>{
      console.log(res.data)
      if (res.data.title.length>10) this.noteTitle = res.data.title.substring(0,9)+"......";
      else this.noteTitle = res.data.title
      if (res.data.content.length > 49) this.noteMd = res.data.content.substring(0,49)+"......"
      else this.noteMd = res.data.content
      this.author = res.data.author.username
      this.createdtime = res.data.createdAt.substring(0,10)
      this.updatatime = res.data.updatedAt.substring(0,10)
    })
  },
}
</script>

<style>
.note {
  height: 225px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.747);
  border: solid 1px rgb(77, 77, 77);
}

.note-head {
  height: 40px;
  width: inherit;
}

#note-icon {
  font-size: 22px;
}

.note-title span {
  display: inline-block;
  margin-left: 6px;
}
.note-title {
  width: 300px;
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
  font-size: 18px;
  display: block;
  padding-left: 10px;
  margin: 10px 0 10px 0;
}

#content {
  margin-top: 15px;
}
</style>

