<template lang="pug">
  div.home
      div(v-for="note in user.notes" :key="note") 
        ShowNoteCard(:id="note")
        el-link(type = "info" :href="'/note/'+note").linknote 查看
</template>


<script>
import Vue from 'vue';
import ShowNoteCard from "@/components/ShowNoteCard";
export default {
  name: "InfoHome",
  components :{
    ShowNoteCard,
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
        this.user.notes = res.data.notes
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

<style>
.home{
  margin: auto;
}
.linknote{
  font-size: 20px;
}

</style>>
