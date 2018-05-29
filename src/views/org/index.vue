<template>
  <el-row>
    <el-col :span="24" class="table-header-button">
      <el-button-group>
        <el-button icon="el-icon-plus" @click="add" type="self">新增</el-button>
        <el-button icon="el-icon-edit" @click="edit" type="self">编辑</el-button>
        <el-button icon="el-icon-document" @click="detail" type="self">详情</el-button>
        <el-button icon="el-icon-delete" @click="del" type="self">删除</el-button>
        <el-button icon="el-icon-download" @click="exportTo" type="self">导出</el-button>
      </el-button-group>
      <el-button class="margin-left-mini" type="self" :icon="filterExpand ? 'el-icon-caret-top':'el-icon-caret-bottom'" @click="expandFilter">筛选</el-button>
    </el-col>
    <transition name="fade">
      <el-col label-position="left" :span="24" v-show="filterExpand" class="table-header-filter">
        <el-form :inline="true" :model="filter" class="table-header-filter-form">
          <el-col :span="6">
            <el-form-item label="组织编码">
              <el-input v-model="filter.orgCode" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="组织名称">
              <el-input v-model="filter.orgName" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="组织电话">
              <el-input v-model="filter.orgTel" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="组织状态">
              <el-select v-model="filter.orgStatus" placeholder="组织状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="禁用" value="-1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件号码">
              <el-input v-model="filter.idCard" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="12">
            <el-button type="default" plain @click="resetQuery" class="margin-left-mini">重置</el-button>
            <el-button @click="query" type="self">查询</el-button>
          </el-col>
        </el-form>
      </el-col>
    </transition>
    <el-col :span="24">
      <el-table :data="data" stripe border v-loading="tableLoad" @selection-change="addChose" ref="table" show-summary :summary-method="getSummaries">
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column prop="orgCode" width="auto" label="组织编码" align="left"></el-table-column>
        <el-table-column prop="orgName" width="auto" label="组织名称" align="left"></el-table-column>
        <el-table-column prop="corpName" width="auto" label="所属公司" align="left"></el-table-column>
        <el-table-column prop="idCard" width="auto" label="证件号码" align="left"></el-table-column>
        <el-table-column prop="stlFee" width="auto" label="当前余额" align="left" :formatter="formatterNumber"></el-table-column>
        <el-table-column prop="orgStatus" width="80" label="状态" align="center" header-align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.orgStatus === 1 ? 'success' : 'danger'" disable-transitions>{{scope.row.orgStatusStr}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24">
      <el-pagination background layout="total, sizes, prev, pager, next" :page-size="pageSize" :total="total" :current-page="currentPage" @size-change="changeSize" @current-change='changePage'>
      </el-pagination>
    </el-col>
    <el-dialog :title="dialogTitle" :visible.sync="showDialog" :close-on-click-modal=false :show-close=false custom-class="dialog-self">
      <Add v-on:closeDialog='closeDialog' v-on:loadding='loadding' v-if="showAdd" />
      <Edit v-on:closeDialog='closeDialog' v-on:loadding='loadding' v-if="showEdit" :orgId="choseId" />
      <Detail v-on:closeDialog='closeDialog' v-on:loadding='loadding' v-if="showDetail" :orgId="choseId" />
    </el-dialog>
  </el-row>
</template>

