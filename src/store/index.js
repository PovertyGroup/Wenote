import Vue from 'vue'
import Vuex from 'vuex'

import config from './../config'

Vue.use(Vuex)

const state = {
    serverUrl: config.serverUrl,
    siteUrl: config.siteUrl,
}

// const mutations = {
//     setJwt(state, jwt){
//         state.jwt = jwt
//     }
// }

const store = new Vuex.Store({
    state,
    // mutations
})

export default store
