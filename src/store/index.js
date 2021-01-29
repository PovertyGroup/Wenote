import Vue from 'vue'
import Vuex from 'vuex'

import config from './../config'

Vue.use(Vuex)

const state = {
    serverUrl: config.serverUrl,
    siteUrl: config.siteUrl,
}
export function createStore () {
    return new Vuex.Store({
        state,
    })
}