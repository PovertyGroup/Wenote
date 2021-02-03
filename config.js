export default {
  serverUrl: 'http://8.131.62.225:443/',
  siteUrl: 'http://8.131.62.225/',
  mavonEditorExternalLink: {
    markdown_css () {
      return 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css'
    },
    hljs_js () {
      return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/highlight.min.js'
    },
    hljs_css (css) {
      return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/' + css + '.min.css'
    },
    hljs_lang (lang) {
      return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/languages/' + lang + '.min.js'
    },
    katex_css () {
      return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/katex.min.css'
    },
    katex_js () {
      return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/katex.min.js'
    }
  }
}
