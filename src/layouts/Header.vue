<template lang="pug">
.header
  el-col(:span="8" type="flex" justify="start").left
    el-link.sitename(:underline="false" href="/index") Wenote 📝
    el-link(:underline="false" href="/problem") 熊宝的笔记(镇站之宝)
    el-link(:underline="false" href="/about") 关于
  el-col(:span="8" type="flex" justify="end").center
    el-autocomplete.search-input(placeholder="请输入内容" v-model="searchText" suffix-icon="el-icon-search"
                                 :fetch-suggestions="querySearchAsync" @select="handleSelect")
  el-col(:span="8" type="flex" justify="end").right
    UserInfoCard
</template>

<script>
import UserInfoCard from "@/components/UserInfoCard";
import Vue from 'vue'

export default{
  name: "Header",
  components: {
    UserInfoCard,
  },
  data() {
    return {
      notes: [],
      searchText: '',
      timeout: null
    }
  },
  methods: {
    querySearchAsync: async function(queryString, cb) {
      if(queryString.replaceAll(' ', '') == '') return cb([]);
      let notes = [];
      let fetchNote = this.fetchNote;
      Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, "/notes?title_contains=" + queryString),
        {
          headers: Vue.$getAuthorizedHeader(),
        })
      .then(async function(res) {
        for(var noteid of res.data){
          let note = await fetchNote(noteid);
          if(note) notes.push({"value": note.title, "id": note.id});
        }
      })

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(notes);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.$router.push('/viewnote/' + item.id)
      location.reload()
    },
    fetchNote: async function(id){
      let note = undefined;
      await Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, "/notes/" + id),
        {
          headers: Vue.$getAuthorizedHeader(),
        })
        .then((res) => {
          note = res.data;
        })
        .catch(() => {
          return;
        })
      return note;
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