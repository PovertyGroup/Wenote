<template lang="pug">
MainLayout
  template(v-slot:header)
    Header
  RegisterCard.registerCard(@onLoginCreditChanged="loginCreditChanged",@onSubmit="submit")
  template(v-slot:footer)
    Footer
</template>

<script>
import axios from 'axios'

import Header from '@/layouts/Header'
import MainLayout from '@/layouts/MainLayout'
import RegisterCard from '@/components/RegisterCard'
import Footer from '@/layouts/Footer'
import utils from '@/util/utils'

export default {
  Name: 'Register',
  components: {
    Header,
    MainLayout,
    RegisterCard,
    Footer
  },
  asyncData ({ store }) {
    utils.initStore(store)
  },
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    loginCreditChanged (username, email, password) {
      this.username = username
      this.email = email
      this.password = password
    },
    submit () {
      const loading = this.$loading({
        lock: true,
        text: 'Wenote 正在记录你的信息...',
        spinner: 'el-icon-loading',
        background: 'rgba(217,229, 247, 0.9)'
      })
      axios
        .post(utils.composeUrl(this.$store.state.serverUrl, '/auth/local/register'), {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(() => {
          loading.close()
          this.$message({
            message: '注册成功,请前往邮箱点击验证邮件！',
            type: 'success'
          })
          // console.log(response.data);
          // axios
          //   .get(utils.composeUrl(this.$store.state.serverUrl, "/notes/mine"), {
          //     headers: utils.getAuthorizedHeader(),
          //   })
          //   .then((res) => {
          //     // TODO
          //     console.log(res.data);
          //   });
          // this.$router.push("/index");
          setTimeout(() => {
            this.$router.push('/login')
          }, 5000)
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

<style>

</style>
