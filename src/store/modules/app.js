import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: 1
    },
    language: Cookies.get('language') || 'en',
    theme: '',
    primaryColor: '#0c71df', // 主题色
    topbar: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_THEME: (state, theme) => {
      state.theme = '#' + theme.theme
    },
    ADD_TOPBAR: (state, routerObj) => {
      const isExist = state.topbar.find((obj) => {
        return obj.path == routerObj.path && obj.name == routerObj.name;
      });
      if (isExist) return;
      state.topbar.push(routerObj);
    },
    DELETE_TOPBAR: (state, path) => {
      let length = state.topbar.length;
      for (var i = 0; i < length; i++) {
        if (state.topbar[i].path == path) {
          state.topbar.splice(i, 1);
          i--;
          length--;
        }
      }
    },
    SET_COLOR: (state, color) => {
      state.primaryColor = color;
    }
  },
  actions: {
    toggleSideBar({
      commit
    }) {
      commit('TOGGLE_SIDEBAR')
    },
    setLanguage({
      commit
    }, language) {
      commit('SET_LANGUAGE', language)
    },
    setTheme({
      commit
    }, theme) {
      commit('SET_THEME', theme)
    }
  }
}

export default app
