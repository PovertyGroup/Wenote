<template lang="pug">
div
  p {{this.username}}
</template>

<script>
import Vue from 'vue'
export default {
  name :"ShowNoteCard",
  data(){
    return{
      username:"",
    }
  },
  props : {
    id: String,
  },
  created(){
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl,'/users/'+ this.id), {
    })
    .then((res)=>{
      this.username = res.data.username
    })
  },
}
</script>

<style scoped>
</style>

