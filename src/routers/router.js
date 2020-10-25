import Vue from 'vue'
import VueRouter from 'vue-router'

import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/login', component: Login}
  ]

export default new VueRouter({
    mode: 'history',
    routes: routes,
})