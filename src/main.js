import Vue from 'vue'
import App from './App.vue'

// axios configuration and utils
import axios from 'axios'

Vue.$baseUrl = 'http://172.21.4.9:1337/'
Vue.$axios = axios
Vue.$composeUrl = function(baseUrl, path) {
    if (baseUrl.endsWith('/') && !path.startsWith('/'))
        return baseUrl + path
    else if (baseUrl.endsWith('/') && path.startsWith('/'))
        return baseUrl.substring(0, baseUrl.length - 1) + path
    else if (!baseUrl.endsWith('/') && path.startsWith('/'))
        return baseUrl + path
    else
        return baseUrl + '/' + path
}

Vue.$jwt = {
    set: function(value) {
        window.localStorage.setItem('jwt', value)
    },
    get: function() {
        return window.localStorage.getItem('jwt')
    }
}

Vue.$info = {
    set: function(value) {
        window.localStorage.setItem('id', value)
    },
    get: function() {
        return window.localStorage.getItem('id')
    }
}

Vue.$getAuthorizedHeader = function() {
    if (localStorage.getItem('jwt'))
        return {
            Authorization: 'Bearer ' + Vue.$jwt.get(),
        }
    return {};
}


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
    router,
    render: h => h(App)
}).$mount('#app')