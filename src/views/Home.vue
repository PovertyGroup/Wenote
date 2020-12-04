<template lang="pug">
MainLayout
  template(slot="header")
    Header
  template(slot="footer")
    Footer
  div.note-container-wrap
    div.note-container
      div(v-for = "note in notes" :key="note")
        NoteCard(:id="note").note-card

</template>

<script>
import Vue from 'vue'
import Header from '../layouts/Header'
import MainLayout from '../layouts/MainLayout'
import NoteCard from '../components/NoteCard'
import Footer from '../layouts/Footer'

export default {
    Name: 'Index',
    components: {
        MainLayout,
        Header,
        NoteCard,
        Footer
    },
    data(){
      return{
        notes: []
      }
    },
    mounted(){
      Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, '/recommand'))
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
  margin:0 10px 0 0;
}

.note-container-wrap{
  margin: auto;
}

.note-container{
  display: flex;
  flex-wrap:wrap;
  width: fit-content;
  max-width: 100%;
  justify-content: center;
  margin: auto 50px auto 50px;
}

</style>