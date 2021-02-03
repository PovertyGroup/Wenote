<template lang="pug">
MainLayout
  template(v-slot:header)
    Header
  el-card.tou-card
    div.title(slot="header")
        h1 Wenote 用户使用协议
    .tou
      .markdown-body(v-html="touHtml")
  template(v-slot:footer)
    Footer
</template>

<script>
import LoginCard from '@/components/LoginCard'
import MainLayout from '@/layouts/MainLayout'
import Header from '@/layouts/Header'
import Footer from '@/layouts/Footer'
import { tou } from '@/tou'

const md = require('markdown-it')()

export default {
  name: 'TermsOfUse',
  components: {
    LoginCard,
    MainLayout,
    Header,
    Footer
  },
  computed: {
    touHtml () {
      console.log(tou)
      return md.render(tou)
    }
  }
}
</script>

<style scoped>
.title{
    text-align: center;
}
.tou-card{
  margin: auto;
  flex: 0.7;
}
.tou{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0 30px;
}

@media screen and (max-width: 1300px) {
  .tou-card{
    flex: 0.9;
  }
}

@media screen and (max-width: 1000px) {
  .tou-card{
    flex: 1;
  }
}

@media screen and (max-width: 800px) {
  .tou{
    padding: 0 10px;
  }
}

</style>
