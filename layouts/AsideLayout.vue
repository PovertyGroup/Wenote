<template lang="pug">
//- el-container.con
//-   el-aside
//-     slot(name="aside")
//-   el-container
//-     el-scrollbar(style="height: 100vh; width: 100%")
//-       el-header(style="z-index: 10")
//-         slot(name="header")
//-       el-main
//-           slot(name="main")
//-       el-footer(style="z-index: 10")
//-         slot(name="footer")

el-container.con
  el-header(style="z-index: 10")
    slot(name="header")
  el-container
    el-aside(width="200px")
      slot(name="aside")
    el-container
      el-scrollbar(style="height: 100vh; width: 100%")
        el-main
          slot(name="main")
        el-footer(style="z-index: 10")
          slot(name="footer")

</template>

<script>
export default {
  asyncData ({ $auth }) {
    if ($auth.loggedIn) {
      $auth.fetchUser()
    }
  },
  mounted () {
    if (this.$auth.loggedIn) {
      this.$auth.fetchUser()
    }
  }
}
</script>

<style scoped>
header {
  padding-bottom: 20px;
}

.el-header {
  margin: 0;
  padding: 0;
}

.el-main {
  min-height: calc(100vh - 188px);
}
.el-footer {
  min-height: 30px;
  bottom: 0;
  background: #3e3e3e;
  color: #ffffff;
  height: fit-content !important;
}
</style>
