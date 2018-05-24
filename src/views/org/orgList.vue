<template>
  <el-row>
    <el-col :span="24" class="table-header-button">
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="edit">编辑</el-button>
        <el-button type="primary" icon="el-icon-document" @click="detail">详情</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="del">删除</el-button>
      </el-button-group>
    </el-col>
    <el-col :span="24">
      <el-table :data="data" stripe border v-loading="tableLoad" @selection-change="addChose" ref="multipleTable">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="orgCode" width="auto" label="组织编码" align="left"></el-table-column>
        <el-table-column prop="orgName" width="auto" label="组织名称" align="left"></el-table-column>
        <el-table-column prop="corpName" width="auto" label="所属公司" align="left"></el-table-column>
        <el-table-column prop="idCard" width="auto" label="证件号码" align="left"></el-table-column>
        <el-table-column prop="stlFee" width="auto" label="当前余额" align="left"></el-table-column>
        <el-table-column prop="orgStatus" width="80" label="状态" align="center" header-align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.orgStatus === 1 ? 'primary' : 'danger'" disable-transitions>{{scope.row.orgStatusStr}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24">
      这里是底部分页区域
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          orgId: "ff80808161df84de0161e08fdd7700dc",
          orgCode: "ORG20180424163553234",
          orgName: "北京组织",
          corpId: "4028ba5256d1b2a8015707a1b66e20dc",
          corpName: "云尚助力",
          orgOwner: "2",
          orgTel: "18200000010",
          idCard: "1",
          memberId: "ff80808160b485460161e08fdd200015",
          memberName: null,
          stlFee: "0",
          orgStatus: -1,
          orgStatusStr: "停用"
        },
        {
          orgId: "ff80808161d1311c0161d4f4615a0000",
          orgCode: "ORG20180227095040950",
          orgName: "成都组织-1",
          corpId: "4028ba5256d1b2a8015707a1b66e20dc",
          corpName: "云尚助力",
          orgOwner: "星星",
          orgTel: "18100000014",
          idCard: "33",
          memberId: "ff80808160b485460161d4f460b30012",
          memberName: null,
          stlFee: "115",
          orgStatus: 1,
          orgStatusStr: "正常"
        },
        {
          orgId: "ff80808161786af001617891a3c80000",
          orgCode: "ORG20180209111746040",
          orgName: "重庆-干线组织",
          corpId: "4028ba5256d1b2a8015707a1b66e20dc",
          corpName: "云尚助力",
          orgOwner: "信息",
          orgTel: "18100000013",
          idCard: "333",
          memberId: "ff80808160b4854601617891a15d0011",
          memberName: null,
          stlFee: "1298.80",
          orgStatus: 1,
          orgStatusStr: "正常"
        },
        {
          orgId: "ff808081612351a0016127d071f400b5",
          orgCode: "ORG20180124185707556",
          orgName: "重庆组织1",
          corpId: "4028ba5256d1b2a8015707a1b66e20dc",
          corpName: "云尚助力",
          orgOwner: "1",
          orgTel: "18100000009",
          idCard: "22",
          memberId: "ff80808160b48546016127d0714e0008",
          memberName: null,
          stlFee: "-1778.11",
          orgStatus: 1,
          orgStatusStr: "正常"
        },
        {
          orgId: "8aaadbd16260f42701626547946e0328",
          orgCode: "ORG20180327102652652",
          orgName: "武汉组织",
          corpId: "4028ba5256d1b2a8015707a1b66e20dc",
          corpName: "云尚助力",
          orgOwner: "111",
          orgTel: "18100000026",
          idCard: "33",
          memberId: "8aaa4883624cceee0162654794430001",
          memberName: null,
          stlFee: "10216.10",
          orgStatus: 1,
          orgStatusStr: "正常"
        },
        {
          orgId: "8aaaad8462f1a1f30162fb74110305cc",
          orgCode: "ORG20180504233614139",
          orgName: "上海组织",
          corpId: "4028ba5256d1b2a8015707a1b66e20dc",
          corpName: "云尚助力",
          orgOwner: "信息",
          orgTel: "18200000004",
          idCard: "2",
          memberId: "8aaa4883624cceee0162fb7410e70015",
          memberName: null,
          stlFee: "100",
          orgStatus: 1,
          orgStatusStr: "正常"
        },
        {
          orgId: "8aaa93596324eeb20163251fd7b3001e",
          orgCode: "ORG20180503163033907",
          orgName: "西藏组织",
          corpId: "4028ba5256d1b2a8015707a1b66e20dc",
          corpName: "云尚助力",
          orgOwner: "44",
          orgTel: "18300000001",
          idCard: "2",
          memberId: "8aaa4883624cceee0163251fd79c0020",
          memberName: null,
          stlFee: "0",
          orgStatus: 1,
          orgStatusStr: "正常"
        },
        {
          orgId: "8aaa93596324eeb20163251c14130019",
          orgCode: "ORG20180503162627216",
          orgName: "西安组织",
          corpId: "4028ba5256d1b2a8015707a1b66e20dc",
          corpName: "云尚助力",
          orgOwner: "出差",
          orgTel: "18200000013",
          idCard: "3",
          memberId: "8aaa4883624cceee016323b33f12001f",
          memberName: null,
          stlFee: "0",
          orgStatus: 1,
          orgStatusStr: "正常"
        },
        {
          orgId: "8aaa3fc4632b88fd01632bcda4e10034",
          orgCode: "ORG20180504233807457",
          orgName: "纽约组织",
          corpId: "4028ba5256d1b2a8015707a1b66e20dc",
          corpName: "云尚助力",
          orgOwner: "2",
          orgTel: "18800000011",
          idCard: "2",
          memberId: "8aaa4883624cceee01632bcda4cb0032",
          memberName: null,
          stlFee: "0",
          orgStatus: 1,
          orgStatusStr: "正常"
        },
        {
          orgId: "8aaa3fc4632b88fd01632bcca1260030",
          orgCode: "ORG20180504233700966",
          orgName: "青海组织",
          corpId: "4028ba5256d1b2a8015707a1b66e20dc",
          corpName: "云尚助力",
          orgOwner: "18200000004",
          orgTel: "18200000044",
          idCard: "2",
          memberId: "8aaa4883624cceee01632b4d65180025",
          memberName: null,
          stlFee: "0",
          orgStatus: 1,
          orgStatusStr: "正常"
        }
      ],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      tableLoad: false,
      choseData: []
    };
  },
  methods: {
    add() {
      alert("添加");
    },
    edit() {
      if (this.choseData.length == 0) {
        this.$message.error("请选中一条记录");
        return;
      }
      if (this.choseData.length > 1) {
        this.$message.error("编辑只能选择一条记录");
        return;
      }
      alert("编辑：" + this.choseData[0].orgId);
    },
    detail() {
      if (this.choseData.length == 0) {
        this.$message.error("请选中一条记录");
        return;
      }
      if (this.choseData.length > 1) {
        this.$message.error("详情只能选择一条记录");
        return;
      }
      alert("显示详情：" + this.choseData[0].orgId);
    },
    del() {
      if (this.choseData.length == 0) {
        this.$message.error("请选择一条记录");
        return;
      }

      alert("删除：" + this.choseData[0].orgId);
    },
    addChose(arr) {
      this.choseData = arr;
    }
  },
  created() {
    // alert("this is called when created");
  }
};
</script>

<style scoped>
</style>