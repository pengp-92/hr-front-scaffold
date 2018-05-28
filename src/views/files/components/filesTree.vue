<template>
  <el-row>
    <el-tree :data="treeMenu" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </el-row>
</template>       

<script type="text/ecmascript-6">
// import hamburger from "./components/Hamburger";

export default {
  /** 组件 */
  components: {},

  /** 参数定义 */
  data() {
    return {
      /** 配置选项 */
      defaultProps: {
        children: "children",
        label: "label"
      },
      // treeData: "",
      treeMenu: [
        {
          typeId: "",
          label: "档案信息管理",
          children: []
        }
      ]
    };
  },

  /** 方法 */
  methods: {
    /** 获取数据 */
    getdata(option) {
      var token =
        "ad5ca800601bf51bababee508a8118226d2c69db09de6b5f8d8d0c3043d62d006912c4f4467a5e6176faaaa1e79fb9d6210ee658709c88d34bbf0fe2324028b520e1e55cd5462d7e";
      this.axios
        .get("https://api.haorun.win/tms/tms/files/filesTypeList", {
          params: {
            access_token: token
          }
        })
        .then(res => {
          let data = res.data.data;
          for (let i in data) {
            // debugger;
            // console.log(data[i]);
            // 添加children属性
            data[i].children = [];
            // 父级菜单
            let currParent = "";
            let parId = data[i].parentId;
            // 非一级菜单
            if (
              data[i].parentId != "" &&
              data[i].parentId != null &&
              data[i].parentId != "NONE"
            ) {
              // 获取父级菜单
              for (let ii in data) {
                if (parId == data[ii].typeId) {
                  currParent = data[ii];
                  break;
                }
              }

              if (currParent.children == undefined) {
                currParent.children = [];
              }
              // 往父级菜单放入子菜单
              data[i].label = data[i].information;
              currParent.children.push(data[i]);
            } else {
              // 把一级菜单放入新的数组
              data[i].label = data[i].information;
              this.treeMenu[0].children.push(data[i]);
            }
          }
          console.log(this.treeMenu);
        });
    },
    /** 树 点击事件 */
    handleNodeClick(data) {
      console.log(data);
    }
  },
  /** 构造函数？ */
  created() {
    this.getdata();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>