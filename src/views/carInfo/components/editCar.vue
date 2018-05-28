<template>
  <el-dialog title="编辑车辆" :visible.sync="dialogVisible" width="50%" :before-close="closeModel">
    <el-form label-position="labelPosition" label-width="100px" ref="car" :rules="rules" :model="car">

      <el-row>
        <el-col :span="12">
          <el-form-item label="所属资质：" prop="carOwner">
            <el-col :span="20">
              <el-select v-model="car.carOwner" placeholder="请选择" style="width:300px">
                <el-option v-for="item in this.ownerMsg" :key="item.carOwnerStat" :label="item.carOwnerStr" :value="item.carOwnerStat">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车牌号：" prop="carNo">
            <el-col :span="20">
              <el-input v-model="car.carNo" placeholder="请输入内容"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="品牌：">
            <el-col :span="20">
              <el-input v-model="car.brand" placeholder="请输入内容"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="行驶证号：">
            <el-col :span="20">
              <el-input v-model="car.vehicleCard" placeholder="请输入内容"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="车型：" prop="carType">
            <el-col :span="20">
              <el-select v-model="car.carType" placeholder="请选择" style="width:300px">
                <el-option v-for="item in this.carTypeMsg" :key="item.type" :label="item.typeStr" :value="item.type">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运输状态：" prop="transStat">
            <el-col :span="20">
              <el-select v-model="car.transStat" placeholder="请选择" style="width:300px">
                <el-option v-for="item in this.transStatus" :key="item.transStat" :label="item.transStatStr" :value="item.transStat">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click=closeModel()>取 消</el-button>
      <el-button type="primary" @click="editCar('car')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["message", "selectData"],

  /** 参数定义 */
  data() {
    return {
      /** 是否显示mdole */
      dialogVisible: false,
      /** car实例 */
      car: {
        carOwner: "", // 所属资质
        carNo: "", // 车牌号
        brand: "", // 品牌
        vehicleCard: "", // 品牌
        operCard: "", // 运营证号
        transStat: "", // 运输状态
        carLong: 0,
        carWidth: 0,
        carHeight: 0,
        loadVlm: 0,
        loadQty: 0
      },
      /** 所属资质 */
      ownerMsg: [
        { carOwnerStat: "OWNER", carOwnerStr: "自有" },
        { carOwnerStat: "BELONG", carOwnerStr: "挂靠" }
      ],
      /** 车型 */
      carTypeMsg: [
        { type: "BOX", typeStr: "箱式" },
        { type: "PLATE", typeStr: "板式" },
        { type: "SELF", typeStr: "自卸货式" },
        { type: "TRACTOR", typeStr: "牵引车" },
        { type: "TRAILER", typeStr: "挂车" },
        { type: "NEWENERGY", typeStr: "新能源汽车" }
      ],
      /** 车辆运输状态 */
      transStatus: [
        { transStat: 1, transStatStr: "空闲" },
        { transStat: 2, transStatStr: "运输中" },
        { transStat: -1, transStatStr: "无法出车" }
      ],
      rules: {
        carNo: [
          { required: true, message: "所属资质不能为空", trigger: "blur" }
        ],
        carOwner: [
          { required: true, message: "车牌号不能为空", trigger: "blur" }
        ],
        carType: [{ required: true, message: "车型不能为空", trigger: "blur" }],
        transStat: [
          { required: true, message: "运输状态不能为空", trigger: "blur" }
        ]
      }
    };
  },

  watch: {
    message(value) {
      this.dialogVisible = value;
    },
    selectData(value) {
      this.car = value[0];
      console.log(this.car);
    }
  },

  /** 方法 */
  methods: {
    editCar(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var token =
            "ad5ca800601bf51bababee508a8118226d2c69db09de6b5f8d8d0c3043d62d006912c4f4467a5e6176faaaa1e79fb9d6210ee658709c88d34bbf0fe2324028b520e1e55cd5462d7e";
          // https://api.haorun.win/oss/v2/tms/tms/car/save
          this.axios({
            method: "post",
            // url: "http://localhost:18001/tms/car/save",
            url: "https://api.haorun.win/oss/v2/tms/tms/car/save",
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            },
            params: {
              carBody: JSON.stringify(this.car),
              access_token: token
            }
          }).then(res => {
            console.log(res);
            if (res.data.success) {
              //返回数据正常
              this.$message.success("修改车辆成功！");
              /** 重置弹窗内的数据 */
              // this.resetData();
              /** 刷新 Table 数据 */
              this.$emit("editCarToCarInfo", "regainData");
              /** 关闭对话框 */
              this.closeModel();
            } else {
              console.log(res.data.message);
              this.$message.error(res.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    /** 关闭 model 窗口 */
    closeModel() {
      this.$emit("editCarToCarInfo", "closeEditCarModel");
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
