<template>
  <div class="container-left">
    <div class="hh-logo"></div>
    <div class="hh-nav">
      <div class="menu-tit">菜单</div>
      <el-menu class="menu-Bar" @open="handleOpen">
        <ChildMenu
          :dataList="this.treeList"
          :setPath="this.Navpath"
          @getItemVal="getMenuItem"
        ></ChildMenu>
      </el-menu>
      <div class="menu-tit">字典</div>
      <el-menu class="menu-Bar">
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
    };
  },
  created() {
    this.getTreeList(this.list);
    this.GetDictListData(this.dict);
  },
  mounted() {
    Bus.$on("create", (data) => {
      if (data) {
        this.treeList = [];
        this.list = [{ nodeCode: 0 }];
        this.getTreeList(this.list);

        this.treeDict = [];
        this.dict = [{ nodeCode: 0 }];
        this.GetDictListData(this.dict);
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
  text-align: center;
  line-height: 30px;
  color: blue;
}
</style>