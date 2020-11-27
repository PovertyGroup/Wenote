<template lang="pug">
  MainLayout
    template(v-slot:header)
        Header
    MarkdownCard(:mdSource="this.noteMd" v-if="!this.noSuchNote")
    NoSuchNoteCard(v-if="this.noSuchNote").not-such-note-card
</template>

<script>
import Header from '../layouts/Header'
import MainLayout from '../layouts/MainLayout'
import MarkdownCard from '../components/MarkdownCard.vue'
import NoSuchNoteCard from '../components/NoSuchNoteCard.vue'
import Vue from 'vue'

export default {
    Name: 'Note',
    components: {
        MarkdownCard,
        NoSuchNoteCard,
        MainLayout,
        Header
    },
    data() {
        return {
            noteMd: '',
            noSuchNote: false,
        }
    },
    mounted() {
        console.log(Vue.$jwt[0]);
        Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, '/notes/' + this.$route.params.id)).then((res) => {
            console.log(res);
            this.noteMd = res.data.content;
            console.log(this.noteMd);
        })
        .catch(() => {
            this.noSuchNote = true;
        })
    }
}
</script>

<style scoped>
.not-such-note-card{
    margin: auto;
}
</style>