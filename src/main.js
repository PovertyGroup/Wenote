import Vue from 'vue'
import App from './App.vue'
import store from './store/index'

// axios configuration and utils
// import axios from 'axios'

// Vue.$baseUrl = 'http://8.131.62.225:443/'
// Vue.$siteUrl = 'http://8.131.62.225/'
// axios = axios
// utils.composeUrl = function(baseUrl, path) {
//     if (baseUrl.endsWith('/') && !path.startsWith('/'))
//         return baseUrl + path
//     else if (baseUrl.endsWith('/') && path.startsWith('/'))
//         return baseUrl.substring(0, baseUrl.length - 1) + path
//     else if (!baseUrl.endsWith('/') && path.startsWith('/'))
//         return baseUrl + path
//     else
//         return baseUrl + '/' + path
// }

// Vue.$jwt = {
//     set: function(value) {
//         window.localStorage.setItem('jwt', value)
//     },
//     get: function() {
//         return window.localStorage.getItem('jwt')
//     }
// }

// Vue.$info = {
//     set: function(value) {
//         window.localStorage.setItem('id', value)
//     },
//     get: function() {
//         return window.localStorage.getItem('id')
//     }
// }

// utils.getAuthorizedHeader = function() {
//     if (localStorage.getItem('jwt'))
//         return {
//             Authorization: 'Bearer ' + utils.store.jwt,
//         }
//     return {};
// }


Vue.config.productionTip = false

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)

// font-awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

// router and vue setup
import router from './routers/router'
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')