<template>
  <el-form class="form" :model='login' ref='login'>
    <el-form-item label='用户名' prop='name'>
      <el-input type='text' v-model="login.name"></el-input>
    </el-form-item>
    <el-form-item label='密码' prop='pwd'>
      <el-input type='password' v-model="login.pwd"></el-input>
    </el-form-item>
    <el-button type='primary' @click='_login'>登陆</el-button>
    <el-button @click='reset("login")'>重置</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      login: {
        name: '',
        pwd: ''
      }
    }
  },
  methods: {
    reset(r) {
      this.$refs[r].resetFields();
    },
    _login() {
      this.axios.get('http://localhost:3000/login', { params: { username: this.login.name, password: this.login.pwd } })
        .then((res) => {
          if (res.data.code === 200) {
            sessionStorage.setItem('user', JSON.stringify(res.data.user))
            this.$router.push('/')
            this.$message.success(res.data.msg)
          } else if (res.data.code === 500) {
            this.$message.error(res.data.msg)
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form {
  width: 500px;
  margin: 0 auto;
  margin-top: 100px;
  border: 1px solid #00eeff;
  padding: 50px;
  border-radius: 20px;
}
</style>
