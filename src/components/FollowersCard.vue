<template lang="pug">
el-container().main-container
  el-container.home
      div(v-for="fr in followers" :key="fr").fe-card
        ShowUserCard(:id="fr")
</template>


<script>
import Vue from 'vue';
import ShowUserCard from "@/components/ShowUserCard";
export default {
  name: "FolloweesCard",
  components :{
    ShowUserCard,
  },
  created (){
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl,'/users/me'),{
      headers: Vue.$getAuthorizedHeader(),
    })
    .then((res) => {
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

</style>>
