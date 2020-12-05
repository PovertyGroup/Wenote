<template lang="pug">
div.info
   AsideLayout
    template(slot="header")
      Header
    template(slot="aside")
      div.side
        el-menu(default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose")
          el-submenu(index="1")
            template(slot="title")
              i(class="el-icon-document")
              span() 笔记
            el-menu-item-group()
              el-menu-item(index="1-1" @click="showNote()") 我的笔记
              el-menu-item(index="1-2"  @click="showStartedNote()") 我的收藏
          el-submenu(index = "2" )
            template(slot = "title")
              i(class="el-icon-user")
              span() 关注与粉丝
            el-menu-item-group()
              el-menu-item(index="2-1" @click="showFollowee()") 关注
              el-menu-item(index="2-2" @click="showFollower()") 粉丝
          el-menu-item(index = "3" @click="showSetting()")  
            i(class = "el-icon-setting") 
            span() 设置
    template(slot="main")
      div(v-if="this.Note")
        MyNoteCard
      div(v-else-if="this.StaredNote")
        SartedNoteCard
      div(v-else-if="this.Follower")
        FollowersCard
      div(v-else-if="this.Followee")
        FolloweesCard
      div(v-else-if="this.Setting").setting
        SettingCard
      div(v-else)
        MyNoteCard
    template(slot="footer")
      Footer
</template>

<script>
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import MainLayout from "@/layouts/MainLayout";
import AsideLayout from "@/layouts/AsideLayout";
import MyNoteCard from "@/components/MyNoteCard"
import SettingCard from "@/components/SettingCard"
import SartedNoteCard from "@/components/SartedNoteCard"
import FollowersCard from "@/components/FollowersCard"
import FolloweesCard from "@/components/FolloweesCard"
import Vue from "vue";
export default {
  name: "Info",
  components: {
    Footer,
    MyNoteCard,
    MainLayout,
    SettingCard,
    AsideLayout,
    SartedNoteCard,
    FolloweesCard,
    FollowersCard,
    Header,
  },
  created(){
    if (Vue.$jwt.get() == undefined || Vue.$jwt.get() == null){
      this.$message.error("你还未登录");
      this.$router.push("/login")
    }
  },
  methods:{
    showNote(){
      this.Note = true;
      this.StaredNote =false,
      this.Setting = false,
      this.Follower =false,
      this.Followee =false
    },
    showSetting(){
      this.Note = false;
      this.StaredNote =false,
      this.Setting = true,
      this.Follower =false,
      this.Followee =false
    },
    showStartedNote(){
      this.Note = false;
      this.StaredNote =true,
      this.Setting = false,
      this.Follower =false,
      this.Followee =false
    },
    showFollower(){
      this.Note = false;
      this.StaredNote =false,
      this.Setting = false,
      this.Follower =true,
      this.Followee =false
    },
    showFollowee(){
      this.Note = false;
      this.StaredNote =false,
      this.Setting = false,
      this.Follower =false,
      this.Followee =true
    }
  },
  data() {
    return{
      Note: false,
      StaredNote:false,
      Setting: false,
      Follower :false,
      Followee :false,
    }
  },
};
</script>

<style>

.side{
  width: 100%;
  display: flex;
}

.side * {
  font-size: 20px;
}

.el-menu{
  width: 100%;
}
.setting{
  margin: auto;
}
</style>
