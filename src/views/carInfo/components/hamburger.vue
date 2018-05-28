<template>
  <div>
    <h2>子组件</h2>
    <p>{{message}}</p>
  </div>
</template>
<script>
export default {
  name: "hamburger",
  props: ["message"]
};
</script>
<style scoped>
</style>