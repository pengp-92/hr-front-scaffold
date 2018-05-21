<template>
<div class="top-bar">
  <el-tabs v-model="tabIndex"
           type="border-card"
           closable
           @tab-remove="removeTab"
           @tab-click="tabClick" style="height: 40px;">
  <el-tab-pane
    v-for="(item) in topbarList"
    :key="item.path"
    :label="item.name"
    :name="item.path"
  >
  </el-tab-pane>
</el-tabs>
</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      topbarList: [],
      tabIndex: "/"
    };
  },
  computed: {
    primaryColor() {
      return this.$store.state.app.primaryColor;
    },
    ...mapGetters(["topbar"])
  },
  created() {
    this.getTopbarList();
  },
  methods: {
    getTopbarList() {
      this.topbarList = this.$store.getters.topbar;
      this.topbarList.forEach((obj, index) => {
        if (obj.path == this.$route.path && obj.name == this.$route.name) {
          this.tabIndex = this.$route.path;
        }
      });
    },
    tabClick(tabObj) {
      let path;
      try {
        path = tabObj.$options.propsData.name;
      } catch (error) {}
      if (path) {
        this.$router.push(path);
      }
    },
    removeTab(path) {
      // 最后一个不能删除
      if (this.topbarList.length === 1) {
        return;
      }
      this.$store.commit("DELETE_TOPBAR", path);
      this.topbarList = this.$store.getters.topbar;
      if (path === this.tabIndex) {
        this.$router.push(this.topbarList.pop().path);
      }
    }
  },
  watch: {
    $route() {
      this.getTopbarList();
    }
  }
};
</script>

<style scoped>
.top-bar {
  height: 40px;
  line-height: 40px;
}
.el-tabs--border-card {
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
