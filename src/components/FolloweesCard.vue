<template lang="pug">
el-container().main-container
  el-container.home
    div(v-for="fe in followees" :key="fe").fe-card
      div(v-if="val")
        ShowFolloweesCard(:feid="fe")
    div(v-if="!val")
      NothingCard
</template>


<script>
import Vue from "vue";
import ShowFolloweesCard from "@/components/ShowFolloweesCard";
import NothingCard from "@/components/NothingCard";

export default {
  name: "FolloweesCard",
  components: {
    ShowFolloweesCard,
    NothingCard,
  },
  created() {
    Vue.$axios
      .get(Vue.$composeUrl(Vue.$baseUrl, "/users/me"), {
        headers: Vue.$getAuthorizedHeader(),
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
    if (Vue.$jwt.get() != undefined) {
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
.note-card {
  margin: 0 40px 30px 0;
}
</style>
