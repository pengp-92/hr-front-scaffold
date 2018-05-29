<template>
  <div>
    <el-form :model="data" ref="form" :rules="formRules">
      <el-form-item label="组织编码" label-width="80px" prop="orgCode">
        <el-input v-model="data.orgCode"></el-input>
      </el-form-item>
      <el-form-item label="组织名称" label-width="80px" prop="orgName">
        <el-input v-model="data.orgName"></el-input>
      </el-form-item>
      <el-form-item label="所有人" label-width="80px" prop="orgOwner">
        <el-input v-model="data.orgOwner"></el-input>
      </el-form-item>
      <el-form-item label="组织状态" label-width="80px" prop="orgStatus">
        <el-select v-model="data.orgStatus" placeholder="请选中组织状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="-1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织电话" label-width="80px" prop="orgTel">
        <el-input v-model="data.orgTel"></el-input>
      </el-form-item>
      <el-form-item label="证件号码" label-width="80px" prop="idCard">
        <el-input v-model="data.idCard"></el-input>
      </el-form-item>
      <el-form-item class="pull-right">
        <el-button type="default" @click="closeDialog(false)">取 消</el-button>
        <el-button type="self" @click="submit">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义规则
    const checkOrgTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入组织电话"));
      }

      // 异步校验组织电话是否重复
      this.axios({
        method: "get",
        url: "/org/validateRepeat"
        // params: { orgTel: value }
      }).then(res => {
        if (res.data.success) {
          return callback(new Error("组织号码已存在"));
        } else {
          return callback();
        }
      });
    };
    return {
      data: {
        orgId: null,
        orgCode: null,
        orgName: null,
        orgOwner: null,
        orgTel: null,
        idCard: null,
        orgStatus: null
      },
      formRules: {
        orgCode: [
          { required: true, message: "请输入组织编码", trigger: "blur" }
          // 定义其他规则
        ],
        orgName: [
          { required: true, message: "请输入组织名称", trigger: "blur" }
        ],
        orgOwner: [],
        orgStatus: [
          { required: true, message: "请选择组织状态", trigger: "blur" }
        ],
        orgTel: [
          { required: true, message: "请输入组织电话", trigger: "blur" },
          { validator: checkOrgTel, trigger: "blur" }
        ],
        idCard: [
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式有误！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    closeDialog(refesh = false) {
      this.$emit("closeDialog", "a", refesh);
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("loadding", true);
          this.axios({
            method: "post",
            url: "/org/add",
            data: this.data
          }).then(res => {
            this.$emit("loadding", false);
            if (res.data.success) {
              this.$message.success("信息保存成功");
              this.closeDialog(true);
            } else {
              this.$message.error("信息保存失败：" + res.data.message);
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
