<template lang="pug">
.owned-notes-wrap
  div(v-if="val" v-for="note in notes" :key="note").note-card
    ShowViewNoteCard(:id="note")
  div(v-else)
    NothingCard
</template>

<script>
import ShowViewNoteCard from '@/components/ShowViewNoteCard'
import NothingCard from '@/components/NothingCard'

export default {
  name: 'MyNoteCard',
  components: {
    ShowViewNoteCard,
    NothingCard
  },
  data () {
    return {
      val: true,
      notes: []
    }
  },
  created () {
    if (this.$auth.loggedIn) {
      if (this.$auth.user.notes.length === 0) { this.val = false }
      this.notes = this.$auth.user.notes
    }
  }
}
</script>

<style scoped>
.owned-notes-wrap{
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
  .owned-notes-wrap{
    width: 80%;
  }
}

@media screen and (max-width: 1100px) {
  .owned-notes-wrap{
    width: 90%;
  }
}

@media screen and (max-width: 900px) {
  .owned-notes-wrap{
    width: 100%;
  }
}
</style>
