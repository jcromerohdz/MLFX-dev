import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
// Import the Auth0 configuration
import VueCompositionAPI from '@vue/composition-api'
import { domain, clientId } from '../auth_config.json'
// Import the plugin here
import { Auth0Plugin } from './auth'

import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@axios'
import '@/libs/portal-vue'
import '@/libs/toastification'

// Axios Mock Adapter
import '@/@fake-db/db'

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    )
  },
})

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
