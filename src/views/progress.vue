<template>
  <div>
    <el-progress class="el-progress-line" :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
    <el-progress class="el-progress-line" :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
    <el-progress class="el-progress-line" :text-inside="true" :stroke-width="18" :percentage="80" color="rgba(142, 113, 199, 0.7)"></el-progress>
    <el-progress class="el-progress-line" :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
    <el-progress class="el-progress-line" :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
    <el-progress type="circle" :percentage="0"></el-progress>
    <el-progress type="circle" :percentage="25"></el-progress>
    <el-progress type="circle" :percentage="80" color="#8e71c7"></el-progress>
    <el-progress type="circle" :percentage="100" status="success"></el-progress>
    <el-progress type="circle" :percentage="50" status="exception"></el-progress>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="css" scoped>
  .el-progress-line{
    width: 500px;
    margin: 10px auto;
  }
</style>
