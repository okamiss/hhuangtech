<template>
  <div class="menu-tree">
    <label v-for="list in dataList" :key="list.id">
      <el-submenu :index="list.id" v-if="list.child">
        <template slot="title">
          <div @click="getItem(list)" class="itembox">
            <router-link :to="{ path: setPath }">
              <i class="el-icon-menu"></i>
              <span>
                {{ list.defaultDisplay }}
              </span>
            </router-link>
            <!-- <span>{{ list.defaultDisplay }}</span> -->
          </div>
        </template>
        <label>
          <child-menu
            :dataList="list.child"
            :setPath="setPath"
            @getItemVal="getItem"
          ></child-menu>
        </label>
      </el-submenu>
      <el-menu-item v-else :index="list.id" @click="getItem(list)">
        <i class="el-icon-full-screen"></i>
        <span slot="title">
          <router-link :to="{ path: setPath }">{{
            list.defaultDisplay
          }}</router-link>
        </span>
      </el-menu-item>
    </label>
  </div>
</template>

<script>
import Bus from "../Bus/index.js";
export default {
  name: "childMenu",
  //   props: ["dataList"],
  props: {
    dataList: {
      type: Array,
      default: null,
    },
    setPath: {
      type: String,
      default: null,
    },
  },
  created() {},
  mounted() {
    // Bus.$on("create", (data) => {
    //   if (data) {
    //     this.getItem(data);
    //   }
    // });
  },
  watch: {
    dataList(a, b) {
      setTimeout(() => {
        this.$forceUpdate();
      }, 1000);
    },
  },
  methods: {
    getItem(list) {
      // list.path = this.setPath;
      this.$emit("getItemVal", list);
      // Bus.$emit("nodeCode", list);
    },
  },
};
</script>

<style lang="less" scoped>
.itembox a {
  display: block;
  width: 100%;
  height: 100%;
}
</style>