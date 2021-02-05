<template>
  <div class="container-left">
    <div class="hh-logo"></div>
    <div class="hh-nav">
      <el-menu default-active="1" class="menu-Bar" @open="handleOpen">
        <ChildMenu :dataList="this.treeList"></ChildMenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import Bus from "./Bus.js";
import { GetMenuList } from "../../../api/index.js";
import ChildMenu from "./ChildMenu";
export default {
  components: {
    ChildMenu,
  },
  data() {
    return {
      treeList: [],
      list: [{ nodeCode: 0 }],
    };
  },
  created() {
    this.getTreeList(this.list);
  },
  mounted() {
    Bus.$on("create", (data) => {
      console.log(data);
      if (data) {
        // this.created();
      }
    });
  },
  methods: {
    // 获取tree id
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },

    // 获取菜单列表
    getTreeList(node) {
      node.forEach((item) => {
        GetMenuList({ parentCode: item.nodeCode || 0 }).then((res) => {
          if (res.length) {
            item.child = item.child || [];
            item.child = [...item.child, ...res];
            this.getTreeList(res);
          }
        });
      });
      this.treeList = this.list[0].child;
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="less">
</style>