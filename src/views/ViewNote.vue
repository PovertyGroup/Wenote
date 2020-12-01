<template lang="pug">
  MainLayout
    template(v-slot:header)
      Header
    //.view-note
    MarkdownCard.md-card(:mdSource="this.noteMd")
    template(v-slot:footer)
      Footer
</template>

<script >
import Vue from "vue";
import Header from "../layouts/Header";
import MainLayout from "../layouts/MainLayout";
import MarkdownCard from "../components/MarkdownCard.vue";
import NoSuchNoteCard from "../components/NoSuchNoteCard.vue";
import Footer from "../layouts/Footer";
export default {
  Name: 'ViewNote',
    components: {
      MarkdownCard,
      NoSuchNoteCard,
      MainLayout,
      Header,
      Footer,
    },
    data(){
      return{
        noteMd: '',
        noteTitle: '',
        noteAuthor: '',
      }
    },
    mounted() {
      Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, '/notes/' + this.$route.params.id)).then((res) => {
            this.noteTitle = res.data.title;
            this.noteMd = res.data.content;
            this.noteAuthor = res.data.author;
        })
        .catch(() => {
            this.noSuchNote = true;
        })
    }
};
</script>

<style scoped>
.md-card{
  margin: auto;
  background:  #cde2fd41;
  border-radius: 30px;
}
</style>