<template>
  <div class="container">
    <el-form :model='add.data' class="form" ref='data'>
      <el-form-item label="姓名" prop='name'>
        <el-input auto-complete="off" v-model="add.data.name"></el-input>
      </el-form-item>
      <el-form-item label="性别2" prop='sex'>
        <el-radio class="radio" v-model="add.data.sex" :label="1">男</el-radio>
        <el-radio class="radio" v-model="add.data.sex" :label="0">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄" prop='age'>
        <el-input-number :min="1" v-model="add.data.age"></el-input-number>
      </el-form-item>
      <el-form-item label="生日" class='birth' prop='birth'>
        <el-date-picker v-model="add.data.birth" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="地址" prop='addr'>
        <el-input auto-complete="off" v-model="add.data.addr"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addUser">添 加</el-button>
      <el-button @click="reset('data')">重置</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      add: {
        data: {
          name: '',
          age: 1,
          sex: 1,
          birth: '2017-06-14',
          addr: ''
        }
      }
    };
  },
  methods: {
    reset(r) {
      this.$refs[r].resetFields();
    },
    addUser() {
      this.axios.get('http://localhost:3000/user/add', { params: this.add.data }).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg)
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
.container {
  width: 500px;
  margin: 0 auto;
  border: 1px solid #00eeff;
  padding: 30px 80px;
  border-radius: 20px;
}

.dialog-footer {
  margin-top: 20px;
}

.birth {
  margin-top: 20px;
}
</style>
