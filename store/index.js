import axios from 'axios'
import config from './../config'

export const state = () => ({
  serverUrl: config.serverUrl,
  siteUrl: config.siteUrl,
  defaultAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

export const actions = {
  nuxtServerInit ({ commit }, { $auth }) {
    axios.interceptors.request.use((config) => {
      if ($auth.loggedIn && $auth.strategy.token.get()) {
        config.headers.Authorization = $auth.strategy.token.get()
      }
      return config
    })
  },
  nuxtClientInit ({ commit }, context) {
    axios.interceptors.request.use((config) => {
      if (context.$auth.loggedIn && context.$auth.strategy.token.get()) {
        config.headers.Authorization = context.$auth.strategy.token.get()
      }
      return config
    })
  }
}
