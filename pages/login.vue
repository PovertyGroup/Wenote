<template lang="pug">
MainLayout
  template(v-slot:header)
    Header
  LoginCard.login-card(@onLoginCreditChanged="loginCreditChanged", @onSubmit="submit")
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
      password: ''
    }
  },
  methods: {
    loginCreditChanged (username, password) {
      this.username = username
      this.password = password
    },
    async submit () {
      const loading = this.$loading({
        lock: true,
        text: 'Wenote书写登录中...',
        spinner: 'el-icon-loading',
        background: 'rgba(217,229, 247, 0.9)'
      })
      try {
        await this.$auth.loginWith('local', {
          data: {
            identifier: this.username,
            password: this.password
          }
        })
        loading.close()
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.$router.push('/home')
      } catch (e) {
        loading.close()
        if (e.message === 'Network Error') {
          this.$message.error('网络不太行呢~')
        } else if (!e.response || !e.response.data || !e.response.data.message) {
          this.$message.error(e.message)
        } else {
          this.$message.error(e.response.data.message.message)
        }
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
