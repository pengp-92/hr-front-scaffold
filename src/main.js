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
import globalStyleHelper from "@/util/globalStyleHelper.js";
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
  },
  created() {
    // 初始界面颜色 TO-DO 从后台获取
    const globalColor = '#2dc3e8';
    // 将主题颜色保存在全局变量中
    this.$store.commit("SET_COLOR", globalColor);
    // 改变无法通过变量改变的全局样式
    globalStyleHelper.setGlobalStyle(globalColor);
  }
});
