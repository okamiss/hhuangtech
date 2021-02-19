<template>
  <div class="container-left">
    <div class="hh-logo">
      <router-link :to="{ path: '/' }">首页</router-link>
    </div>
    <div class="hh-nav">
      <div class="menu-tit">
        <el-select v-model="value" placeholder="请选择" @change="changeSel">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <template v-if="value === '1'">
        <el-menu
          class="menu-Bar"
          @open="handleOpen"
          :default-active="navActiveId"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <ChildMenu
            :dataList="this.treeList"
            @getItemVal="getMenuItem"
          ></ChildMenu> </el-menu
      ></template>
      <template v-else>
        <el-menu
          class="menu-Bar"
          :default-active="dictActiveId"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <ChildMenu
            :dataList="this.treeDict"
            @getItemVal="getDictItem"
          ></ChildMenu>
        </el-menu>

        <el-menu
          class="menu-Bar"
          :default-active="fileActiveId"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <ChildMenu
            :dataList="this.treeFile"
            @getItemVal="getFileItem"
          ></ChildMenu>
        </el-menu>
      </template>
    </div>
  </div>
</template>

<script>
import Bus from '../Bus/index.js'
import { GetMenuList, GetDictList, GetFileList } from '../../../api/index.js'
import ChildMenu from './ChildMenu'
export default {
  components: {
    ChildMenu,
  },
  data() {
    return {
      treeList: [],
      list: [{ nodeCode: 0 }],
      //   listIcon: 'el-icon-menu',
      //   listIconC: 'el-icon-full-screen',
      treeDict: [],
      dict: [{ nodeCode: 0 }],
      //   dictIcon: 'el-icon-collection',
      //   dictIconC: 'el-icon-reading',
      treeFile: [],
      file: [{ nodeCode: 0 }],
      //   fileIcon: 'el-icon-folder-opened',
      //   fileIconC: 'el-icon-folder',
      test: {},
      navActiveId: '1',
      dictActiveId: '1',
      fileActiveId: '1',
      value: '1',
      options: [
        {
          value: '1',
          label: '属性配置',
        },
        {
          value: '2',
          label: '字典页',
        },
      ],
    }
  },
  created() {
    this.getTreeList(this.list)
    this.GetDictListData(this.dict)
    this.getFileTreeList(this.file)
  },
  mounted() {
    Bus.$on('upNav', (data) => {
      if (data) {
        this.treeList = []
        this.list = [{ nodeCode: 0 }]
        this.getTreeList(this.list)
        this.navActiveId = data
      }
    })

    Bus.$on('upDict', (data) => {
      if (data) {
        this.treeDict = []
        this.dict = [{ nodeCode: 0 }]
        this.GetDictListData(this.dict)
        this.dictActiveId = data
      }
    })

    Bus.$on('upFile', (data) => {
      if (data) {
        this.treeFile = []
        this.file = [{ nodeCode: 0 }]
        this.getFileTreeList(this.file)
        this.fileActiveId = data
      }
    })
  },
  watch: {},
  methods: {
    changeSel(e) {
      console.log(e)
      localStorage.setItem('changeVal', e)
    },
    // 获取目录item
    getFileItem(item) {
      this.$router.push({
        path: '/FileDetail',
        query: item,
      })
    },
    // 获取字典item
    getDictItem(item) {
      this.$router.push({
        path: '/DictDetail',
        query: item,
      })
    },
    // 获取菜单item
    getMenuItem(item) {
      this.$router.push({
        path: '/NavDetail',
        query: item,
      })
    },
    // 获取tree id
    handleOpen(key, keyPath) {},

    // 获取字典列表
    GetDictListData(node) {
      node.forEach((item) => {
        GetDictList({ parentCode: item.dictCode || 0 }).then((res) => {
          if (res.length) {
            item.child = item.child || []
            item.child = [...item.child, ...res]
            this.GetDictListData(res)
          }
        })
      })
      this.treeDict = this.dict[0].child
      let getChangeVal = localStorage.getItem('changeVal')
      if (getChangeVal) {
        this.value = getChangeVal
      }
    },

    // 获取菜单列
    getTreeList(node) {
      node.forEach((item) => {
        GetMenuList({ parentCode: item.nodeCode || 0 }).then((res) => {
          if (res.length) {
            item.child = item.child || []
            item.child = [...item.child, ...res]
            this.getTreeList(res)
          }
        })
      })
      this.treeList = this.list[0].child
      // Bus.$emit("nodeCode", this.treeList[0]);
      let getChangeVal = localStorage.getItem('changeVal')
      if (getChangeVal) {
        this.value = getChangeVal
      }
    },

    // 获取目录列表
    getFileTreeList(node) {
      node.forEach((item) => {
        GetFileList({ parentCode: item.directoryCode || 0 }).then((res) => {
          if (res.length) {
            item.child = item.child || []
            item.child = [...item.child, ...res]
            this.getFileTreeList(res)
          }
        })
      })
      this.treeFile = this.file[0].child
      console.log(this.treeFile)
      localStorage.setItem('fileList', JSON.stringify(this.treeFile))
    },
  },
}
</script>
<style lang="less">
.menu-tit {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
