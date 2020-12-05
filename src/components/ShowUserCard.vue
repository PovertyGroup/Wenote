<template lang="pug">
div
  p() {{followees}}
</template>

<script>
import Vue from 'vue'
export default {
  name :"ShowNoteCard",
  data(){
    return{
        noteTitle: "",
        noteMd:"",
        createdtime:"",
        updatatime:"",
        author:"",
        noteUrl:"",
        followees:""
    }
  },
  props : {
    id: String,
  },
  created(){
    Vue.$axios.get(Vue.$composeUrl(Vue.$baseUrl, "/notes/" + this.id), {
    })
    .then((res)=>{
      this.followees = res.data.followees
    })
  },
}
</script>

<style scoped>
.note {
  height: 225px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.747);
  border: solid 1px rgb(77, 77, 77);
}

.note-head {
  height: 40px;
  width: inherit;
}

#note-icon {
  font-size: 22px;
}

.note-title span {
  display: inline-block;
  margin-left: 6px;
}
.note-title {
  width: 300px;
  font-size: 20px;
  line-height: 40px;
  float: left;
  text-align: left;
  padding-left: 10px;
}

.line {
  width: 355px;
  height: 0.5px;
  margin: 2px;
  background: #000;
}

.note-info {
  width: 300px;
  text-align: left;
}

.note-content {
  width: 280px;
  font-size: 18px;
  display: block;
  padding-left: 10px;
  margin: 10px 0 10px 0;
}

#content {
  margin-top: 15px;
}
</style>

