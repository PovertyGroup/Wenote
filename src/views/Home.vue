<template lang="pug">
MainLayout
  template(slot="header")
    Header
  template(slot="footer")
    Footer
  div.note-container-wrap
    div.note-container
      div(v-for = "note in notes" :key="note")
        ShowViewNoteCard(:id="note").note-card

</template>

<script>
import axios from 'axios'
import utils from '../util/utils'
import Header from '../layouts/Header'
import MainLayout from '../layouts/MainLayout'
import ShowViewNoteCard from '../components/ShowViewNoteCard'
import Footer from '../layouts/Footer'

export default {
    Name: 'Index',
    components: {
        MainLayout,
        Header,
        ShowViewNoteCard,
        Footer
    },
    data(){
      return{
        notes: []
      }
    },
    mounted(){
      axios.get(utils.composeUrl(this.$store.state.serverUrl, '/recommand'))
      .then((res)=>{
        this.notes = res.data
      })
      .catch((error)=>{
        console.log(error)
        this.$message.error("发生了未知错误...")
      })
    },
}
</script>

<style scoped>
.note-card{
  margin:0 40px 30px 0;

}

.note-container-wrap{
  margin:auto;
}

.note-container{
  margin: auto 50px auto 50px;
  max-width: 100%;
  display: flex;
  flex-wrap:wrap;
  width: fit-content;
  justify-content: center;
}

</style>