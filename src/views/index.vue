<template>
  <el-container>
    <el-main class="content-wrapper">
      <breadcrumb></breadcrumb>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "index",
  data() {
    return {
      title: ""
    };
  },
  components: {
    breadcrumb: require("@/components/breadcrumb/index.vue")
  },
  computed: {
    isCollapse() {
      return !this.$store.state.app.sidebar.opened;
    },
    ...mapGetters(["theme"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang=''>
.main-header {
  width: 100%;
  height: 50px !important;
  position: fixed;
  max-height: 100px;
  z-index: 1030;
  left: 0;
  padding: 0;
}
.logo {
  text-decoration: none;
}
</style>
