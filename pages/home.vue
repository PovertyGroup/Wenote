<template lang="pug">
MainLayout
  template(slot="header")
    Header
  template(slot="footer")
    Footer
  div.note-container
    div(v-for = "note in notes" :key="note")
      ShowViewNoteCard(:id="note")

</template>

<script>
import axios from 'axios'
import utils from '@/util/utils'
import Header from '@/layouts/Header'
import MainLayout from '@/layouts/MainLayout'
import ShowViewNoteCard from '@/components/ShowViewNoteCard'
import Footer from '@/layouts/Footer'

export default {
  Name: 'index',
  components: {
    MainLayout,
    Header,
    ShowViewNoteCard,
    Footer
  },
  data () {
    return {
      notes: []
    }
  },
  mounted () {
    axios.get(utils.composeUrl(this.$store.state.serverUrl, '/recommand'))
      .then((res) => {
        this.notes = res.data
      })
      .catch((error) => {
        this.$message.error('发生了未知错误...')
        throw error
      })
  }
}
</script>

<style scoped>
.note-container{
  margin: auto;
  max-width: 100%;
  display: flex;
  flex: 0.5;
  flex-direction: column;
  padding-top: 50px;
}

@media screen and (max-width: 1400px) {
  .note-container{
    flex: 0.6;
  }
}

@media screen and (max-width: 1300px) {
  .note-container{
    flex: 0.7;
  }
}

@media screen and (max-width: 1100px) {
  .note-container{
    flex: 0.8;
  }
}

@media screen and (max-width: 500px) {
  .note-container{
    flex: 1;
  }
}
</style>