<script>
import Add from "./add";
import Edit from "./edit";
import Detail from "./detail";
import formatter from "@/util/formatterHelper";
export default {
  components: {
    Add,
    Edit,
    Detail
  },
  data() {
    return {
      data: [], // 列表数据
      totalData: [],
      filter: {
        orgCode: null,
        orgName: null,
        orgTel: null,
        idCard: null,
        orgStatus: null
      }, // 筛选条件
      total: 0, // 总记录数
      pageSize: 10, // 页大小
      currentPage: 1, // 当前页
      tableLoad: false, // 是否显示加载中
      choseData: [], // 已选择的记录
      filterExpand: false, // 是否展开筛选
      showAdd: false, // 是否显示添加
      showEdit: false, // 是否显示编辑
      showDetail: false // 是否显示详情
    };
  },
  methods: {
    query() {
      // 查询列表数据
      const params = {
        ...this.filter,
        page: this.currentPage,
        pageSize: this.pageSize
      };
      console.log(`查询条件：${JSON.stringify(params)}`);
      this.tableLoad = true;
      this.axios
        .get("/org/list", {
          // TO-DO，联调时释放下面代码
          // params: params
        })
        .then(res => {
          if (res.data.success) {
            this.total = res.data.data.total;
            this.data = res.data.data.content;
          } else {
            this.$message(res.message);
          }
          this.tableLoad = false;
        });

      // TO-DO 获取当前条件的汇总数据
      this.totalData.push(
        formatter.formatNumber(12389, 2),
        formatter.formatNumber(378.234, 3)
      );
    },
    getSummaries(param) {
      // 获取汇总数据
      const { columns } = param;
      const sums = [];
      if (columns != null && columns.length > 4) {
        sums[0] = "";
        sums[1] = "合计";

        // TO-DO 根据真实情况显示合计数据
        sums[columns.length - 2] = `金额：${this.totalData[0]} 元`;
        sums[columns.length - 3] = `数量：${this.totalData[1]} `;
      }

      return sums;
    },
    resetQuery() {
      // 重置筛选条件
      for (let key in this.filter) {
        this.filter[key] = null;
      }
      this.query();
    },
    changePage(pager) {
      // 改变分页器分页
      this.currentPage = pager;
      this.query();
    },
    changeSize(size) {
      // 改变页大小
      this.currentPage = 1;
      this.pageSize = size;
      this.query();
    },
    add() {
      // 添加
      this.showAdd = true;
    },
    edit() {
      // 编辑
      if (this.choseData.length == 0) {
        this.$message.error("请选中一条记录");
        return;
      }
      if (this.choseData.length > 1) {
        this.$message.error("编辑只能选择一条记录");
        return;
      }
      this.showEdit = true;
    },
    detail() {
      // 详情
      if (this.choseData.length == 0) {
        this.$message.error("请选中一条记录");
        return;
      }
      if (this.choseData.length > 1) {
        this.$message.error("详情只能选择一条记录");
        return;
      }
      this.showDetail = true;
    },
    del() {
      // 删除
      if (this.choseData.length == 0) {
        this.$message.warning("请选择一条记录");
        return;
      }

      this.$confirm("是否确定删除选择组织？", {
        // 确认按钮样式为自定义样式
        confirmButtonClass: "el-button--self",
        type: "warning"
      })
        .then(() => {
          let choseIds = [];
          this.choseData.forEach((val, index) => {
            const { orgId } = val;
            choseIds.push(orgId);
          });
          this.axios({
            method: "post",
            url: "/org/delete",
            data: { orgIds: choseIds.join(",") }
          }).then(res => {
            if (res.data.success) {
              this.$message.success("数据删除成功");
              this.query();
            } else {
              this.$message.error("数据删除失败：" + res.data.message);
            }
          });
        })
        .catch(() => {
          // 用户点击取消
        });
    },
    expandFilter() {
      // 展开/收起筛选
      this.filterExpand = !this.$data.filterExpand;
    },
    exportTo() {
      // 导出数据
      alert(
        `当前查询条件：${JSON.stringify(this.filter)}，传递到服务端导出数据`
      );
    },
    closeDialog(dialogId, refesh) {
      // 关闭模态窗口，供子组件使用
      switch (dialogId) {
        case "a": // 关闭添加
          this.showAdd = false;
          break;
        case "e": // 关闭编辑
          this.showEdit = false;
          break;
        case "d": // 关闭详情
          this.showDetail = false;
          break;
      }
      // 是否需要刷新列表数据
      if (refesh) {
        this.query();
      }
    },
    loadding(load) {
      // 切换/隐藏加载中，供子组件使用
      this.tableLoad = load;
    },
    addChose(arr) {
      this.choseData = arr;
    },
    formatterNumber(row, column, cellValue, index) {
      // 格式化数字
      return formatter.formatNumber(cellValue, 2);
    }
  },
  created() {
    // 组件创建时，默认查询数据
    this.query();
  },
  computed: {
    // 模态框标题
    dialogTitle() {
      let dialogTitle = "";
      if (this.showAdd) {
        dialogTitle = "添加组织";
      }
      if (this.showEdit) {
        dialogTitle = "编辑组织";
      }
      if (this.showDetail) {
        dialogTitle = "组织详情";
      }
      return dialogTitle;
    },
    // 是否显示模态框
    showDialog() {
      return this.showAdd || this.showEdit || this.showDetail;
    },
    // 单选选择的id
    choseId() {
      if (this.choseData != null && this.choseData.length > 0) {
        return this.choseData[0].orgId;
      }

      return "";
    }
  }
};
</script>

<style scoped>
</style>