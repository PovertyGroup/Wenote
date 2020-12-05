<template lang="pug">
.head
  .wrap
    .header-wrapper
      h1 Wenote
      p.info 一个开源的Markdown笔记系统，书写强大简洁、阅读浏览体验佳，适合作为个人和小型团队的文档、笔记和知识管理工具
      .buttons-wrapper
        el-button.link(type="info" plain @click="jumpto()") 进入Wenote
</template>

<script>
// import Vue from "vue";
export default {
  name: "IndexCard",
  methods: {
    jumpto(){
      this.$router.push("/home")
    }
  }
};
</script>

<style scoped>

.head{
  width: 100%;
  padding: 104px 0;
  bottom: 30%;
  right: 20%
}

.wrap {
  margin: 0 auto;
  padding: 10px;
  max-width: 1140px;
}

.header-wrapper {
  max-width: 655px;
  margin: 7% 15% auto 3%;
}

h1 {
  font-size: 60px;
  margin: auto;
}

.info {
  background-color: rgba(181, 215, 253, 0.144);
  padding: 10px;
  margin:20px;
  font-size: 20px;
}

.buttons-wrapper{
  margin:10px;
  padding-left: 10px;
  width: 50px;
}

.button{
  margin:auto;
}
</style>