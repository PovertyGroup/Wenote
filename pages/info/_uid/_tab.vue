<template lang="pug">
div.info
   AsideLayout
    template(slot="header")
      Header
    template(slot="aside")
      div.side
        el-menu(default-active="2")
          el-submenu(index="1")
            template(slot="title")
              i(class="el-icon-document")
              span() 笔记
            el-menu-item-group()
              el-menu-item(index="1-1" @click="() => switchTo('notes')") 我的笔记
              el-menu-item(index="1-2"  @click="() => switchTo('starednotes')") 我的收藏
          el-submenu(index = "2" )
            template(slot = "title")
              i(class="el-icon-user")
              span() 关注与粉丝
            el-menu-item-group()
              el-menu-item(index="2-1" @click="() => switchTo('followees')") 关注
              el-menu-item(index="2-2" @click="() => switchTo('follewers')") 粉丝
          el-menu-item(index = "3" @click="() => switchTo('settings')")
            i(class = "el-icon-setting")
            span() 设置
    template(slot="main")
      div(v-if="this.$route.params.tab=='notes'")
        MyNoteCard
      div(v-else-if="this.$route.params.tab=='starednotes'")
        SartedNoteCard
      div(v-else-if="this.$route.params.tab=='follewers'")
        FollowersCard
      div(v-else-if="this.$route.params.tab=='followees'")
        FolloweesCard
      div(v-else-if="this.$route.params.tab=='settings'").setting
        SettingCard
      div(v-else)
        MyNoteCard
    template(slot="footer")
      Footer
</template>

<script>
import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import MainLayout from '@/layouts/MainLayout'
import AsideLayout from '@/layouts/AsideLayout'
import MyNoteCard from '@/components/MyNoteCard'
import SettingCard from '@/components/SettingCard'
import SartedNoteCard from '@/components/SartedNoteCard'
import FollowersCard from '@/components/FollowersCard'
import FolloweesCard from '@/components/FolloweesCard'
// import Vue from "vue";

export default {
  name: 'Info',
  components: {
    Footer,
    MyNoteCard,
    MainLayout,
    SettingCard,
    AsideLayout,
    SartedNoteCard,
    FolloweesCard,
    FollowersCard,
    Header
  },
  created () {
    if (!this.$route.params.uid) {
      this.$router.push('/home')
    }
  },
  methods: {
    switchTo (path) {
      this.$router.push(`/info/${this.$route.params.uid}/${path}`)
    }
  }
}
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
