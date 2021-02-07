<template>
  <div class="menu-tree">
    <label v-for="list in dataList" :key="list.id">
      <el-submenu :index="list.id" v-if="list.child">
        <template slot="title">
          <div @click="getItem(list)">
            <i class="el-icon-menu"></i>
            <span>{{ list.defaultDisplay }}</span>
          </div>
        </template>
        <label>
          <child-menu :dataList="list.child"></child-menu>
        </label>
      </el-submenu>
      <el-menu-item v-else :index="list.id" @click="getItem(list)">
        <i class="el-icon-full-screen"></i>
        <span slot="title">{{ list.defaultDisplay }}</span>
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
      this.getItem(a[0]);
      setTimeout(() => {
        this.$forceUpdate();
      }, 1000);
    },
  },
  methods: {
    getItem(list) {
      this.$forceUpdate();
      Bus.$emit("nodeCode", list);
    },
  },
};
</script>