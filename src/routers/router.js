import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Note from '@/views/Note.vue'
import ViewNote from '@/views/ViewNote.vue'
import Index from '@/views/Index.vue'
import Register from '@/views/Register.vue'
import PageNotFound from '@/views/404.vue'
import Info from '@/views/Info.vue'
Vue.use(VueRouter);

const routes = [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/note/:id', component: Note },
    { path: '/viewnote/:id', component: ViewNote },
    { path: '/index', component: Index },
    { path: '/', redirect: '/home' },
    { path: '/about', redirect: '/viewnote/5fb922d85703375b1ccf28dc' },
    { path: '/problem', redirect: '/viewnote/5fbe48fb43facc04e2ddd7a7' },
    { path: '/register', component: Register },
    { path: '/info/:uid', component: Info },
    { path: '/404', component: PageNotFound },
    { path: '*', redirect: '/404' },
]

export default new VueRouter({
    mode: 'history',
    routes: routes,
})