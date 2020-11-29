import Vue from 'vue'
import VueRouter from 'vue-router'

import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/views/Login.vue'
import Note from '@/views/Note.vue'
import Index from '@/views/Index.vue'
import Register from '@/views/Register.vue'
import PageNotFound from '@/views/404.vue'
Vue.use(VueRouter);

const routes = [
    { path: '/home', component: HelloWorld },
    { path: '/login', component: Login },
    { path: '/note/:id', component: Note },
    { path: '/index', component: Index },
    { path: '/about', redirect: '/note/5fb922d85703375b1ccf28dc' },
    { path: '/problem', redirect: 'note/5fbe48fb43facc04e2ddd7a7' },
    { path: '/register', component: Register },
    { path: '/404', component: PageNotFound },
    { path: '*', redirect: '/404' }
]

export default new VueRouter({
    mode: 'history',
    routes: routes,
})