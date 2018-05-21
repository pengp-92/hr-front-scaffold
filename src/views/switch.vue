<template>
  <div>
    <el-switch
      v-model="value3"
      active-text="按月付费"
      inactive-text="按年付费">
    </el-switch>
    <el-switch
      style="display: block"
      v-model="value4"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="按月付费"
      inactive-text="按年付费">
    </el-switch>
    <el-switch
      v-model="value6"
      disabled>
    </el-switch>
    <el-switch
      v-model="value7"
      disabled>
    </el-switch>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value3: true,
      value4: true,
      value6: true,
      value7: false
    };
  }
};
</script>
<style lang="css" scoped>
.el-switch {
  margin: 15px 0;
}
</style>
