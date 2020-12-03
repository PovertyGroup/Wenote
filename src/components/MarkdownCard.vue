<template lang="pug">
div
    link(rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css")
    link(rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css")
    div(v-html="this.mdHtml").md-wrap.markdown-body
</template>

<script>
var md = require('markdown-it')(),
    mk = require('markdown-it-katex');
md.use(mk);

export default {
    name: 'MarkdownCard',
    props: {
        mdSource: String,
    },
    computed: {
        mdHtml: function() {
            return md.render(this.mdSource);
        }
    }
}
</script>

<style scoped>
.md-wrap{
    margin: 0;
    padding: 10px;
    line-height: 2rem;
    text-align: left;
}

h1, h2, h3 {
    margin-bottom: 10px;
}
</style>