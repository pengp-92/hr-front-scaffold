<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
        <side-nav></side-nav>
      </el-aside>
      <el-container class="container-main" :class="isCollapse ? 'sidebar-collapse':''">
        <el-header>
          <top-bar></top-bar>
          <router-bar></router-bar>
        </el-header>
        <el-main>
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.layout {
  height: 100%;
}
.el-header {
  width: 100%;
  position: absolute;
  padding: 0;
  height: 60px;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  color: #333;
  height: 100%;
  text-align: center;
  position: absolute;
}

.el-main {
  height: 100%;
  margin-top: 100px;
  color: #333;
  // text-align: center;
  padding: 0;
}

.el-container {
  height: 100%;
}

.el-header,
.el-main,
.container-main {
  transition: all 0.3s ease-in-out;
}
.container-main {
  position: relative;
  margin-left: 200px;
  &.sidebar-collapse {
    margin-left: 0;
  }
}
</style>

<script type="text/ecmascript-6">
import topBar from "./components/topbar.vue";
import sideNav from "./components/sidebar.vue";
import routerBar from "./components/routerbar.vue";

export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    isCollapse() {
      return !this.$store.state.app.sidebar.opened;
    }
  },
  components: {
    topBar: topBar,
    sideNav: sideNav,
    routerBar: routerBar
  },
  mounted() {},
  methods: {}
};
</script>
