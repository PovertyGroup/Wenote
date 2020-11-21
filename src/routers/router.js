import Vue from 'vue'
import VueRouter from 'vue-router'

import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/views/Login.vue'
import Note from '@/views/Note.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/login', component: Login},
    { path: '/note/:id', component:Note }
  ]

export default new VueRouter({
    mode: 'history',
    routes: routes,
})