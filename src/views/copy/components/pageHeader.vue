<template>
  <div>
    <el-row>
      <el-col :span="24" style="text-align: center;">
        <div>
          <img src="../photo/head_AD.jpg" />
        </div>
      </el-col>
    </el-row>
    <el-row :align=juzhong>
      <el-col :span="24" style="text-align: center;font-size: 14px;">
        <img src="../photo/logo.png" />
        <img src="../photo/logo2.png" />
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" style="width:468px; border: solid 1px #35a2db;">
          <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:100px;padding-left: 10px;">
            <el-option label="船票" value="1"></el-option>
            <el-option label="景点" value="2"></el-option>
            <el-option label="车队" value="3"></el-option>
          </el-select>
          <!-- <el-button slot="append" type="primary" icon="el-icon-search" style="width:60px;background-color: #35a2db;"></el-button> -->
          <el-button slot="append" type="primary" icon="el-icon-search" style="width:60px;"></el-button>
        </el-input>
        <img src="../photo/user.png" />
        <span>请 登录 或 免费注册</span>
        <img src="../photo/phone.png" />
        <span>下载APP</span>
        <img src="../photo/ensure.jpg" />
      </el-col>
    </el-row>
  </div>

</template>       

<script type="text/ecmascript-6">
// import pageHeader from "./components/pageHeader";

export default {
  /** 组件 */
  components: {
    juzhong: "middle"
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
