<template>
  <el-container>
      <el-header>
        <page-header></page-header>
      </el-header>
      <el-main>
        main
      </el-main>
      <el-footer>
        footer
      </el-footer>

  </el-container>

</template>       

<script type="text/ecmascript-6">
// import hamburger from "./components/Hamburger";
import pageHeader from "./components/pageHeader";

export default {
  /** 组件 */
  components: {
    pageHeader: pageHeader
  },

  /** 参数定义 */
  data() {
    return {};
  },

  /** 方法 */
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>