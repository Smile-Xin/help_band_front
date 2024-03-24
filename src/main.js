import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import dayjs from 'dayjs'

import './plugins/http'

Vue.filter('dateformat', function(indate, outdate) {
  return dayjs(indate).format(outdate)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
