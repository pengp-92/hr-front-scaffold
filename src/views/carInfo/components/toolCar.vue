<template>
  <el-form label-position="labelPosition" label-width="100px" style="margin-top:20px">
    <el-row>
      <el-col :span="8">
        <!-- <el-input placeholder="请输入内容" v-model="qVal" clearable>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input> -->
        <el-form-item>
          <el-col :span="20">
            <el-input v-model="query.qVal" placeholder="请输入内容"></el-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车型：" prop="carType">
          <el-col :span="20">
            <el-select v-model="query.carType" placeholder="请选择" style="width:300px" filterable>
              <el-option v-for="item in this.carTypeMsg" :key="item.type" :label="item.typeStr" :value="item.type">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click=search()>搜索</el-button>
        <el-button type="danger" disabled>删除</el-button>
        <el-button type="success" @click=addCar()>新增</el-button>
        <el-button type="warning" @click=editCar() v-bind:disabled="this.onOff">编辑</el-button>
        <el-button type="info" :icon="this.showMoreInfoOnOff ? 'el-icon-caret-top' : 'el-icon-caret-bottom'" @click=showMoreInfo()>更多</el-button>
      </el-col>
    </el-row>

    <el-row v-if=showMoreInfoOnOff>
      <el-col :span="8">
        <!-- <el-input placeholder="请输入内容" v-model="qVal" clearable>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input> -->
        <el-form-item>
          <el-col :span="20">
            <el-input v-model="query.qVal" placeholder="请输入内容"></el-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车型：" prop="carType">
          <el-col :span="20">
            <el-select v-model="query.carType" placeholder="请选择" style="width:300px">
              <el-option v-for="item in this.carTypeMsg" :key="item.type" :label="item.typeStr" :value="item.type">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: ["message"],
  /** 参数定义 */
  data() {
    return {
      /** 选择车型 */
      selectCarType: "",
      /** 查询条件 */
      query: {
        /** 模糊查询 */
        qVal: "",
        /** 选择车型 */
        carType: ""
      },
      /** 编辑按钮是否可用 */
      onOff: true,
      /** From表单对其方式 */
      labelPosition: "right",
      /** 车型 */
      carTypeMsg: [
        { type: "", typeStr: "全部" },
        { type: "BOX", typeStr: "箱式" },
        { type: "PLATE", typeStr: "板式" },
        { type: "SELF", typeStr: "自卸货式" },
        { type: "TRACTOR", typeStr: "牵引车" },
        { type: "TRAILER", typeStr: "挂车" },
        { type: "NEWENERGY", typeStr: "新能源汽车" }
      ],
      showMoreInfoOnOff: false
    };
  },

  /** 监听props 父传子 */
  watch: {
    message(value) {
      if (value === "disabled") {
        /** 禁止使用 编辑 按钮 */
        this.onOff = true;
      } else if (value === "enable") {
        /** 可以使用 编辑 按钮 */
        this.onOff = false;
      }
    }
  },

  /** 方法 */
  methods: {
    /** 打开 新增车辆 页面 */
    search() {
      // console.log(this.query);
      this.$emit("toolCarToCarInfo", this.query);
    },
    /** 打开 新增车辆 页面 */
    addCar() {
      this.$emit("toolCarToCarInfo", "openAddCarModel");
    },

    /** 编辑车辆 */
    editCar() {
      // alert("编辑车辆");
      this.$emit("toolCarToCarInfo", "openEditCarModel");
    },

    /** 打开更多筛选框 */
    showMoreInfo() {
      this.showMoreInfoOnOff = !this.showMoreInfoOnOff;
      console.log(this.showMoreInfoOnOff);
    },

    /** 关闭对话框 */
    handleClose(done) {
      console.log("关闭对话框");
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
