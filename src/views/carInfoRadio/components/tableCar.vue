<template>
  <el-row>
    <el-col :span='24'>
      <template>
        <!-- min-width="30%" -->
        <el-table ref="singleTable" v-loading="tableLoad" :data="tableData" @current-change="handleSelectionChange" highlight-current-row>
          <!-- <el-table-column type="selection" width="60"></el-table-column> -->
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="carOwnerStr" label="所属资源" width="200"></el-table-column>
          <el-table-column prop="carNo" label="车牌号" width="200"></el-table-column>
          <el-table-column prop="carTypeStr" label="车型" width="200"> </el-table-column>
          <el-table-column prop="brand" label="车辆品牌" width="200"> </el-table-column>
          <el-table-column prop="carNo" label="车辆属性" width="450" :formatter="formatPro"> </el-table-column>
          <el-table-column prop="statStr" label="车辆状态" width="200"> </el-table-column>
          <el-table-column prop="transStatStr" label="运输状态" width="150">
            <template slot-scope="scope">
              <el-tag :type=getStatType(scope) disable-transitions>{{scope.row.transStatStr}}</el-tag>
              <br v-if="scope.row.transStatStr === '无法出车'" />
              <span v-if="scope.row.transStatStr === '无法出车'">原因：{{scope.row.transStatIntro}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-col>
    <el-col :span='24' style="margin-top: 20px">
      <el-pagination style="float:right" background layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="changePage">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["message"],

  /** 参数定义 */
  data() {
    return {
      /** 表格数据 */
      tableData: [],
      /**是否显示加载动画 */
      tableLoad: true,
      /** 数据总量 */
      total: 0,
      /** 每页显示多扫条 */
      pageSize: 10,
      /** 当前页码 */
      currentPage: 1,
      /** 选中数据 */
      selectRow: [],
      query: {
        qVal: "",
        carType: ""
      }
    };
  },

  /** 监听props 父传子 */
  watch: {
    message(value) {
      if (value === "regainData") {
        this.getdata();
      } else if (value.qVal !== undefined) {
        console.log(value);
        // value = "";
        this.query = value;
        this.getdata();
        this.$emit("tableCarToCarInfo", "clearQuery");
      }
    }
  },

  /** 组件 */
  components: {
    // addCar: addCar
  },

  /** 方法 */
  methods: {
    /** 获取数据 */
    getdata(option) {
      var token =
        "ad5ca800601bf51bababee508a8118226d2c69db09de6b5f8d8d0c3043d62d006912c4f4467a5e6176faaaa1e79fb9d6210ee658709c88d34bbf0fe2324028b520e1e55cd5462d7e";
      this.axios
        .get("https://api.haorun.win/oss/v2/tms/tms/car/findSimpleList", {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
            access_token: token,
            qVal: this.query.qVal,
            carType: this.query.carType
          }
        })
        .then(res => {
          this.tableData = res.data.data.content;
          this.total = res.data.data.total;
          this.tableLoad = false;
        });
    },

    /** 运输状态 样式 */
    getStatType(scope) {
      if (scope.row.transStatStr == "空闲") {
        return "success";
      } else if (scope.row.transStatStr == "运输中") {
        return "warning";
      } else if (scope.row.transStatStr == "无法出车") {
        return "danger";
      } else {
        return "info";
      }
    },

    /** 格式化 车辆属性 */
    formatPro: function(row, column) {
      var aa =
        "长:" +
        row.carLong +
        "*宽:" +
        row.carWidth +
        "*高:" +
        row.carHeight +
        "载重: " +
        row.loadQty +
        " 容积：" +
        row.loadVlm;
      return aa;
    },
    // + row.carWidth
    /** 选中 */
    handleSelectionChange(val) {
      // debugger;
      this.selectRow = val;
      this.$emit("tableCarToCarInfo", val);
    },

    /** 分页 */
    changePage(page) {
      this.currentPage = page;
      this.getdata({
        page: this.currentPage,
        pagesize: this.pageSize
      });
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
