<template>
  <div class="container-left">
    <div class="hh-logo">
      <router-link :to="{ path: '/' }">HHuangtech</router-link>
    </div>
    <div class="menu-search">
      <el-input placeholder="查找菜单" v-model="defVal">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <div class="menu-change">
      <div class="menu-change-item" @click="menuChangeVal('1')">
        <i class="el-icon-s-operation"></i>属性配置
      </div>
      <div class="menu-change-item" @click="menuChangeVal('2')">
        <i class="el-icon-collection"></i>字典页
      </div>
    </div>
    <div class="hh-nav">
      <!-- <div class="menu-tit">
        <el-select v-model="value" placeholder="请选择" @change="changeSel">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div> -->
      <template v-if="value === '1'">
        <el-menu
          class="menu-Bar"
          @open="handleOpen"
          :default-active="navActiveId"
          background-color="transparent"
          text-color="#fff"
          active-text-color="#fff"
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
          background-color="transparent"
          text-color="#fff"
          active-text-color="#fff"
        >
          <ChildMenu
            :dataList="this.treeDict"
            @getItemVal="getDictItem"
          ></ChildMenu>
        </el-menu>

        <el-menu
          class="menu-Bar"
          :default-active="fileActiveId"
          background-color="transparent"
          text-color="#fff"
          active-text-color="#fff"
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
      defVal: '',
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
    //   菜单字典选项
    menuChangeVal(e) {
      this.value = e
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
      console.log(item)
      const params = {
        dictCode: item.dictCode,
        id: item.id,
        parentCode: item.parentCode,
        treeNames: item.treeNames,
      }
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
.el-submenu__title:hover {
  background-color: transparent !important;
}

.el-menu-item:hover {
  background-color: #3377ff !important;
}
.el-menu-item.is-active {
  background-color: #3370ff !important;
  color: #fff;
  span {
    color: #fff !important;
  }
}
.el-menu-item,
.el-submenu__title {
  height: 48px !important;
  line-height: 48px !important;
}

.menu-search {
  margin-top: 16px;
  padding: 0 18px;
  box-sizing: border-box;
  height: 36px;

  .el-input {
    background: #28344c;
    border-radius: 50px;
    overflow: hidden;

    .el-input__inner {
      opacity: 1;
      background: none;
      border: none;
      color: #999999;
      font-size: 14px;
    }
    span {
      margin-top: -3px;
    }
  }
}
.menu-change {
  margin-top: 20px;
  margin-bottom: 18px;
  padding: 0 18px;
  box-sizing: border-box;
  height: 38px;
  .menu-change-item {
    width: 50%;
    float: left;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    i {
      width: 25px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      border-radius: 50px;
      background: #fff;
      color: #3377ff;
      margin-right: 12px;
    }
  }
  .menu-change-item:first-child {
    border-right: 1px solid #28344c;
    box-sizing: border-box;
  }
}
</style>
