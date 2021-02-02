<template lang="pug">
.footer
  div.about-wrap
    img(src="/icon.png" style="height: 48px; width: 48px;")
    .texts
      h1 Wenote
      p.contrib Created by sheey & T-Fate & Codgi with ❤️
</template>

<style scoped>
/* can not set the height */
.footer {
  padding: 40px 60px;
  font-size: 15px;
}

.about-wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
}

p, h1 {
  margin: 0;
}

h1 {
  font-weight: normal;
}

.texts{
  margin-left: 10px;
}

.contrib{
  font-family: 'Times New Roman', Times, serif;
}
</style>
