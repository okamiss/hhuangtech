<template>
  <div class="menu-tree">
    <label v-for="list in dataList" :key="list.id">
      <el-submenu :index="list.id" v-if="list.child">
        <template slot="title">
          <div @click="getItem(list)">
            <i :class="list.icon"></i>
            <span>
              {{ list.defaultDisplay }}
            </span>
          </div>
        </template>
        <label>
          <child-menu :dataList="list.child" @getItemVal="getItem"></child-menu>
        </label>
      </el-submenu>
      <el-menu-item v-else :index="list.id" @click="getItem(list)">
        <i :class="list.icon"></i>
        {{ list.defaultDisplay }}
      </el-menu-item>
    </label>
  </div>
</template>

<script>
import Bus from '../Bus/index.js'
export default {
  name: 'childMenu',
  //   props: ["dataList"],
  data() {
    return {
      icon: '',
      iconC: '',
    }
  },
  props: {
    dataList: {
      type: Array,
      default: null,
    },
  },
  created() {},
  mounted() {},
  watch: {
    dataList(a, b) {
      setTimeout(() => {
        this.$forceUpdate()
      }, 2000)
    },
  },
  methods: {
    getItem(list) {
      this.$emit('getItemVal', list)
    },
  },
}
</script>

<style lang="less" scoped>
.itembox {
  display: block;
  width: 100%;
  height: 100%;
  color: inherit;
}
</style>
