import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import require from './config/require.js'
import ElementUI from 'element-ui'
import api from './config/api.js'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$http = require;
Vue.prototype.$api = api;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
