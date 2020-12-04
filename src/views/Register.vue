<template lang="pug">
MainLayout
  template(v-slot:header)
    Header
  RegisterCard.registerCard(@onLoginCreditChanged="loginCreditChanged",@onSubmit="submit")
  template(v-slot:footer)
    Footer
</template>

<script>
import Vue from "vue";
import Header from "@/layouts/Header";
import MainLayout from "@/layouts/MainLayout";
import RegisterCard from "@/components/RegisterCard";
import Footer from "@/layouts/Footer";

export default {
  Name: "Register",
  components: {
    Header,
    MainLayout,
    RegisterCard,
    Footer,
  },
  data: function () {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    loginCreditChanged(username, email,password) {
      this.username = username;
      this.email = email;
      this.password = password;
    },
    submit() {
      const loading = this.$loading({
        lock: true,
        text: "Wenote正在记录你的信息...",
        spinner: "el-icon-loading",
        background: "rgba(217,229, 247, 0.9)",
      });
      Vue.$axios
        .post(Vue.$composeUrl(Vue.$baseUrl, "/auth/local/register"), {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          loading.close();
          this.$message({
            message: "注册成功",
            type: "success",
          });
          Vue.$jwt.set(response.data.jwt);
          console.log(response.data);
          // Vue.$axios
          //   .get(Vue.$composeUrl(Vue.$baseUrl, "/notes/mine"), {
          //     headers: Vue.$getAuthorizedHeader(),
          //   })
          //   .then((res) => {
          //     // TODO
          //     console.log(res.data);
          //   });
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

<style>

</style>
