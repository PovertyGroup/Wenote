<template lang="pug">
el-container().main-container
  el-container.home
      div(v-for="note in user.stared_notes" :key="note.id").note-card
        ShowViewNoteCard(:id="note.id")
</template>


<script>
import Vue from 'vue';
import ShowNoteCard from "@/components/ShowNoteCard";
import ShowViewNoteCard from "@/components/ShowViewNoteCard";
export default {
  name: "MyNoteCard",
  components :{
    ShowNoteCard,
    ShowViewNoteCard,
  },
  created (){
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl,'/users/me'),{
      headers: Vue.$getAuthorizedHeader(),
    })
    .then((res) => {
        this.$set(this.user,"name",res.data.username)
        this.$set(this.user,"gender",res.data.gender)
        this.$set(this.user,"followees",res.data.followees)
        this.$set(this.user,"followers",res.data.followers)
        this.$set(this.user,"email",res.data.email)
        this.$set(this.user,"likes",res.data.likes)
        this.user.stared_notes = res.data.stared_notes
        if(res.data.avatar)
          this.$set(this.user,"avatar",Vue.$baseUrl.substring(0,Vue.$baseUrl.length-1)+res.data.avatar.url)
        else
          this.$set(this.user,"avatar","https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png")
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
          stared_notes: '',
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
.linknote{
  font-size: 20px;
  margin: auto;
}

</style>>
