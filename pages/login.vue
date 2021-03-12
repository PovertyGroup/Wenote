<template lang="pug">
MainLayout
  template(v-slot:header)
    Header
  LoginCard.login-card(@onLoginCreditChanged="loginCreditChanged", @onSubmit="submit" :loading="buttonLoading")
  template(v-slot:footer)
    Footer
</template>

<script>
import LoginCard from '@/components/LoginCard'
import MainLayout from '@/layouts/MainLayout'
import Header from '@/layouts/Header'
import Footer from '@/layouts/Footer'

export default {
  name: 'Login',
  components: {
    LoginCard,
    MainLayout,
    Header,
    Footer
  },
  data () {
    return {
      username: '',
      password: '',
      buttonLoading: false
    }
  },
  created () {
    if (this.$auth.loggedIn) {
      this.$router.push(`/info/${this.$auth.user.id}/`)
    }
  },
  methods: {
    loginCreditChanged (username, password) {
      this.username = username
      this.password = password
    },
    async submit () {
      this.buttonLoading = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            identifier: this.username,
            password: this.password
          }
        })
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.$router.push('/home')
      } catch (e) {
        if (e.message === 'Network Error') {
          this.$message.error('网络不太行呢~')
        } else if (!e.response || !e.response.data || !e.response.data.message) {
          this.$message.error(e.message)
        } else {
          this.$message.error(e.response.data.message.message)
        }
        this.buttonLoading = false
      }
    }
  }
}
</script>

<style scoped>
.login-card {
  margin :auto;
}
</style>
