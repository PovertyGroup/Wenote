<template lang="pug">
.stared-notes-wrap
  div(v-if="val" v-for="note in stared_notes" :key="note.id").note-card
    ShowViewNoteCard(:id="note.id")
  div(v-else)
    NothingCard
</template>

<script>
import ShowViewNoteCard from '@/components/ShowViewNoteCard'
import NothingCard from '@/components/NothingCard'

export default {
  name: 'SartedNoteCard',
  components: {
    ShowViewNoteCard,
    NothingCard
  },
  data () {
    return {
      val: true,
      stared_notes: []
    }
  },
  created () {
    if (this.$auth.loggedIn) {
      if (this.$auth.user.stared_notes.length === 0) { this.val = false }
      this.stared_notes = this.$auth.user.stared_notes
    }
  }
}
</script>

<style scoped>
.stared-notes-wrap{
  margin: auto;
  width: 70%;
  align-content: center;
  display: flex;
  flex-direction: column;
}

.note-card{
  margin: 0 0 30px 0;
}

@media screen and (max-width: 1300px) {
  .stared-notes-wrap{
    width: 80%;
  }
}

@media screen and (max-width: 1100px) {
  .stared-notes-wrap{
    width: 90%;
  }
}

@media screen and (max-width: 900px) {
  .stared-notes-wrap{
    width: 100%;
  }
}
</style>
