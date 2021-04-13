<template lang="pug">
.info
  el-card.home-note.folded
    .user-avatar
      el-avatar(:size="80" :src="this.avatar")
    .user-info-name
      i.far.envelope
      span.user-name {{this.name}}
    .user-info-else
      i.far.fa-envelope
      span.user-email {{this.email}}
      i.fas.fa-mars(v-if="this.gender=='boy'")
      i.fas.fa-venus(v-if="this.gender=='girl'")
      span.user-followers 关注者: {{this.followers.length}}
      span.user-followees 粉丝: {{this.followees.length}}
      span.user-notes 文章数: {{this.notes.length}}
  div.note-container(v-for = "note in notes" :key="note")
    ShowViewNoteCard(:id="note")
</template>

<script>
import axios from 'axios'
import utils from '@/util/utils'
export default {
  name: 'PeopleCard',
  data () {
    return {
      name: '',
      avatar: '',
      gender: '',
      notes: '',
      email: '',
      bio: '',
      likes: '',
      followers: '',
      followees: ''
    }
  },
  created () {
    axios.get(utils.composeUrl(this.$store.state.serverUrl, '/users/' + this.$route.params.id))
      .then((res) => {
        this.name = res.data.username
        this.avatar = res.data.avatar.url
        this.gender = res.data.gender
        this.email = res.data.email
        this.bio = res.data.bio
        this.likes = res.data.likes
        this.followers = res.data.followers
        this.followees = res.data.followees
        this.notes = res.data.notes
        if(this.gender === "unknown")
          this.gender = '未公开'
        this.avatar = utils.composeUrl(this.$store.state.serverUrl, this.avatar)
        console.log(res)
      })
      .catch((e) => {
      })
  }
}
</script>

<style scoped>
.info{
  text-align: center;
  width: 100%;
}

.far,.fas {
  margin: auto 5px;
}

.home-note.folded {
  margin: auto;
  width: 80%;
  margin-top: 20px;
}

.user-name {
  font-weight: bold;
  font-size: 20px;
}

.user-email{
  margin: auto 10px auto 5px;
}

.user-followers, .user-followees{
  margin: auto 10px auto;
}
.note-container{
  width: 75%;

  margin: auto;
}
</style>
