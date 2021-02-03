<template lang="pug">
el-container().main-container
  el-container.home
    div(v-for="note in notes" :key="note").note-card
      div(v-if="val")
        ShowNoteCard(:id="note")
    div(v-if="!val")
      NothingCard
</template>

<script>
import ShowNoteCard from '@/components/ShowNoteCard'
import NothingCard from '@/components/NothingCard'

export default {
  name: 'MyNoteCard',
  components: {
    ShowNoteCard,
    NothingCard
  },
  data () {
    return {
      val: true,
      notes: []
    }
  },
  created () {
    if (this.$auth.user.notes.length === 0) { this.val = false }
    this.notes = this.$auth.user.notes
  }
}
</script>

<style scoped>
.home{
  margin: auto;
  display: flex;
  flex-wrap:wrap;
  width: fit-content;
  max-width: 100%;
  justify-content: center;
  margin: auto 50px auto 50px;
}

.note-card{
  margin: 0 40px 30px 0;
}
</style>
