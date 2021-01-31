import config from './../config'

export const state = () => ({
  serverUrl: config.serverUrl,
  siteUrl: config.siteUrl,
  jwt: '',
  userId: '',
  defaultAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

export const mutations = {
  alterJwt (state, value) {
    state.jwt = value
  },
  alterUserId (state, value) {
    state.userId = value
  }
}
