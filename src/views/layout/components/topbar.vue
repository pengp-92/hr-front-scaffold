<template>
  <div class="topbar-wrap">
      <hamburger :toggleClick="toggleSideBar" :isActive="!isCollapse"></hamburger>
      <el-dropdown trigger="click"  class="topbar-info">
        <a href="#" class="el-dropdown-link">
            <img :src="user.avatar" class="avatar">
        </a>
        <el-dropdown-menu slot="dropdown">
            <!-- User image -->
            <el-dropdown-item class="user-header">
                <img :src="user.avatar" class="img-circle" alt="User Image">
                <p>
                    描述：还没添加
                    <small>还没添加</small>
                </p>
            </el-dropdown-item>
            <!-- Menu Body -->
            <el-dropdown-item class="user-body">
                <el-row :gutter="25">
                    <el-col :span="12">
                        <div class="grid-content">
                            消息
                            <el-badge :value="3" />
                        </div></el-col>
                </el-row>
            </el-dropdown-item>
            <!-- Menu Footer-->
            <el-dropdown-item class="user-footer">
                <div class="pull-left">
                    <el-button size="small">设置</el-button>
                </div>
                <div class="pull-right">
                    <el-button size="small">退出</el-button>
                </div>
            </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="topbar-tit">hi {{user.username}},欢迎使用后台管理系统</div>
      <ul class="header-operations">
        <li>
          <el-tooltip effect="dark" content="全屏" placement="bottom">
            <screenfull class="screenfull right-menu-item"></screenfull>
          </el-tooltip>
        </li>
        <li class="header-corlor-picker">切换主题色
          <el-color-picker v-model="primaryColor"></el-color-picker>
        </li>
        <li><router-link to="/help">帮助</router-link></li>
      </ul>
    </div>
</template>
<style lang="less" scoped>
.topbar-wrap {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #ddd;
  color: #666;
  a {
    color: #666;
  }
}
.topbar-tit {
  position: absolute;
  top: 0;
  left: 125px;
}
.topbar-info {
  position: absolute;
  top: 0;
  left: 60px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 6px;
}
.user-header {
  img {
    height: 140px;
    width: 140px;
    border-radius: 50%;
  }
}
.header-corlor-picker {
  position: relative;
  padding-right: 41px;
}
.el-color-picker {
  position: absolute;
  right: 0px;
  top: 11px;
}
.pull-right {
  float: right !important;
}
.pull-left {
  float: left !important;
}
</style>

<script>
import Hamburger from "@/components/Hamburger";
import screenfull from "@/components/screenfull";
import $ from "jquery";
export default {
  name: "app",

  data() {
    return {
      user: {
        id: 2,
        username: "kassing",
        password: "Aaaaaaa",
        avatar:
          "https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png",
        name: "kassing"
      }
    };
  },
  components: {
    Hamburger,
    screenfull
  },
  computed: {
    primaryColor: {
      get() {
        return this.$store.state.app.primaryColor;
      },
      set(value) {
        $("#docs-style").html(this.docsStyle(value));
        this.$store.commit("SET_COLOR", value);
      }
    },
    isCollapse() {
      return !this.$store.state.app.sidebar.opened;
    }
  },
  methods: {
    docsStyle(value) {
      // 动态添加样式
      return `
        .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
          color: ${value} !important;
        }
        `;
    },
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    }
  }
};
</script>

