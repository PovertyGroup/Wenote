<template lang="pug">
  MainLayout
    template(v-slot:header)
        Header
    link(rel="stylesheet" href="https://cdn.jsdelivr.net/npm/morioh/dist/css/morioh.min.css")
    div.editor-wrap(v-if="!this.noSuchNote")
        //- markdown-editor.editor(:options="editorOptions" v-model="noteMd" theme="primary" height="auto")
        MarkdownCard.md-card(:mdSource="this.noteMd")
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
            editorOptions: {
                lineNumbers: false,
                styleActiveLine: true,
                styleSelectedText: true,
                lineWrapping: true,
                indentWithTabs: true,
                tabSize: 2,
                indentUnit: 2
            }
        }
    },
    mounted() {
        console.log(Vue.$jwt[0]);
        Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, '/notes/' + this.$route.params.id)).then((res) => {
            this.noteMd = res.data.content;
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

.editor-wrap{
    margin: 0 auto;
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: row;
}

.editor{
    margin-left: 10px;
    width: calc(50% - 30px);
    margin-right: 40px;
}

.md-card{
    margin-right: 10px;
    width: calc(50% - 30px);
}

</style>