import router from '../router'
import store from '../store'
router.beforeEach((to, from, next) => {
  store.commit('ADD_TOPBAR',to);
  next();
})
