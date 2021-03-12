<template lang="pug">
.header
  ul.nav
    li.nav-item
      NuxtLink.nuxtlink.sitename.black-link(to="/home") Wenote
    li.nav-item.about
      NuxtLink.nuxtlink.black-link(to="/about") 关于
    li.nav-item.tou
      NuxtLink.nuxtlink.termlink.black-link(to="/terms-of-use") 用户协议
    li.nav-item.client-download
      NuxtLink.nuxtlink.termlink.black-link(to="/downloads") 客户端下载
  ul.action
    li.action-item
      el-autocomplete.search-input(placeholder="搜索笔记" v-model="searchText" suffix-icon="el-icon-search" :class="searchBoxFocused ? 'focused' : ''"
        :fetch-suggestions="querySearch" @select="handleSelect" size="mini" @focus="searchBoxFocused = true" @blur="searchBoxFocused = false")
    li.action-item
      UserInfoCard
</template>

<script>
import UserInfoCard from '@/components/UserInfoCard'
import axios from 'axios'
import utils from '@/util/utils'

export default {
  name: 'Header',
  components: {
    UserInfoCard
  },
  data () {
    return {
      notes: [],
      searchText: '',
      timeout: null,
      searchBoxFocused: false
    }
  },
  methods: {
    querySearch (queryString, cb_) {
      if (queryString.replaceAll(' ', '') === '') { return cb_([]) }
      const notes = []
      const fetchNote = this.fetchNote
      axios.get(utils.composeUrl(this.$store.state.serverUrl, '/notes?title_contains=' + queryString))
        .then(async function (res) {
          for (const noteid of res.data) {
            const note = await fetchNote(noteid)
            if (note) { notes.push({ value: note.title, id: note.id }) }
          }
        })

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb_(notes)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      this.$router.push('/viewnote/' + item.id)
    },
    async fetchNote (id) {
      let note
      await axios.get(utils.composeUrl(this.$store.state.serverUrl, '/notes/' + id))
        .then((res) => {
          note = res.data
        })
        .catch(() => {

        })
      return note
    }
  }
}
</script>

<style scoped>
.header {
  line-height: 60px;
  height: 60px;
  background: #ffffffb5;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 20%);
  position:absolute;
  width: 100vw;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav {
  float: left;
  padding: 0;
  height: 100%;
  margin: 0;
}

.nav .nav-item {
  float: left;
  list-style: none;
  position: relative;
  margin: 0 20px 0 0;
  height: 100%;
}

.action{
  float: right;
  padding: 0;
  height: 100%;
  margin: 0;
}

.action-item{
  float: left;
  list-style: none;
  position: relative;
  margin: 0;
}

.action-item:first-child{
  margin-right: 20px;
}

.sitename {
  font-size: 30px;
  margin-left: 30px;
}

.search-input {
  width: 100px;
  transition: 0.5s;
}

.search-input.focused {
  width: 200px;
}

@media screen and (max-width: 650px) {
  .tou {
    display: none;
  }
}

@media screen and (max-width: 570px) {
  .client-download {
    display: none;
  }
}

@media screen and (max-width: 520px) {
  .sitename {
    font-size: 20px;
    margin-left: 30px;
  }
  .action-item:first-child{
    margin-right: 10px;
  }
  .search-input.focused {
    width: 150px;
  }
}

@media screen and (max-width: 320px) {
  .about{
    display: none;
  }
}
</style>
