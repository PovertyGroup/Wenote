<template lang="pug">
el-container().main-container
  el-container.home
    div(v-for="fr in followers" :key="fr").fr-card
      div(v-if="val").fr-list
        ShowFollowersCard(:frid="fr")
        .line
    div(v-if="!val")
      NothingCard
</template>


<script>
import Vue from 'vue';
import ShowFollowersCard from "@/components/ShowFollowersCard";
import NothingCard from "@/components/NothingCard"

export default {
  name: "FolloweesCard",
  components :{
    ShowFollowersCard,
    NothingCard
  },
  created (){
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl,'/users/me'),
                  {headers: Vue.$getAuthorizedHeader(),})
    .then((res) => {
      if (res.data.followers.length == 0)
        this.val = false
      this.followers = res.data.followers
    })
    .catch(() => {
      // 失败
    })
  },
  data() {
    if(Vue.$jwt.get() != undefined) {
      return {
        followers:'',
        val:true
      }
    }
  },
  props:{
    id:String,
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
.linknote{
  margin: auto;
  font-size: 20px;
}
.note-card{
  margin: 0 40px 30px 0;
}
.fr-card{
  padding:0 20px 20px;
}
.line {
  width: 97% ;
  height: 0.5px;
  margin: 1px;
  background: #000;
}
</style>
