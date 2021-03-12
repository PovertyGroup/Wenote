<template lang="pug">
  MainLayout
    template(v-slot:header)
      Header
    .note-wrap
      .note-title-wrap(v-if="!this.noSuchNote")
          h1.note-title {{ this.noteTitle }}
      .md-card.responsive-width(v-if="!this.noSuchNote")
        .noteinfo
          .author-info
            img.avatar(:src="this.noteAvatar")
            p.note-author-name {{ this.noteAuthor.username }}
            el-button.button(v-if="!this.followed" type="primary"
                            icon="el-icon-plus" size="mini" @click="follow()") 关注
            el-button.button(v-if="this.followed" icon="el-icon-check"
                            size="mini" @click="unfollow()") 已关注
            i.far.fa-thumbs-up.like-icon
            span.like-tooltip 点赞
            span.like-num {{likeNum}}
            i.far.fa-star.star-icon
            span.star-tooltip 收藏
            p.like-num {{starNum}}
            .tags-wrap
              i.el-icon-collection-tag.tag-icon(v-if="Tags")
              el-tag.tags(v-for="tag in noteTags" :key="tag" type="info" effect="dark" size="mini") {{tag}}
          .update-time
            el-button.edit-note(v-if="this.isAuthor" type="primary" size="mini"
                                icon="el-icon-edit-outline" @click="editnote()") 编辑
            i.far.fa-calendar-alt
            p.note-update-time 发布于 {{ this.updateTime }}
        MarkdownCard.note(:mdSource="this.noteMd")
      CommentsCard(v-if="!this.noSuchNote" :noteId="noteId").responsive-width.comments
      NoSuchNoteCard(v-if="this.noSuchNote").not-such-note-card
    .buttons
      el-button(v-if="showActionButtons" type="primary" :plain="likeNote" round icon="far fa-thumbs-up like-icon" @click="alterLike").like {{ this.likeNote ? ' 已': ' ' }}点赞
      el-button(v-if="showActionButtons" type="success" :plain="starNote" round icon="far fa-star star-icon" @click="alterStar").star {{ this.starNote ? ' 已': ' ' }}收藏
    template(v-slot:footer)
      Footer
</template>

<script >
import axios from 'axios'
import Header from '@/layouts/Header'
import CommentsCard from '@/components/CommentsCard'
import MainLayout from '@/layouts/MainLayout'
import MarkdownCard from '@/components/MarkdownCard.vue'
import NoSuchNoteCard from '@/components/NoSuchNoteCard.vue'
import Footer from '@/layouts/Footer'
import utils from '@/util/utils'

import { format } from 'timeago.js'

