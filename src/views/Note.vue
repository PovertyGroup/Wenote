<template lang="pug">
  MainLayout
    template(v-slot:header)
        Header
    MarkdownCard(:mdSource="this.noteMd")
</template>

<script>
import Header from '../layouts/Header'
import MainLayout from '../layouts/MainLayout'
import MarkdownCard from '../components/MarkdownCard.vue'
import Vue from 'vue'

export default {
    Name: 'Note',
    components: {
        MarkdownCard,
        MainLayout,
        Header
    },
    data() {
        return {
            noteMd: '',
        }
    },
    mounted() {
        Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, '/notes/' + this.$route.params.id)).then((res) => {
            console.log(res);
            this.noteMd = res.data.content;
        })
        .catch((error) => {
            console.log(error);
            // TODO
        })
    }
}
</script>