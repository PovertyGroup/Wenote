let vuexStore = {}

const store = {
  set jwt (value) {
    if (vuexStore.commit) {
      vuexStore.commit('alterUserId', { value })
    }
    window.localStorage.setItem('jwt', value)
  },
  get jwt () {
    if (global.window) {
      return window.localStorage.getItem('jwt')
    }
    return vuexStore.state.jwt
  },
  set info (value) {
    if (vuexStore.commit) {
      vuexStore.commit('alterUserId', { value })
    }
    window.localStorage.setItem('id', value)
  },
  get info () {
    if (global.window) {
      return window.localStorage.getItem('id')
    }
    return vuexStore.state.userId
  }
}
const getAuthorizedHeader = function () {
  if (store.jwt) {
    return {
      Authorization: 'Bearer ' + store.jwt
    }
  }
  return {}
}

const composeUrl = function (serverUrl, path) {
  if (serverUrl.endsWith('/') && !path.startsWith('/')) { return serverUrl + path } else if (serverUrl.endsWith('/') && path.startsWith('/')) { return serverUrl.substring(0, serverUrl.length - 1) + path } else if (!serverUrl.endsWith('/') && path.startsWith('/')) { return serverUrl + path } else { return serverUrl + '/' + path }
}

const initStore = function (store) {
  vuexStore = store
}

export default {
  store,
  composeUrl,
  getAuthorizedHeader,
  initStore
}
