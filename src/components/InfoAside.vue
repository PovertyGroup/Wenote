<template lang="pug">
  div.side
    el-menu(default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose")
      el-submenu(index = "1")
        template(slot = "title")
          i(class = "el-icon-document")
          span() 笔记
        el-menu-item-group()
          el-menu-item(index="1-1" @click="") 我的笔记
          el-menu-item(index="1-2" @click="") 我的收藏
      el-submenu(index = "2" disable = "true")
        template(slot = "title")
          i(class = "el-icon-user")
          span() 关注与粉丝
        el-menu-item-group()
          el-menu-item(index="2-1" @click="") 关注
          el-menu-item(index="2-2" @click="") 粉丝
      el-menu-item(index = "3" @click = "")  
          i(class = "el-icon-setting") 
          span() 设置
</template>

<script>
import InfoHome from "@/components/InfoHome"
import Vue from  "vue"
export default {
  components:{
    InfoHome,
  },
  methods: {
    showSetting(){
      Vue.$router.push("/InfoHome")
    }
  }
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

</style>