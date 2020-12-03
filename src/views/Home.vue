<template lang="pug">
MainLayout
  template(v-slot:header)
    Header
  template(v-slot:footer)
    Footer
  HomeCard
</template>

<script>
import Vue from "vue";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer"

export default{
  name: "Home",
  components: {
    Header,
    Footer,
  },
  created(){
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, "/recommand"),{
      headers: Vue.$getAuthorizedHeader(),
    })
    .then((res)=>{
      console.log(res.data)
    })
  }
}
</script>