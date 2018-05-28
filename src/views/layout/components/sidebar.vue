<template>
  <aside class="main-sidebar"
    :class="isCollapse ? 'sidebar-collapse':''"
    :style="{ 'background-color': primaryColor }">
    <div class="main-sidebar-title">
      <router-link to="/index">后台管理工具</router-link>
    </div>
    <div class="sidebar-menu">
        <el-menu :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 :router='true'
                 text-color="#fff"
                 :background-color="primaryColor">
        <el-menu-item index="index">
          <i class="el-icon-news"></i>首页
        </el-menu-item>
        <el-submenu index='1'>
          <template slot="title">
            <i class="el-icon-message"></i>用户管理
          </template>
          <el-menu-item index="userList">用户列表</el-menu-item>
          <el-menu-item index="addUser">添加用户</el-menu-item>
          <el-menu-item index="carInfo">车辆信息</el-menu-item>
          <el-menu-item index="carInfoRadio">车辆信息单选</el-menu-item>
          <el-menu-item index="text">测试控件</el-menu-item>
          <el-menu-item index="files">档案配置</el-menu-item>
          <!-- <el-menu-item index="copy">模仿</el-menu-item> -->
        </el-submenu>
        <el-menu-item index="pictable">
          <i class="el-icon-picture"></i>工作台
        </el-menu-item>
        <el-menu-item index="button">
          <i class="el-icon-tickets"></i>按钮合集
        </el-menu-item>
        <el-menu-item index="form">
          <i class="el-icon-edit-outline"></i>form表单
        </el-menu-item>
        <el-menu-item index="button">
          <i class="el-icon-tickets"></i>按钮合集
        </el-menu-item>
        <el-menu-item index="switch">
          <i class="el-icon-sort"></i>切换组件
        </el-menu-item>
        <el-menu-item index="slider">
          <i class="el-icon-d-arrow-right"></i>滑块组件
        </el-menu-item>
        <el-menu-item index="picker">
          <i class="el-icon-date"></i>选择器
        </el-menu-item>
        <el-menu-item index="upload">
          <i class="el-icon-circle-check-outline"></i>上传组件
        </el-menu-item>
        <el-menu-item index="rate">
          <i class="el-icon-bell"></i>评分
        </el-menu-item>
        <el-menu-item index="transfer">
          <i class="el-icon-date"></i>穿梭组件
        </el-menu-item>
        <el-menu-item index="table">
          <i class="el-icon-edit"></i>表格
        </el-menu-item>
        <el-menu-item index="tag">
          <i class="el-icon-rank"></i>标签
        </el-menu-item>
        <el-menu-item index="progress">
          <i class="el-icon-share"></i>进度条
        </el-menu-item>
      </el-menu>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    primaryColor() {
      return this.$store.state.app.primaryColor;
    },
    isCollapse() {
      return !this.$store.state.app.sidebar.opened;
    }
  }
};
</script>

<style lang="less">
.main-sidebar {
  transition: transform 0.3s ease-in-out;
  transform: translate(0, 0);
  width: 200px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  color: #fff;
}
.main-sidebar-title {
  height: 100px;
  line-height: 100px;
  font-size: 26px;
  font-weight: bolder;
  a {
    color: #fff;
  }
}
.main-sidebar.sidebar-collapse {
  transform: translate(-230px, 0);
}
.main-sidebar.sidebar-collapse + .content-wrapper {
  margin-left: 0;
}
.main-sidebar i {
  color: #fff;
}
.el-submenu,
.el-menu-item {
  text-align: left;
}
.el-aside {
  ::-webkit-scrollbar {
    width: 12px;
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(249, 250, 252, 0.3);
    border-radius: 10px;
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(229, 229, 229, 0.4);
    box-shadow: none;
  }
}
</style>


