<template>
  <div class="menu-tree">
    <label v-for="list in dataList" :key="list.id">
      <el-submenu :index="list.id" v-if="list.child">
        <template slot="title" @click="getItem(list)">
          <i class="el-icon-menu" v-if="list.child"></i>
          <span>{{ list.treeNames }}</span>
        </template>
        <label>
          <child-menu :dataList="list.child"></child-menu>
        </label>
      </el-submenu>
      <el-menu-item v-else :index="list.id" @click="getItem(list)">
        <span slot="title">{{ list.treeNames }}</span>
      </el-menu-item>
    </label>
  </div>
</template>

<script>
import Bus from "./Bus.js";
export default {
  name: "childMenu",
  props: ["dataList"],
  created() {},
  mounted() {},
  methods: {
    getItem(list) {
      this.$forceUpdate();
      //   console.log(list);
      Bus.$emit("nodeCode", list);
    },
  },
};
</script>