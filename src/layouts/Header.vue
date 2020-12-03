<template lang="pug">
.header
  .left
    el-link.sitename(:underline="false", href="/index") Wenote 📝
    el-link(:underline="false" href="/problem") 熊宝的笔记(镇站之宝)
    el-link(:underline="false" href="/about") 关于
  .center
    el-col(:span="12")
      el-autocomplete.input(v-model="search" , placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect")
  .right
    UserInfoCard
</template>

<script>
// import Vue from 'vue'
  export default{
    data(){
      return {
        notes: [],
        search: '',
      }
    },

}
</script>

<style scoped>
.header {
  height: 50px;
  background: #ffffff;
  box-shadow: 0 3px 2px #6ba9f0c0;
  display: flex;
}

.header * {
  margin: auto;
}

.left {
  margin-left: 0;
}

.left * {
  margin: auto 10px;
  font-size: 15px;
}

.sitename {
  font-size: 30px;
  margin-left: 30px;
}
.right {
  margin-right: 0;
}
</style>

<script>
import UserInfoCard from "@/components/UserInfoCard";
export default {
  name: "InfoCard",
  components: {
    UserInfoCard,
  },
};
</script>