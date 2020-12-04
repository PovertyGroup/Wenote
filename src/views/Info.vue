<template lang="pug">
div.info
   AsideLayout
    template(slot="header")
      Header
    template(slot="aside")
      InfoAside
    template(slot="main")
      InfoHome
      //- InfoSetting.setting
    template(slot="footer")
      Footer
</template>

<script>
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import InfoAside from "@/components/InfoAside";
import MainLayout from "@/layouts/MainLayout";
import AsideLayout from "@/layouts/AsideLayout";
import InfoHome from "@/components/InfoHome"
import InfoSetting from "@/components/InfoSetting"

export default {
  name: "Info",
  components: {
    InfoAside,
    Footer,
    InfoHome,
    MainLayout,
    InfoSetting,
    AsideLayout,
    Header,
  },
  methods(){
    },
  data() {
    return{
        value: false
    }
  },
};
</script>

<style>

</style>
