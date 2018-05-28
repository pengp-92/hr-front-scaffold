<template>
  <div>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "一级 1",
          id: "1",
          children: [
            {
              label: "二级 1-1",
              id: "2",
              children: [
                {
                  label: "三级 1-1-1",
                  id: "3"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          id: "3",
          children: [
            {
              label: "二级 2-1",
              id: "3",
              children: [
                {
                  label: "三级 2-1-1",
                  id: "3"
                }
              ]
            },
            {
              label: "二级 2-2",
              id: "3",
              children: [
                {
                  label: "三级 2-2-1",
                  id: "3"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          id: "3",
          children: [
            {
              label: "二级 3-1",
              id: "3",
              children: [
                {
                  label: "三级 3-1-1",
                  id: "3"
                }
              ]
            },
            {
              label: "二级 3-2",
              id: "3",
              children: [
                {
                  label: "三级 3-2-1",
                  id: "3"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>