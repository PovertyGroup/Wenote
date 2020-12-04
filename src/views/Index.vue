<template lang="pug">
MainLayout
  template(v-slot:footer)
    Footer
  IndexCard
</template>

<script>
import Header from "../layouts/Header";
import MainLayout from "../layouts/MainLayout";
import IndexCard from "@/components/IndexCard"

export default {
  Name: "Index",
  components: {
    MainLayout,
    Header,
    IndexCard,
  },
};
</script>

<style>
</style>