export default {
  Name: 'ViewNote',
  components: {
    MarkdownCard,
    NoSuchNoteCard,
    MainLayout,
    Header,
    Footer,
    CommentsCard
  },
  data () {
    return {
      noteMd: '',
      noteTitle: '',
      noteAuthor: '',
      noteAvatar: '',
      noteId: '',
      updateDate: '',
      likeNum: '',
      starNum: '',
      noteTags: [],
      noteLikers: [],
      noteStarers: [],
      Tags: true,
      isAuthor: false,
      starNote: false,
      likeNote: false,
      followed: false,
      noSuchNote: false
    }
  },
  computed: {
    updateTime () {
      return format(Date.parse(this.updateDate), 'zh_CN')
    },
    showActionButtons () {
      return !this.noSuchNote
    }
  },
  created () {
    axios.get(utils.composeUrl(this.$store.state.serverUrl, '/notes/' + this.$route.params.id))
      .then((res) => {
        this.updateDate = res.data.updatedAt
        this.noteTitle = res.data.title
        this.noteMd = res.data.content
        this.noteAuthor = res.data.author
        this.noteId = res.data.id
        // this.noteAvatar = Vue.$baseUrl.substring(0,Vue.$baseUrl.length-1)+res.data.author.avatar.url;
        if (res.data.author.avatar && res.data.author.avatar.url) {
          this.noteAvatar = utils.composeUrl(this.$store.state.serverUrl, res.data.author.avatar.url)
        } else {
          this.noteAvatar = this.$store.state.defaultAvatar
        }
        this.noteLikers = res.data.likers
        this.noteStarers = res.data.starers
        this.likeNum = res.data.likers.length
        this.starNum = res.data.starers.length
        this.noteTags = res.data.tags ? res.data.tags : []
        if (this.$auth.loggedIn) {
          if (this.noteAuthor.followers && this.noteAuthor.followers.includes(this.$auth.user.id)) {
            this.followed = true
          }
          if (this.noteLikers && this.noteLikers.includes(this.$auth.user.id)) {
            this.likeNote = true
          }
          if (this.noteStarers && this.noteStarers.includes(this.$auth.user.id)) {
            this.starNote = true
          }
          // if(this.noteTags && this.noteTags.length == 0){
          //   this.Tags = false;
          // }
          if (res.data.author.id === this.$auth.user.id) {
            this.isAuthor = true
          }
        }
      })
      .catch(() => {
        this.noSuchNote = true
      })
  },
  methods: {
    follow () {
      axios.post(utils.composeUrl(this.$store.state.serverUrl, '/users/follow/' + this.noteAuthor.id), {})
        .then(() => {
          this.$message.success('已成功关注该作者~')
          this.followed = true
        })
        .catch((error) => {
          if (error.response.status === 403) {
            this.$message.error('你还没有登陆！')
          } else if (error.response.data.message === 'Cannot follow self.') {
            this.$message.error('不能关注你自己！')
          } else {
            this.$message.error('发生了一点错误...请重试')
          }
        })
    },
    unfollow () {
      axios.post(utils.composeUrl(this.$store.state.serverUrl, '/users/unfollow/' + this.noteAuthor.id), {})
        .then(() => {
          this.$message.warning('取消关注对方了呢，哭唧唧~')
          this.followed = false
        })
        .catch((error) => {
          if (error.response.data.statusCode === 403) {
            this.$message.error('您还没有登陆...')
          }
        })
    },
    alterLike () {
      if (!this.likeNote) {
        axios.post(utils.composeUrl(this.$store.state.serverUrl, '/notes/like/' + this.noteId))
          .then(() => {
            this.$message.success('点赞成功~')
            this.likeNote = true
            this.likeNum++
          })
          .catch((error) => {
            if (error.response.data.statusCode === 403) {
              this.$message.error('您还没有登陆...')
            }
          })
      } else {
        axios.post(utils.composeUrl(this.$store.state.serverUrl, '/notes/unlike/' + this.noteId)).then(() => {
          this.$message.warning('取消对这篇文章点赞了呢')
          this.likeNote = false
          this.likeNum = this.likeNum > 0 ? this.likeNum - 1 : 0
        })
      }
    },
    alterStar () {
      if (!this.starNote) {
        axios.post(utils.composeUrl(this.$store.state.serverUrl, '/notes/star/' + this.noteId))
          .then(() => {
            this.$message.success('收藏成功~')
            this.starNote = true
            this.starNum++
          })
          .catch((error) => {
            if (error.response.data.statusCode === 403) {
              this.$message.error('您还没有登陆...')
            }
          })
      } else {
        axios.post(utils.composeUrl(this.$store.state.serverUrl, '/notes/unstar/' + this.noteId))
          .then(() => {
            this.$message.warning('取消收藏了')
            this.starNote = false
            this.starNum = this.starNum > 0 ? this.starNum - 1 : 0
          })
      }
    },
    editnote () {
      this.$router.push(utils.composeUrl('/note/', this.noteId))
    }
  }
}
</script>

<style scoped>
.not-such-note-card{
    margin: 20%;
}

.note-wrap{
    margin-top: 60px;
    display: flex;
    width: 100%;
    bottom: 0;
    flex-direction: column;
    justify-content: flex-start;
}

.note-title-wrap{
    width: 100%;
    line-height: 1;
}

.note-title-wrap * {
    width: fit-content;
}

.note-title{
    font-size: 45px;
    margin: auto;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
  position: relative;
}

.responsive-width{
  width: 60%;
}

.note{
  min-height: 150px;
  padding: 20px 10%;
}
.avatar{
  vertical-align:middle;
  display: inline-block;
  margin: 5px;
  padding: 2px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  vertical-align:middle;
  display: inline-block;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
  padding: 0 30px;
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

.buttons {
  display: flex;
  position: fixed;
  bottom: 5%;
  left: 82%;
}

.buttons * {
  margin: 10px;
}

.like{
  width: 95px;
  padding-left: 17px;
}

.star{
  margin: auto;
}

.tag-icon{
  vertical-align: middle;
  margin: auto 0 auto 20px;
}

.tags{
  margin: 0 0 10px 15px;
  font-size: 14px;
}

.edit-note{
  vertical-align: middle;
  margin: 5px 15px 5px 15px;
}

.like-tooltip, .star-tooltip{
  margin: auto 0 auto 5px;
}

.tags-wrap {
  display: inline-block;
}

.comments{
  margin: 20px auto;
}

@media screen and (max-width: 1300px) {
  .responsive-width {
    width: 80%;
  }
  .buttons {
    flex-direction: column;
    left: 85%;
  }
}

@media screen and (max-width: 1000px) {
  .responsive-width {
    width: 100%;
  }
}

@media screen and (max-width: 750px) {
  .like-tooltip, .star-tooltip, .update-time, .tags-wrap{
    display: none;
  }
  .buttons {
    left: 80%;
  }
  .note-title {
    font-size: 40px;
  }
}

@media screen and (max-width: 500px) {
  .buttons {
    left: 75%;
  }
  .note {
    padding: 10px;
  }
  .note-title {
    font-size: 30px;
  }
}

@media screen and (max-width: 380px) {
  .noteinfo {
    padding: 0 0 0 5px;
  }
  .buttons {
    left: 70%;
  }
  .note-title {
    font-size: 30px;
  }
}

@media screen and (max-width: 360px) {
  .buttons {
    left: 65%;
  }
  .noteinfo {
    padding: 0 0 0 3px;
  }
  .note-title {
    font-size: 26px;
  }
}

</style>
