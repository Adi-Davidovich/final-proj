import Vue from 'vue'
import app from '../app.vue'
import router from './router'
import { store } from './store/store.js'
// import '../src/style/main.css'
import './styles/style.scss'
import ElementUI from 'element-ui';
import '../src/assets/theme/index.css'

Vue.config.productionTip = false
// Styles
import "./styles/style.scss"
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')



// Vue.use(require('vue-moment'));