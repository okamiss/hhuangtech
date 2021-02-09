<template>
  <div class="container-left">
    <div class="hh-logo">
      <router-link :to="{ path: '/' }">首页</router-link>
    </div>
    <div class="hh-nav">
      <div class="menu-tit">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-menu
        class="menu-Bar"
        @open="handleOpen"
        :default-active="navActiveId"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        v-if="value === 1"
      >
        <ChildMenu
          :dataList="this.treeList"
          :setPath="this.Navpath"
          @getItemVal="getMenuItem"
        ></ChildMenu>
      </el-menu>

      <el-menu
        v-else
        class="menu-Bar"
        :default-active="dictActiveId"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <ChildMenu
          :dataList="this.treeDict"
          :setPath="this.Dictpath"
          @getItemVal="getDictItem"
        ></ChildMenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import Bus from "../Bus/index.js";
import { GetMenuList, GetDictList } from "../../../api/index.js";
import ChildMenu from "./ChildMenu";
export default {
  components: {
    ChildMenu,
  },
  data() {
    return {
      treeList: [],
      list: [{ nodeCode: 0 }],
      treeDict: [],
      dict: [{ nodeCode: 0 }],
      test: {},
      Navpath: "/NavDetail",
      Dictpath: "/DictDetail",
      navActiveId: "1",
      dictActiveId: "1",
      value: 1,
      options: [
        {
          value: 1,
          label: "属性配置",
        },
        {
          value: 2,
          label: "字典页",
        },
      ],
    };
  },
  created() {
    this.getTreeList(this.list);
    this.GetDictListData(this.dict);
  },
  mounted() {
    Bus.$on("upNav", (data) => {
      if (data) {
        this.treeList = [];
        this.list = [{ nodeCode: 0 }];
        this.getTreeList(this.list);
        this.navActiveId = data;
      }
    });

    Bus.$on("upDict", (data) => {
      if (data) {
        this.treeDict = [];
        this.dict = [{ nodeCode: 0 }];
        this.GetDictListData(this.dict);
        this.dictActiveId = data;
      }
    });
  },
  watch: {
    // treeList(a, b) {
    //   // Bus.$emit("nodeCode", a[0]);
    // },
  },
  methods: {
    // 获取字典item
    getDictItem(item) {
      Bus.$emit("dictInfo", item);
    },
    // 获取菜单item
    getMenuItem(item) {
      Bus.$emit("nodeCode", item);
    },
    // 获取tree id
    handleOpen(key, keyPath) {},

    // 获取字典列表
    GetDictListData(node) {
      node.forEach((item) => {
        GetDictList({ parentCode: item.dictCode || 0 }).then((res) => {
          if (res.length) {
            item.child = item.child || [];
            item.child = [...item.child, ...res];
            this.GetDictListData(res);
          }
        });
      });
      this.treeDict = this.dict[0].child;
    },

    // 获取菜单列
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
      // Bus.$emit("nodeCode", this.treeList[0]);
    },
  },
};
</script>
<style lang="less">
.menu-tit {
  // text-align: center;
  // line-height: 30px;
  // color: #fff;
  // background: #409eff;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>