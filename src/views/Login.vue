<template lang="pug">
  MainLayout
    template(v-slot:header)
        Header
    LoginCard(@onLoginCreditChanged="loginCreditChanged" @onSubmit="submit").login-card
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
        },
        submit() {
            Vue.$axios.post(Vue.$composeUrl(Vue.$baseUrl, '/auth/local'), {
                identifier: this.username,
                password: this.password
            })
            .then((response) => {
                this.$message({
                    message: "登陆成功",
                    type: 'success'
                })
                this.$jwt = response.data.jwt;
                console.log(this.$jwt);
            })
            .catch(error => {
                this.$message.error(error.response.data.message.message);
            })
        }
    }
}
</script>

<style scoped>
.login-card{
    margin: auto;
    display: flex;
    flex-direction: column;
}
</style>