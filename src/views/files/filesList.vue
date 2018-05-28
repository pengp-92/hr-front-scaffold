<template>
  <div>
    <el-row>
      <files-tool></files-tool>
      <!-- <files-table></files-table>  -->
    </el-row>
    <el-row>
      <el-col :span="6">
        <files-tree></files-tree>
      </el-col>
      <el-col :span="18">
        <files-table></files-table>
      </el-col>
    </el-row>
  </div>
</template>       

<script type="text/ecmascript-6">
// import hamburger from "./components/Hamburger";
import filesTool from "./components/filesTool";
import filesTree from "./components/filesTree";
import filesTable from "./components/filesTable";

export default {
  /** 组件 */
  components: {
    filesTool: filesTool,
    filesTree: filesTree,
    filesTable: filesTable
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