<template>
  <div class="container-left">
    <div class="hh-logo"></div>
    <div class="hh-nav">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu> -->
        <el-menu-item
          v-for="(item, index) in treeList"
          :key="index"
          @click="getMenuCode(item)"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.treeNames }}</span>
          <!-- <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
          </el-menu-item-group> -->
        </el-menu-item>
        <!-- <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item> -->
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeList: [],
    };
  },
  created() {
    setTimeout(() => {
      this.getTreeList();
    }, 1000);
  },
  methods: {
    getMenuCode(item) {
      console.log(item.nodeCode);
    },

    // 获取二级菜单

    getThrList(id) {},

    // 获取一级菜单
    getTreeList() {
      // this.$get("/plm/node/children?parentCode=0")
      //   .then((res) => {
      //     console.log(res);
      //     this.treeList = res;
      //   })
      //   .catch(() => {
      //     console.log("erer");
      //   });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="less">
</style>