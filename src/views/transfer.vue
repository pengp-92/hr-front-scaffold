<template>
  <el-transfer
    v-model="value4"
    :props="{
      key: 'value',
      label: 'desc'
    }"
    :data="data3">
  </el-transfer>
</template>
<style lang="less">
.el-checkbox-group .el-transfer-panel__item .el-checkbox__input {
  margin-left: -40px;
}
</style>

<script>
export default {
  data() {
    const generateData3 = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          value: i,
          desc: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      data3: generateData3(),
      value4: []
    };
  }
};
</script>
