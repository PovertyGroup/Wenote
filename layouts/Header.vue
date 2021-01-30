<template lang="pug">
.header
  el-col(:span="8" type="flex" justify="start").left
    el-link.sitename(:underline="false" href="/home") Wenote 📝
    el-link(:underline="false" href="/about") 关于
  el-col(:span="8" type="flex" justify="end").center
    el-autocomplete.search-input(placeholder="请输入内容" v-model="searchText" suffix-icon="el-icon-search"
                                 :fetch-suggestions="querySearch" @select="handleSelect")
  el-col(:span="8" type="flex" justify="end").right

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
      timeout: null
    }
  },
  methods: {
    querySearch (queryString, cb_) {
      if (queryString.replaceAll(' ', '') === '') { return cb_([]) }
      const notes = []
      const fetchNote = this.fetchNote
      axios.get(utils.composeUrl(this.$store.state.serverUrl, '/notes?title_contains=' + queryString),
        {
          headers: utils.getAuthorizedHeader()
        })
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
      location.reload()
    },
    async fetchNote (id) {
      let note
      await axios.get(utils.composeUrl(this.$store.state.serverUrl, '/notes/' + id),
        {
          headers: utils.getAuthorizedHeader()
        })
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
  height: 50px;
  background: #ffffff;
  box-shadow: 0 3px 2px #6ba9f0c0;
  display: flex;
}

.header * {
  margin: auto;
}

.left {
  width: auto;
  margin-left: 2%;
}

.left * {
  margin: auto 10px;
  font-size: 15px;
}

.left :first-child {
  margin-left: 0;
}

.sitename {
  font-size: 30px;
  margin-left: 30px;
}
.right {
  width: auto;
  margin-right: 1%;
  margin-left: auto;
}

.right :last-child{
  margin-right: 0;
}

.center{
  width: auto;
  margin: auto;
}

.search-input{
  width: 300px;
}
</style>
