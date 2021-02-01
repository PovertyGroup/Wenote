<template lang="pug">
MainLayout
  template(v-slot:header)
    Header
  LoginCard.login-card(@onLoginCreditChanged="loginCreditChanged", @onSubmit="submit")
  template(v-slot:footer)
    Footer
</template>

<script>
import axios from 'axios'
import utils from '@/util/utils'
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
  asyncData ({ store }) {
    utils.initStore(store)
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  mounted () {
    if (utils.store.jwt) {
      this.$message({
        message: '你已经登陆过了',
        info: 'success'
      })
      this.$router.push('/home')
    }
  },
  methods: {
    loginCreditChanged (username, password) {
      this.username = username
      this.password = password
    },
    submit () {
      const loading = this.$loading({
        lock: true,
        text: 'Wenote书写登录中...',
        spinner: 'el-icon-loading',
        background: 'rgba(217,229, 247, 0.9)'
      })
      axios
        .post(utils.composeUrl(this.$store.state.serverUrl, '/auth/local'), {
          identifier: this.username,
          password: this.password
        })
        .then((response) => {
          loading.close()
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
          utils.initStore(this.$store)
          utils.store.jwt = response.data.jwt
          utils.store.info = response.data.user.id
          this.$router.push('/home')
        })
        .catch((error) => {
          loading.close()
          if (error.message === 'Network Error') {
            this.$message.error('网络不太行呢~')
          } else {
            this.$message.error(error.response.data.message.message)
          }
        })
    }
  }
}
</script>

<style scoped>
.login-card {
  margin :auto;
}
</style>
