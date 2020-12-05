<template lang="pug">
.home-note
  el-link.link-to(:underline="false" @click="ClicknoteUrl()")
    .home-note-head
      .home-note-title
        i#home-note-icon.el-icon-notebook-2
        span {{this.noteTitle}}
    .line
    .home-note-info
      .home-note-info-warp
      span.home-note-content 作者: {{this.noteAuthor}}
      span.home-note-content 日期: {{this.noteDate}}
      span#content.home-note-content 概要: {{this.noteMd}}
</template>

<script>
import Vue from 'vue'
export default {
  name: "ShowViewNoteCard",
  data() {
    return {
      noteTitle: "",
      noteDate: "",
      noteMd: "",
      noteId: "",
      noteAuthor: "",
    };
  },
  props: {
    "id": String
  },
  created() {
    Vue.$axios
    .get(Vue.$composeUrl(Vue.$baseUrl, '/notes/' + this.id),{
      headers: Vue.$getAuthorizedHeader()
    })
    .then((res)=>{
      this.noteTitle = res.data.title
      this.noteMd = res.data.content.substring(0,50)+"......"
      this.noteDate = res.data.createdAt.substring(0,10)
      this.noteAuthor = res.data.author.username
      this.noteId = res.data.id
      if(this.noteTitle.length>14){
        this.noteTitle = this.noteTitle.substring(0,12)+"......"
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  },
  methods: {
    ClicknoteUrl() {this.$router.push("/viewnote/"+this.noteId)}
  }
};
</script>


<style scoped>
.home-note {
  width: 360px;
  height: 225px;
  border-radius: 4px;
  background: rgb #ffffff;
  border: solid 1px rgb(142, 186, 252);
  box-shadow: rgba(161, 194, 245, 0.658) 0px 2px 12px 0px;
}

.home-note-head {
  width: inherit;
  height: 40px;
}

#home-note-icon {
  font-size: 22px;
}

.home-note-title span {
  display: inline-block;
  margin-left: 6px;
}
.home-note-title {
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

.home-note-info {
  width: 300px;
  text-align: left;
}

.home-note-content {
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