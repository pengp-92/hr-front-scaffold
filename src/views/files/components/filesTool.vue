<template>
  <el-form :label-position="labelPosition" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="搜索条件：">
          <el-input v-model="qVal" style="width:300px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="档案类型">
          <el-select v-model="fileType" clearable placeholder="请选择" style="width:300px">
            <el-option v-for="item in fileTypeList" :key="item.info" :label="item.infoStr" :value="item.info">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" plain icon="el-icon-search">查询</el-button>
      </el-col>

    </el-row>
  </el-form>
</template>       

<script type="text/ecmascript-6">
// import hamburger from "./components/Hamburger";

export default {
  /** 组件 */
  components: {},

  /** 参数定义 */
  data() {
    return {
      labelPosition: "right",
      /** 搜索条件 */
      qVal: "",
      /** 档案类型选择条件 */
      fileTypeList: [
        { info: "CAR", infoStr: "车辆" },
        { info: "DRIVER", infoStr: "司机" }
      ],
      /** 档案类型 */
      fileType: ""
    };
  },

  /** 方法 */
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>