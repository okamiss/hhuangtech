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
import { Icon } from 'element-ui'
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
      treeFile: [],
      file: [{ nodeCode: 0 }],
      test: {},
      navActiveId: null,
      dictActiveId: null,
      fileActiveId: null,
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

    this.navActiveId = localStorage.getItem('navActiveId')
    this.dictActiveId = localStorage.getItem('dictActiveId')
    this.fileActiveId = localStorage.getItem('fileActiveId')
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
      localStorage.setItem('changeVal', e)
    },
    // 获取目录item
    getFileItem(item) {
      this.$router.push({
        path: '/FileDetail',
        query: item,
      })

      localStorage.setItem('fileActiveId', item.id)
      localStorage.setItem('dictActiveId', null)
      localStorage.setItem('navActiveId', null)
    },
    // 获取字典item
    getDictItem(item) {
      this.$router.push({
        path: '/DictDetail',
        query: item,
      })

      localStorage.setItem('dictActiveId', item.id)
      localStorage.setItem('navActiveId', null)
      localStorage.setItem('fileActiveId', null)
    },
    // 获取菜单item
    getMenuItem(item) {
      this.$router.push({
        path: '/NavDetail',
        query: item,
      })

      localStorage.setItem('navActiveId', item.id)
      localStorage.setItem('dictActiveId', null)
      localStorage.setItem('fileActiveId', null)
    },
    // 获取tree id
    handleOpen(key, keyPath) {},

    // 获取字典列表
    GetDictListData(node) {
      node.forEach((item) => {
        GetDictList({ parentCode: item.dictCode || 0 }).then((res) => {
          if (res.length) {
            item.icon = 'el-icon-collection'
            item.child = item.child || []
            item.child = [...item.child, ...res]
            this.GetDictListData(res)
          } else {
            item.icon = 'el-icon-reading'
          }
        })
      })
      this.treeDict = this.dict[0].child
      let getChangeVal = localStorage.getItem('changeVal')
      if (getChangeVal) {
        this.value = getChangeVal
      }
      localStorage.setItem('dictList', JSON.stringify(this.treeDict))
    },

    // 获取菜单列
    getTreeList(node) {
      node.forEach((item) => {
        GetMenuList({ parentCode: item.nodeCode || 0 }).then((res) => {
          if (res.length) {
            item.icon = 'el-icon-menu'
            item.child = item.child || []
            item.child = [...item.child, ...res]
            this.getTreeList(res)
          } else {
            item.icon = 'el-icon-full-screen'
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
            item.icon = 'el-icon-folder-opened'
            item.child = item.child || []
            item.child = [...item.child, ...res]
            this.getFileTreeList(res)
          } else {
            item.icon = 'el-icon-folder'
          }
        })
      })
      this.treeFile = this.file[0].child
      let getChangeVal = localStorage.getItem('changeVal')
      if (getChangeVal) {
        this.value = getChangeVal
      }
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
