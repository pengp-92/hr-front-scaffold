<template>
  <div>
    <el-row>
      <el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column property="date" label="日期" width="120">
        </el-table-column>
        <el-table-column property="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column property="address" label="地址">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row :span='24' style="margin-top: 20px">
      <el-pagination style="float:right" background layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="changePage">
      </el-pagination>
    </el-row>
  </div>
</template>       

<script type="text/ecmascript-6">
// import hamburger from "./components/Hamburger";

export default {
  /** 组件 */
  components: {
    page: 1,
    // pageSize: 10,
    tableData: {},
    query: {
      qVal: "",
      infoType: ""
    }
  },

  /** 参数定义 */
  data() {
    return {};
  },

  /** 方法 */
  methods: {
    getdata(option) {
      var token =
        "ad5ca800601bf51bababee508a8118226d2c69db09de6b5f8d8d0c3043d62d006912c4f4467a5e6176faaaa1e79fb9d6210ee658709c88d34bbf0fe2324028b520e1e55cd5462d7e";
      this.axios
        .get("https://api.haorun.win/oss/v2/tms/tms/files/filesTypePageList", {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
            access_token: token,
            qVal: this.query.qVal,
            infoType: this.query.infoType
          }
        })
        .then(res => {
          this.tableData = res.data.data.content;
          this.total = res.data.data.total;
          this.tableLoad = false;
        });
    },
    /** 分页 */
    changePage() {},
    /** 选择 */
    handleCurrentChange() {}
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