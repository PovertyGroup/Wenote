import { createApp } from './app'
const t = createApp()

if (window.__INITIAL_STATE__) {
  t.store.replaceState(window.__INITIAL_STATE__)
}

t.app.$mount('#app')