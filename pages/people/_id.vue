<template lang="pug">
MainLayout
  template(v-slot:header)
    Header
  PeopleCard
  template(v-slot:footer)
    Footer
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import Header from '@/layouts/Header'
import Footer from '@/layouts/Footer'
import PeopleCard from '@/components/PeopleCard'

export default {
  name: 'People',
  components: {
    MainLayout,
    Header,
    Footer,
    PeopleCard
  }
}

</script>
