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
import ShowFolloweesCard from '@/components/ShowFolloweesCard'
import NothingCard from '@/components/NothingCard'

export default {
  name: 'FolloweesCard',
  components: {
    ShowFolloweesCard,
    NothingCard
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      followees: '',
      val: true
    }
  },
  created () {
    try {
      // TO BE VERIFY
      if (this.$auth.user.followees.length === 0) { this.val = false }
      this.followees = this.$auth.user.followees
    } catch (e) {
      // 失败
    }
  }
}
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
