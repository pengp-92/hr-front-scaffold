<template>
  <el-row>
    <tool-car :message="toToolCarProp" v-on:toolCarToCarInfo="toolCarToCarInfo"></tool-car>
    <table-car :message="toTableCarProp" v-on:tableCarToCarInfo='tableCarToCarInfo'></table-car>
    <add-car :message="showAddCarModel" v-on:addCarToCarInfo='addCarToCarInfo'></add-car>
    <edit-car :message="showEditCarModel" :selectData="selectRow" v-on:editCarToCarInfo='editCarToCarInfo'></edit-car>
    <!-- <hamburger :message="showAddCarModel"></hamburger> -->
  </el-row>
</template>       

<script type="text/ecmascript-6">
import toolCar from "./components/toolCar.vue";
import addCar from "./components/addCar.vue";
import editCar from "./components/editCar.vue";
import tableCar from "./components/tableCar.vue";
// import hamburger from "./components/Hamburger";

export default {
  /** 组件 */
  components: {
    addCar: addCar,
    tableCar: tableCar,
    toolCar: toolCar,
    // hamburger: hamburger,
    editCar: editCar
  },

  /** 参数定义 */
  data() {
    return {
      childWords: "",

      /** 添加车辆 model 显示 */
      showAddCarModel: false,

      /** 编辑车辆 model 显示 */
      showEditCarModel: false,

      /** 父传子 */
      toTableCarProp: "",

      /** 父传子 */
      toToolCarProp: "",

      /** tableCar组件中选中的数据 */
      selectRow: [],

      aaa: {
        name: "1",
        age: 12
      }
    };
  },

  /** 方法 */
  methods: {
    /** 监听事件(子传父)：toolCar To CarInfo */
    toolCarToCarInfo(msg) {
      if (msg === "openAddCarModel") {
        /** 显示添加车辆model */
        this.showAddCarModel = true;
      } else if (msg === "openEditCarModel") {
        /** 显示编辑车辆model */
        this.showEditCarModel = true;
      } else if (msg.qVal !== undefined) {
        /** 传值 给 tableCar 组件，并按需求查询 */
        this.toTableCarProp = "";
        this.toTableCarProp = msg;
      }
    },

    /** 监听事件(子传父) addCar To CarInfo */
    addCarToCarInfo(msg) {
      if (msg === "closeAddCarModel") {
        /** 隐藏添加车辆model */
        this.showAddCarModel = false;
      } else if (msg === "regainData") {
        /** addCar组件 需要 tableCar组件重新获取数据 */
        this.toTableCarProp = "regainData";
      }
    },

    /** 监听事件(子传父) tableCar To CarInfo */
    tableCarToCarInfo(msg) {
      /** 为单选，所以如果超过2个提示只能单选 */
      if (msg.length === 1) {
        /** 告诉 toolCar组件 编辑按钮可以用 */
        this.toToolCarProp = "enable";
        this.selectRow = msg;
      } else if (msg.length === 0) {
        /** 告诉 toolCar组件 编辑按钮不能用 */
        this.toToolCarProp = "disabled";
      } else if (msg === "clearQuery") {
        this.toTableCarProp = "";
      } else {
        this.$message.warning("只能选中一个！");
        /** 告诉 toolCar组件 编辑按钮不能用 */
        this.toToolCarProp = "disabled";
      }
    },

    /** 监听事件(子传父) editCar To CarInfo */
    editCarToCarInfo(msg) {
      if (msg === "closeEditCarModel") {
        /** 隐藏编辑车辆model */
        this.showEditCarModel = false;
      } else if (msg === "regainData") {
        /** addCar组件 需要 tableCar组件重新获取数据 */
        this.toTableCarProp = "regainData";
      }
    },

    editCar(msg) {
      this.childWords = msg;
      this.showAddCarModel = msg;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>