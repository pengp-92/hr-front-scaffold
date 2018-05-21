<template>
  <el-row>
    <el-col :span='24' class="el-hd">
      <el-button @click='_back'>返回列表</el-button>
      <el-input placeholder="请输入关键字" icon="search" v-model="searchName" class='ipt' :on-icon-click='search'></el-input>
    </el-col>
    <el-col :span='24'>
      <el-table :data='users.data' v-loading='users.tableLoad' @selection-change="addChose">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column prop="id" width="180" label="id"></el-table-column>
        <el-table-column prop='name' label="名字" width="90"></el-table-column>
        <el-table-column prop='age' label="年龄" width="80"></el-table-column>
        <el-table-column prop='sex' label="性别" width="80" :formatter='sex'></el-table-column>
        <el-table-column prop='birth' label="生日" width="150"></el-table-column>
        <el-table-column prop='addr' label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click='_edit(scope.row)'>编辑</el-button>
            <el-button size="small" type="danger" @click='del(scope.$index,scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span='24' class="ft">
      <el-button type='danger' @click='delAll'>删除所选</el-button>
      <el-pagination layout='total,sizes,prev,pager,next,jumper' @size-change="changeSize" @current-change='changePage' :current-page='users.currentPage' :page-size='users.pageSize' :total='users.total'></el-pagination>
    </el-col>
    <el-dialog title="编辑用户" :visible.sync="edit.show">
      <el-form :model='edit.data'>
        <el-form-item label="姓名">
          <el-input auto-complete="off" v-model="edit.data.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio class="radio" v-model="edit.data.sex" label="1">男</el-radio>
          <el-radio class="radio" v-model="edit.data.sex" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number :min="1" v-model="edit.data.age"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="edit.data.birth" format='yyyy-MM-dd'></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input auto-complete="off" v-model="edit.data.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit.show = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      users: {
        data: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        tableLoad: false
      },
      delSel: [],
      searchName: "",
      edit: {
        data: {},
        show: false
      }
    };
  },
  methods: {
    getdata(option) {
      this.users.tableLoad = true;
      this.axios.get("/user/listpage", { params: option }).then(res => {
        this.users.total = res.data.users.total;
        this.users.data = res.data.users.users;
        this.users.tableLoad = false;
      });
    },
    _back() {
      this.$router.go(0);
    },
    _edit(row) {
      this.edit.data = row;
      this.edit.show = true;
    },
    editUser() {
      this.axios
        .get("http://localhost:3000/user/edit", { params: this.edit.data })
        .then(res => {
          if ((res.data.code == 200)) {
            this.$message.success("修改成功");
          }
          this.getdata({
            page: this.users.currentPage,
            pagesize: this.users.pageSize
          });
        });
      this.edit.show = false;
    },
    _time(a) {
      console.log(typeof a);
    },
    sex(r, c) {
      return r.sex == 1 ? "男" : r.sex == 0 ? "女" : "未知";
    },
    changePage(pager) {
      this.users.currentPage = pager;
      this.getdata({
        page: this.users.currentPage,
        pagesize: this.users.pageSize
      });
    },
    changeSize(size) {
      this.users.currentPage = 1;
      this.users.pageSize = size;
      this.getdata({ pagesize: this.users.pageSize });
    },
    del(i, r) {
      var id = r.id;
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "danger"
      })
        .then(() => {
          this.axios
            .get("http://localhost:3000/user/remove", { params: { id: id } })
            .then(res => {
              this.getdata({
                page: this.users.currentPage,
                pagesize: this.users.pageSize
              });
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message({
                  type: "success",
                  message: "删除失败!"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addChose(arr) {
      for (let i = 0; i < arr.length; i++) {
        this.delSel.push(arr[i].id);
      }
    },
    delAll() {
      var idArr = this.delSel.join();
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "danger"
      })
        .then(() => {
          this.axios
            .get("http://localhost:3000/user/batchremove", {
              params: { ids: idArr }
            })
            .then(res => {
              this.getdata({
                page: this.users.currentPage,
                pagesize: this.users.pageSize
              });
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message({
                  type: "success",
                  message: "删除失败!"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    search() {
      this.getdata({ name: this.searchName });
    }
  },
  created() {
    this.getdata();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ft {
  display: flex;
  align-items: center;
  background: #eee;
  padding: 20px;
  margin-top: 10px;
}

.ft button {
  margin-right: 20px;
}

.el-hd {
  padding: 10px;
  background: #eee;
  margin-bottom: 5px;
}

.ipt {
  width: 200px;
  float: right;
}
</style>
