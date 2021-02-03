<template lang="pug">
el-container().main-container
  el-container.home
    div(v-for="note in stared_notes" :key="note.id")
      div(v-if="val")
        ShowViewNoteCard(:id="note.id")
    div(v-if="!val")
      NothingCard
</template>

<script>
import ShowNoteCard from '@/components/ShowNoteCard'
import ShowViewNoteCard from '@/components/ShowViewNoteCard'
import NothingCard from '@/components/NothingCard'

export default {
  name: 'SartedNoteCard',
  components: {
    ShowNoteCard,
    ShowViewNoteCard,
    NothingCard
  },
  props: {
    id: {
      type: String,
      default: '',
      required: true
    },
    noteTitle: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      val: true,
      stared_notes: ''
    }
  },
  created () {
    if (this.$auth.user.stared_notes.length === 0) { this.val = false }
    this.stared_notes = this.$auth.user.stared_notes
    // axios.get(utils.composeUrl(this.$store.state.serverUrl, '/users/me'), {
    //   headers: utils.getAuthorizedHeader()
    // })
    //   .then((res) => {
    //     if (res.data.stared_notes.length === 0) { this.val = false }
    //     this.stared_notes = res.data.stared_notes
    //   })
    //   .catch(() => {
    //   // 失败 TODO
    //   })
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
.linknote{
  font-size: 20px;
  margin: auto;
}
</style>
