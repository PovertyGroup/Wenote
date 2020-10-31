<template lang="pug">
  MainLayout
    template(v-slot:header)
        Header
    LoginCard(@onLoginCreditChanged="loginCreditChanged").login-card
</template>

<script>
import Vue from 'vue'
import LoginCard from '@/components/LoginCard'
import MainLayout from '@/layouts/MainLayout'
import Header from '@/layouts/Header'

Vue.use(LoginCard)

export default {
    name: 'Login',
    components: {
        LoginCard,
        MainLayout,
        Header
    },
    data: function() {
        return {
            'username': "",
            'password': "",
        }
    },
    methods: {
        loginCreditChanged(username, password){
            this.username = username;
            this.password = password;
        }
    }
}
</script>

<style scoped>
.login-card{
    margin: auto;
}
</style>