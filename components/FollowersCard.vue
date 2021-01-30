<template lang="pug">
el-container().main-container
  el-container.home
    div(v-for="fr in followers" :key="fr").fr-card
      div(v-if="val").fr-list
        ShowFollowersCard(:frid="fr")
        .line
    div(v-if="!val")
      NothingCard
</template>

<script>
import ShowFollowersCard from '@/components/ShowFollowersCard'
import NothingCard from '@/components/NothingCard'
import axios from 'axios'
import utils from '../util/utils'

export default {
  name: 'FolloweesCard',
  components: {
    ShowFollowersCard,
    NothingCard
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    if (utils.store.jwt) {
      return {
        followers: '',
        val: true
      }
    }
  },
  created () {
    axios.get(utils.composeUrl(this.$store.state.serverUrl, '/users/me'),
      { headers: utils.getAuthorizedHeader() })
      .then((res) => {
        if (res.data.followers.length === 0) { this.val = false }
        this.followers = res.data.followers
      })
      .catch(() => {
      // 失败
      })
  }
}
</script>

<style scoped>
.home{
  margin: auto;
  display: flex;
  flex-wrap:wrap;
  width: fit-content;
  max-width: 100%;
  justify-content: center;
  margin: auto 50px auto 50px;
}
.linknote{
  margin: auto;
  font-size: 20px;
}
.note-card{
  margin: 0 40px 30px 0;
}
.fr-card{
  padding:0 20px 20px;
}
.line {
  width: 97% ;
  height: 0.5px;
  margin: 1px;
  background: #000;
}
</style>
