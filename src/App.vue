<template lang="pug">
  div#app
    router-view
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
@import "./common/font/font.css";
@import 'element-ui/lib/theme-chalk/index.css';
@import 'mavon-editor/dist/css/index.css';
@import '@fortawesome/fontawesome-free/css/all.min.css';

html {
  height: 100%;
  overflow: auto;
}
body {
  background: rgb(246, 246, 246);
  min-height: 100%;
}

* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: NewFont, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}
</style>
