<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item) in brumblist" :key="item.path">
        <router-link :to="item.path">{{item.name}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      brumblist: ""
    };
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.brumblist = this.$route.matched;
      this.$route.matched.forEach((item, index) => {
        if (item.name === "首页") {
          item.path = "/";
        } else {
          return this.$route.path === item.path ? (this.title = item.name) : "";
        }
      });
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>

<style>
.el-breadcrumb {
  padding: 10px;
}
</style>
