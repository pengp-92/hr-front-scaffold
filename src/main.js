import Vue from 'vue';
import App from './app';
import router from './router';
import Element from 'element-ui';
import layout from './views/layout/layout';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css';
import './styles/index.scss';
import axios from 'axios';
import store from './store';
import './router/beforeEach.js';
require('es6-promise').polyfill();

Vue.use(Element, {
  size: 'medium'
});
Vue.config.productionTip = false;
Vue.prototype.axios = axios;

/* eslint-disable no-new */
Vue.component('layout', layout);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});
