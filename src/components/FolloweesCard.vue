<template lang="pug">
el-container().main-container
  el-container.home
    div(v-for="fe in followees" :key="fe").fe-card
      div(v-if="val")
        ShowFolloweesCard(:feid="fe")
        .line
    div(v-if="!val")
      NothingCard
</template>


<script>
// import Vue from "vue";
import ShowFolloweesCard from "@/components/ShowFolloweesCard";
import NothingCard from "@/components/NothingCard";
import axios from 'axios'
import utils from '../util/utils'

export default {
  name: "FolloweesCard",
  components: {
    ShowFolloweesCard,
    NothingCard,
  },
  created() {
    axios
      .get(utils.composeUrl(this.$store.state.serverUrl, "/users/me"), {
        headers: utils.getAuthorizedHeader(),
      })
      .then((res) => {
        if (res.data.followees.length == 0) this.val = false;
        this.followees = res.data.followees;
      })
      .catch(() => {
        // 失败
      });
  },
  data() {
    if (utils.store.jwt != undefined) {
      return {
        followees: "",
        val: true,
      };
    }
  },
  props: {
    id: String,
  },
};
</script>

<style scoped>
.home {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  max-width: 100%;
  justify-content: center;
  margin: auto 50px auto 50px;
}
.linknote {
  margin: auto;
  font-size: 20px;
}
.fe-card {
  margin: 0 20px 20px;
}
.line {
  width: 97% ;
  height: 0.5px;
  margin: 1px;
  background: #000;
}
</style>
