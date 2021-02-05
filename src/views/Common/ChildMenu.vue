<template>
  <div class="menu-tree">
    <label v-for="list in dataList" :key="list.id">
      <el-submenu :index="list.id" v-if="list.child">
        <template slot="title">
          <div @click="getItem(list)">
            <i class="el-icon-menu" v-if="list.child"></i>
            <span>{{ list.treeNames }}</span>
          </div>
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
  //   props: ["dataList"],
  props: {
    dataList: {
      type: Array,
      default: null,
    },
  },
  created() {
    // console.log(this.dataList);
  },
  mounted() {
    // Bus.$on("create", (data) => {
    //   console.log(data);
    //   if (data) {
    //     this.getItem(data);
    //   }
    // });
  },
  watch: {
    dataList(a, b) {
      console.log(a, b);
      this.getItem(a[0]);
      setTimeout(() => {
        this.$forceUpdate();
      }, 500);
    },
  },
  methods: {
    getItem(list) {
      console.log(list.nodeCode);
      this.$forceUpdate();
      Bus.$emit("nodeCode", list);
    },
  },
};
</script>