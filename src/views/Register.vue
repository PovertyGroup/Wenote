<template lang="pug">
    MainLayout
        template(v-slot:header)
            Header
        RegisterCard
        template(v-slot:footer)
            Footer
</template>

<script>
import Header from '@/layouts/Header'
import MainLayout from '@/layouts/MainLayout'
import RegisterCard from '@/components/RegisterCard'
import Footer from '@/layouts/Footer'

export default {
    Name: 'Register',
    components: {
        Header,
        MainLayout,
        RegisterCard,
        Footer
    }
}
</script>

<style>
</style>
