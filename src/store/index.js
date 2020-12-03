import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    state: {
        userId: '',
    },
    mutations: {
        setUserId(state, payload){
            state.userId = payload;
        }
    }
})

export default store