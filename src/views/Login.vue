<template lang="pug">
  div
    LoginCard(:username.sync="this.username" :password.sync="this.password").login-card
</template>

<script>
import Vue from 'vue'
import LoginCard from '@/components/LoginCard'

Vue.use(LoginCard)

export default {
    name: 'Login',
    components: {
        LoginCard
    },
    data: function() {
        return {
            'username': "",
            'password': "",
        }
    }
}
</script>

<style scoped>
.login-card{
    margin: auto;
}
</style>