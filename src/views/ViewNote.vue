<template lang="pug">
  MainLayout
    template(v-slot:header)
      Header
    .note-wrap
      .note-title-wrap(v-if="!this.noSuchNote")
          h1.note-title {{ this.noteTitle }}
      .md-card(v-if="!this.noSuchNote")
        .noteinfo
          .author-info
            img.avatar(:src="this.noteAvatar")
            p.note-author-name {{ this.noteAuthor.username }}
            el-button.button(v-if="!this.followed" type="primary" icon="el-icon-plus" size="mini" @click="follow()") 关注
            el-button.button(v-if="this.followed" icon="el-icon-check" size="mini" @mouseover='show-button' @click="unfollow()") 已关注
          .update-time
            i.far.fa-calendar-alt
            p.note-update-time 发布于{{ this.updateTime }}
        MarkdownCard.note(:mdSource="this.noteMd")
      NoSuchNoteCard(v-if="this.noSuchNote").not-such-note-card
      el-backtop(target=".page-component__scroll .el-scrollbar__wrap")
    template(v-slot:footer)
      Footer
</template>

<script >
import Vue from "vue";
import Header from "../layouts/Header";
import MainLayout from "../layouts/MainLayout";
import MarkdownCard from "../components/MarkdownCard.vue";
import NoSuchNoteCard from "../components/NoSuchNoteCard.vue";
import Footer from "../layouts/Footer";

import { format } from 'timeago.js';

export default {
  Name: 'ViewNote',
    components: {
      MarkdownCard,
      NoSuchNoteCard,
      MainLayout,
      Header,
      Footer,
    },
    data(){
      return{
        noteMd: '',
        noteTitle: '',
        noteAuthor: '',
        noteAvatar: '',
        followed: false,
        noSuchNote: false,
      }
    },
    computed: {
        updateTime() {
            return format(this.noteAuthor.updatedAt, 'zh_CN');
        }
    },
    mounted() {
      Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, '/notes/' + this.$route.params.id)).then((res) => {
            this.noteTitle = res.data.title;
            this.noteMd = res.data.content;
            this.noteAuthor = res.data.author;
            this.noteAvatar = Vue.$baseUrl.substring(0,Vue.$baseUrl.length-1)+res.data.author.avatar.url;
          console.log(Vue.$info.get())
            if(this.noteAuthor.followers.indexOf(Vue.$info.get()) >= 0){
              this.followed = true
            }
        })
        .catch(() => {
            this.noSuchNote = true;
        })
    },
    methods:{
      follow(){
        Vue.$axios.post(Vue.$composeUrl(Vue.$baseUrl,"/users/follow/"+this.noteAuthor.id),{},{
          headers: Vue.$getAuthorizedHeader()
        })
        .then((res)=>{
          this.$message.success("已成功关注该作者~");
          this.followed = true;
          console.log(res);
        })
        .catch((error)=>{
          console.log(error.response)
          if(error.response.status==403){
            this.$message.error("你还没有登陆！");
          }else if(error.response.data.message === "Cannot follow self."){
            this.$message.error("不能关注你自己！");
          }else{
            this.$message.error("发生了一点错误...请重试");
          }
        })
      },
    }
};
</script>

<style scoped>
.not-such-note-card{
    margin: 20%;
}

.note-wrap{
    width: 100%;
    bottom: 0;
    flex-direction: column;
    justify-content: flex-start;
}

.note-title-wrap{
    line-height: 1;
    flex-direction: column;
    padding-bottom: 30px;
    padding-left: 10px;
}

.note-title-wrap * {
    width: fit-content;
}

.note-title{
    font-size: 45px;
    margin: auto 20% auto 20%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    vertical-align:middle;
    display: inline-block;
}

.note-info-wrap{
    display: flex;
    padding-top: 5px;
    font-size: 18px;
    padding-top: 10px;
}

.note-info-item{
    justify-content:center;
    display: flex;
    width: 900px;
    margin: 0;
    padding-left: 10px;
    font-size: 18px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.md-card{
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  margin: 20px auto 0 auto;
  width: 60%;
}
.note{
  min-height: 150px;
  padding: 20px 10%;
}
.avatar{
  vertical-align:middle;
  display: inline-block;
}
.note-author-name{
  vertical-align:middle;
  display: inline-block;
  margin: auto 5px auto 5px;
  font-size: 18px;
}

.update-time .far {
  margin-right: 10px;
}

.far.fa-calendar-alt{
  display: inline-block;
}

.button{
  margin: 5px 5px 5px 15px;
}

.note-update-time{
  display: inline-block;
  margin: auto 0 auto 0;
}

.update-time{
  float: right;
  line-height: 60px;
  margin-right: 10px;
}

.noteinfo{
  padding: 0 60px;
  height: 60px;
  border-bottom: 1px solid #eeeeee;
}
.author-info{
  float: left;
}
</style>