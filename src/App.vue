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
body{
  background: rgb(246, 246, 246);
}

* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
