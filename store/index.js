import config from './../config'

export const state = () => ({
  serverUrl: config.serverUrl,
  siteUrl: config.siteUrl,
  jwt: '',
  userId: ''
})

export const mutations = {
  alterJwt (state, value) {
    state.jwt = value
  },
  alterUserId (state, value) {
    state.userId = value
  }
}
