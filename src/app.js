import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store/index'
import { sync } from 'vuex-router-sync'

// ElementUI
import ElementUI from 'element-ui';
import mavonEditor from 'mavon-editor'

// router and vue setup
import { createRouter } from './routers/router'

export function createApp(){
  Vue.config.productionTip = false

  Vue.use(ElementUI)
  Vue.use(mavonEditor)

  const router = createRouter();
  const store = createStore();

  sync(store, router)

  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })

  return { app, router, store }
}
