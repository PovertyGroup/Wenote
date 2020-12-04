<template lang="pug">
.head
  .wrap
    .header-wrapper
      h1 Wenote
      p.info 一个开源的Markdown文档系统，书写强大简洁、阅读浏览体验佳、管理功能丰富，适合作为个人和小型团队的文档、笔记和知识管理工具
      .buttons-wrapper
        el-button.link(type="info" plain) 熊宝的笔记(镇站之宝)
</template>

<script>
// import Vue from "vue";
export default {};
</script>

<style scoped>

.head{
  position: relative;
  margin:auto;
  bottom: 30%;
  right: 20%
}

.wrap {
  margin: auto;
  padding: 10px;
  max-width: 1140px;
}

.header-wrapper {
  padding-top: 87px;
  max-width: 655px;
}

h1 {
  font-size: 60px;
  margin: auto;
}

.info {
  background-color: rgba(148, 155, 250, 0.144);
  padding: 10px;
  font-size: 18px;
}

.buttons-wrapper{
  margin:auto;
}

.button{
  margin:auto;
}
</style>