<template>
  <div class="welcome-layout">
    <p class="welcome-img" :style="{ 'background-color': primaryColor }">
      <img src="../imgs/element-logo.svg" alt="element-logo" class="header-logo">
    </p>
    欢迎来到后台管理系统
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    primaryColor() {
      return this.$store.state.app.primaryColor;
    }
  }
};
</script>
<style scoped>
.welcome-layout {
  padding-top: 180px;
  line-height: 160px;
}
.welcome-img {
  margin: 0 50px;
  height: 100px;
  line-height: 100px;
}
</style>
