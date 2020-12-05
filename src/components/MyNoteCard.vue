<template lang="pug">
el-container().main-container
  el-container.home
      div(v-for="note in user.notes" :key="note").note-card
        ShowNoteCard(:id="note")
</template>


<script>
import Vue from 'vue';
import ShowNoteCard from "@/components/ShowNoteCard";
import ShowViewNoteCard from "@/components/ShowViewNoteCard"

export default {
  name: "MyNoteCard",
  components :{
    ShowNoteCard,
    ShowViewNoteCard
  },
  created (){
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl,'/users/me'),{
      headers: Vue.$getAuthorizedHeader(),
    })
    .then((res) => {
        this.user.notes = res.data.notes
    })
    .catch(() => {
      // 失败
    })
  },
  data() {
    if(Vue.$jwt.get() != undefined) {
      return {
        user : {
          name: '',
          avatar: '',
          followees: '',
          followers: '',
          gender: '',
          likes: '',
          notes: '',
          stard_notes: '',
          email: '',
        }
      }
    }
  },
  props:{
    id:String,
    noteTitle:String,
  },
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

</style>>
