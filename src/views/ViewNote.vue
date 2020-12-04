<template lang="pug">
  MainLayout
    template(v-slot:header)
      Header
    .note-wrap
      .note-wrap(v-if="!this.noSuchNote")
          h1.note-title {{ this.noteTitle }}
      .md-card(v-if="!this.noSuchNote")
        .noteinfo
          .author-info
            img.avatar(:src="this.noteAvatar")
            p.note-author-name {{ this.noteAuthor.username }}
            el-button.button(v-if="!this.followed" type="primary"
                            icon="el-icon-plus" size="mini" @click="follow()") 关注
            el-button.button(v-if="this.followed" icon="el-icon-check"
                            size="mini" @click="unfollow()") 已关注
            i.far.fa-thumbs-up.like-icon
            p.like-num 点赞 {{likeNum}}
            i.far.fa-star.star-icon
            p.like-num 收藏 {{starNum}}
          .update-time
            i.far.fa-calendar-alt
            p.note-update-time 发布于{{ this.updateTime }}
        MarkdownCard.note(:mdSource="this.noteMd")
      NoSuchNoteCard(v-if="this.noSuchNote").not-such-note-card
    el-button(v-if="!this.likeNote" type="primary" plain round
              icon="el-icon-circle-check" @click="like()").like 点赞
    el-button(v-if="this.likeNote" type="primary" round
              icon="el-icon-circle-check" size="small"  @click="unlike()").like 已点赞
    el-button(v-if="!this.starNote" type="success"
              plain round  icon="el-icon-star-off" @click="star()").star 收藏
    el-button(v-if="this.starNote" type="success"
              round icon="el-icon-star-off" @click="unstar()").star 已收藏
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
        noteId:'',
        likeNum: '',
        starNum: '',
        noteLikers: [],
        noteStarers: [],
        starNote: false,
        likeNote: false,
        followed: false,
        noSuchNote: false,
      }
    },
    computed: {
        updateTime() {
            return format(this.noteAuthor.updatedAt, 'zh_CN');
        }
    },
    created(){
      Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, '/notes/' + this.$route.params.id)).then((res) => {
            this.noteTitle = res.data.title;
            this.noteMd = res.data.content;
            this.noteAuthor = res.data.author;
            this.noteId = res.data.id;
            this.noteAvatar = Vue.$baseUrl.substring(0,Vue.$baseUrl.length-1)+res.data.author.avatar.url;
            this.noteLikers = res.data.likers
            this.noteStarers = res.data.starers
            this.likeNum = res.data.likers.length
            this.starNum = res.data.starers.length
            console.log(res.data.starers.length)
            if(this.noteAuthor.followers.indexOf(Vue.$info.get()) >= 0){
              this.followed = true;
            }
            if(this.noteLikers.indexOf(Vue.$info.get()) >= 0){
              this.likeNote = true;
            }
            if(this.noteStarers.indexOf(Vue.$info.get()) >= 0){
              this.starNote = true;
            }
        })
        .catch(() => {
            this.noSuchNote = true;
        })
    },
    mounted() {
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
      unfollow(){
        Vue.$axios.post(Vue.$composeUrl(Vue.$baseUrl,"/users/unfollow/"+this.noteAuthor.id),{},{
          headers: Vue.$getAuthorizedHeader()
        })
        .then((res)=>{
          this.$message.warning("取消关注对方了呢，哭唧唧~");
          this.followed = false;
          console.log(res.data);
        })
        .catch((error)=>{
          console.log(error)
        })
      },
      like(){
        Vue.$axios.post(Vue.$composeUrl(Vue.$baseUrl,"/notes/like/"+this.noteId),{},{
          headers: Vue.$getAuthorizedHeader()
        })
        .then((res)=>{
          this.$message.success("点赞成功~");
          this.likeNote = true;
          console.log(res);
        })
        .catch((error)=>{
          console.log(error.response.data.statusCode)
          if(error.response.data.statusCode == 403){
            this.$message.error("您还没有登陆...")
          }
        })
      },
      unlike(){
        Vue.$axios.post(Vue.$composeUrl(Vue.$baseUrl,"/notes/unlike/"+this.noteId),{},{
          headers: Vue.$getAuthorizedHeader()
        })
        .then((res)=>{
          this.$message.warning("取消对这篇文章点赞了呢");
          this.likeNote = false;
          console.log(res);
        })
      },
      star(){
        Vue.$axios.post(Vue.$composeUrl(Vue.$baseUrl,"/notes/star/"+this.noteId),{},{
          headers: Vue.$getAuthorizedHeader()
        })
        .then((res)=>{
          this.$message.success("收藏成功~");
          this.starNote = true;
          console.log(res);
        })
        .catch((error)=>{
          console.log(error.response.data.statusCode)
          if(error.response.data.statusCode == 403){
            this.$message.error("您还没有登陆...")
          }
        })
      },
      unstar(){
        Vue.$axios.post(Vue.$composeUrl(Vue.$baseUrl,"/notes/unstar/"+this.noteId),{},{
          headers: Vue.$getAuthorizedHeader()
        })
        .then((res)=>{
          this.$message.warning("取消收藏了");
          this.starNote = false;
          console.log(res);
        })
      }
    }
};
</script>

<style scoped>
.not-such-note-card{
    margin: 20%;
}

.note-wrap{
    display: flex;
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
  position: relative;
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
  background: #fafafa;
}

.author-info {
  float: left;
  height: 100%;
  line-height: 60px;
}

.like-num{
  vertical-align: middle;
  display: inline-block;
  margin: auto 0 auto 5px;
  font-size: 15px;
}

.like-icon{
  vertical-align: middle;
  display: inline-block;
  margin: auto 0 auto 20px;
  font-size: 15px;
}

.star-icon{
  vertical-align: middle;
  margin: auto 0 auto 20px;
}

.like{
  width: 95px;
  position:fixed;
  bottom:4%;
  left:80%;
  height: 45px;
}

.star{
  width: 95px;
  position:fixed;
  bottom:4%;
  left:85%;
  height: 45px;
}
</style>