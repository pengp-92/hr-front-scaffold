<template>
  <div>
    <el-form :model="data" ref="form">
      <el-form-item label="组织编码" label-width="80px" prop="orgCode">
        <el-input v-model="data.orgCode" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="组织名称" label-width="80px" prop="orgName">
        <el-input v-model="data.orgName" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="所有人" label-width="80px" prop="orgOwner">
        <el-input v-model="data.orgOwner" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="组织状态" label-width="80px" prop="orgStatus">
        <el-select v-model="data.orgStatus" placeholder="请选择组织状态" :disabled=true>
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="-1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织电话" label-width="80px" prop="orgTel">
        <el-input v-model="data.orgTel" :disabled=true></el-input>
      </el-form-item>
      <el-form-item label="证件号码" label-width="80px" prop="idCard">
        <el-input v-model="data.idCard" :disabled=true></el-input>
      </el-form-item>
      <el-form-item class="pull-right">
        <el-button type="default" @click="closeDialog(false)">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["orgId"],
  data() {
    return {
      data: {
        orgId: null,
        orgCode: null,
        orgName: null,
        orgOwner: null,
        orgTel: null,
        idCard: null,
        orgStatus: null
      }
    };
  },
  methods: {
    closeDialog(refesh = false) {
      this.$emit("closeDialog", "d", refesh);
    }
  },
  created() {
    this.$emit("loadding", true);
    // 查询数据
    this.axios({
      method: "get",
      url: "/org/detail"
      // TO-DO 联调时释放下面的代码
      // params: { orgId: this.$props.orgId }
    }).then(res => {
      this.$emit("loadding", false);
      if (res.data.success) {
        this.data = res.data.data;
      } else {
        this.$message.error("待编辑数据不存在");
        this.closeDialog();
      }
    });
  }
};
</script>

<style scoped>
</style>
