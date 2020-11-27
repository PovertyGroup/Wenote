<template lang="pug">
MainLayout
  template(v-slot:header)
    Header
  template(v-slot:footer)
    Footer
  LoginCard.login-card(@onLoginCreditChanged="loginCreditChanged", @onSubmit="submit")
  template(v-slot:footer)
    Footer
</template>

<script>
import Vue from "vue";
import LoginCard from "@/components/LoginCard";
import MainLayout from "@/layouts/MainLayout";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer"

export default {
  name: "Login",
  components: {
    LoginCard,
    MainLayout,
    Header,
    Footer,
  },
  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginCreditChanged(username, password) {
      this.username = username;
      this.password = password;
    },
    submit() {
      const loading = this.$loading({
        lock: true,
        text: "Wenote书写登录中...",
        spinner: "el-icon-loading",
        background: "rgba(217,229, 247, 0.9)",
      });
      Vue.$axios
        .post(Vue.$composeUrl(Vue.$baseUrl, "/auth/local"), {
          identifier: this.username,
          password: this.password,
        })
        .then((response) => {
          loading.close();
          this.$message({
            message: "登陆成功",
            type: "success",
          });
          Vue.$jwt.set(response.data.jwt);
          console.log(response.data);
          Vue.$axios
            .get(Vue.$composeUrl(Vue.$baseUrl, "/notes/mine"), {
              headers: Vue.$getAuthorizedHeader(),
            })
            .then((res) => {
              // TODO
              console.log(res.data);
            });
          this.$router.push("/index");
        })
        .catch((error) => {
          loading.close();
          if (error.message === "Network Error") {
            this.$message.error("爬");
          } else {
            this.$message.error(error.response.data.message.message);
          }
        });
    },
  },
};
</script>

<style scoped>
.login-card {
  margin: auto;
  display: flex;
  flex-direction: column;
}
</style>