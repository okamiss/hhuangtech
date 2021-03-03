<template>
  <div class="linkage">
    <div class="lk-tit">
      增加联动关系
      <!-- <i
        class="el-icon-circle-plus-outline"
        @click="addLinkRel"
      ></i> -->
    </div>
    <div class="lk-select">
      <div class="lk-select-item" v-for="(item, index) in list" :key="index">
        <el-select
          v-model="item.value"
          placeholder="请选择"
          @change="linkChange(item.value, index)"
        >
          <el-option
            v-for="item2 in item.selList"
            :key="item2.extcolCode"
            :label="item2.defaultDisplay"
            :value="item2.extcolCode"
          >
          </el-option>
        </el-select>
        <!-- <i
          v-if="index !== 0"
          class="el-icon-remove-outline"
          @click="delLinkRel(index)"
        ></i> -->
      </div>

      <div class="lk-select-item">
        <el-button type="blue" @click="saveLinkRel">确定</el-button>
      </div>
    </div>
    <div class="lk-all-tab">
      <div class="lk-all-tab-fx">
        <el-table
          :data="tabList"
          style="width: 100%"
          border
          :row-style="{ height: 61 + 'px', 'font-size': 14 + 'px' }"
          :header-cell-style="{ display: 'none' }"
          row-key="id"
          :tree-props="{ children: 'chains', hasChildren: 'hasChildren' }"
        >
          <el-table-column width="400">
            <template slot-scope="scope">
              {{ scope.row.primary.defaultDisplay }}
              <el-button
                class="editBtn"
                @click="handleEdit(scope.$index, scope.row)"
                type="blue"
                >编辑</el-button
              >
            </template>
          </el-table-column>
          <el-table-column width="400">
            <template slot-scope="scope">
              {{ scope.row.secondary.defaultDisplay }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="lk-tab">
      <div class="lk-tab-item">
        <el-table
          height="450"
          ref="multipleTable"
          :data="tabTestData"
          tooltip-effect="dark"
          style="width: 100%"
          @cell-click="getFirClick"
          :cell-class-name="tableCellClassName"
          :header-cell-style="tableHeaderStyle"
          :row-style="{
            height: 60 + 'px',
            'line-height': 60 + 'px',
            'font-size': 14 + 'px',
          }"
        >
          <el-table-column width="55">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked"></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column label="字典项1" prop="defaultDisplay">
          </el-table-column>
        </el-table>
      </div>
      <div class="lk-tab-item">
        <el-table
          ref="multipleTable"
          height="450"
          :data="tabTestData2"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :header-cell-style="tableHeaderStyle"
          :row-style="{
            height: 60 + 'px',
            'line-height': 60 + 'px',
            'font-size': 14 + 'px',
          }"
        >
          <el-table-column type="selection" width="55"> </el-table-column>

          <el-table-column label="字典项2" prop="defaultDisplay">
          </el-table-column>
        </el-table>
      </div>
      <div class="lk-tab-item">
        <el-button type="blue" @click="confLink">确定联动</el-button>
      </div>
    </div>
    <!-- <el-dialog
      title="已联动的字段"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
    </el-dialog> -->
    <div class="clear"></div>
  </div>
</template>

<script>
import { parse } from 'qs'
import {
  getObjLink,
  getDictUsed,
  GetCode,
  linkage,
  getRelatedQuery,
  getRelatedInstance,
} from '../../../api/index.js'
export default {
  data() {
    return {
      radio1: '',
      dialogVisible: false,
      options: [],
      value: '',
      tabTestData: [],
      tabTestData2: [],
      defVal: '',
      extcolCode: '',
      objectCode: '',
      nodeCode: '',
      fieldList: [],
      firLink: [],
      secLink: [],
      firdictCode: '',
      secdictCode: '',
      tabList: [],
      list: [
        {
          value: null,
          selList: [],
        },
        {
          value: null,
          selList: [],
        },
      ],
      interiorName: '',
      firCode: '',
      secCode: '',
      relatedCode: '',
    }
  },
  created() {
    const getLinkInfo = this.$route.query
    this.extcolCode = getLinkInfo.extcolCode
    this.nodeCode = getLinkInfo.nodeCode
    this.interiorName = getLinkInfo.interiorName
    // this.getKzList()
    this.getCodeList()
    this.relatedQuery()

    // this.list[0].value = getLinkInfo.extcolCode
  },
  methods: {
    //   删除字段联动关系
    delLinkRel(index) {
      this.list.splice(index, 1)
    },
    //   增加字段联动关系
    addLinkRel() {
      this.list.push({
        value: null,
        selList: this.fieldList,
      })
    },
    // 确定字段联动关系
    saveLinkRel() {
      const params = {
        chainExtcolCode: this.list[1].value,
        oriChainExtcolCode: this.list[1].value,
        flag: 2,
        extcolCode: this.list[0].value,
        nodeCode: this.nodeCode,
      }
      console.log(params)
      linkage(params).then((res) => {
        console.log(res)
        if (res.result === 'true') {
          this.$message({
            type: 'success',
            message: res.message,
          })
          this.tabList = []
          this.relatedQuery()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    linkChange(a, b) {
      //   this.getKzList(a, b)
    },
    //   确定字典项联动关系
    confLink() {
      const secList = []

      this.secLink.forEach((item) => {
        secList.push({
          dictCode: this.secdictCode,
          dictItemCode: item.dictItemCode,
          flag: 2,
        })
      })

      const params = {
        dictCode: this.firdictCode,
        dictItemCode: this.firLink.dictItemCode,
        extcolCode: this.firCode,
        flag: 1,
        items: secList,
        nodeCode: this.nodeCode,
        oriChainExtcolCode: this.secCode,
        chainExtcolCode: this.secCode,
        relatedCode: this.relatedCode,
      }
      linkage(params).then((res) => {
        if (res.result === 'true') {
          this.$message({
            type: 'success',
            message: res.message,
          })
          this.tabList = []
          this.relatedQuery()
        } else {
          this.$message.error(res.message)
        }
      })
    },

    // 查询关联关系
    relatedQuery() {
      getRelatedQuery({
        nodeCode: this.nodeCode,
        interiorName: '',
      }).then((res) => {
        console.log(res)
        this.tabList = res
        // res.forEach((item) => {
        //   getRelatedInstance({ relatedCode: item.relatedCode }).then((ress) => {
        //     ress.id = Math.round(Math.random() * 1000)
        //     if (ress.chains) {
        //       ress.chains.forEach((item) => {
        //         item.id = Math.round(Math.random() * 1000)
        //       })
        //     }
        //     this.tabList.push(ress)
        //     console.log(this.tabList)
        //   })
        // })
      })
    },

    // 赋值表格索引
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      //注意这里是解构
      //利用单元格的 className 的回调方法，给行列索引赋值
      row.index = rowIndex
      column.index = columnIndex
    },

    //   点击获取列信息
    getFirClick(row) {
      this.tabTestData.forEach((item, index) => {
        if (row.index === index) {
          item.checked = true
        } else {
          item.checked = false
        }
      })
      this.firLink = row
    },

    // 查询已扩展的字段
    getCodeList() {
      GetCode({ nodeCode: this.nodeCode, colType: 'chain', status: '' }).then(
        (res) => {
          this.fieldList = res
          this.list[0].selList = res
          this.list[1].selList = res
        }
      )
    },

    // 查询已使用的字典项
    getDictUsedFun(b) {
      getDictUsed({ dictCode: this.objectCode }).then((res) => {
        res.forEach((item) => {
          item.checked = false
        })
        if (b === 0) {
          this.tabTestData = res
        } else {
          this.tabTestData2 = res
        }
      })
    },
    // 查询对象连接
    getKzList(a, b) {
      getObjLink({ extcolCode: a, nodeCode: this.nodeCode }).then((res) => {
        if (res) {
          console.log(res)
          this.objectCode = res[0].objectCode
          if (b === 0) {
            this.firdictCode = res[0].objectCode
          }
          if (b === 1) {
            this.secdictCode = res[0].objectCode
          }
          this.getDictUsedFun(b)
        }
      })
    },
    // handleClose() {
    //   this.dialogVisible = false
    // },
    //   编辑
    handleEdit(index, row) {
      console.log(row)
      this.getKzList(row.primary.extcolCode, 0)
      this.getKzList(row.secondary.extcolCode, 1)
      this.firCode = row.primary.extcolCode
      this.secCode = row.secondary.extcolCode
      this.relatedCode = row.relatedCode
    },

    // 设置表头样式

    tableHeaderStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return `
        background: #F7F7F7;
        color: #000;
        font-size: 18px;
        font-weight:500;
        height:60px;
        `
      }
    },

    //   选中的 值2
    handleSelectionChange(val) {
      this.secLink = val
    },
  },
}
</script>

<style lang="less" scoped>
.linkage {
  width: 100%;
  //   height: 100%;
  padding-bottom: 40px;
  background: #fff;
  border-radius: 6px;
  .lk-tit {
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #e8e8e8;
    font-size: 18px;
    font-weight: bold;
    text-indent: 24px;
    i {
      color: #3377ff;
      cursor: pointer;
    }
  }
  .lk-sel {
    padding: 39px 40px 0;
    box-sizing: border-box;
    .el-button {
      margin-left: 24px;
      color: #3377ff;
      border: 1px solid #3377ff;
    }
    .el-select {
      width: 294px;
      height: 40px;
      /deep/ .el-input {
        height: 100%;
      }
    }
  }
  .lk-tab {
    padding: 40px 40px 0;
    box-sizing: border-box;
    .lk-tab-item {
      width: 32.3333%;
      margin-right: 1%;
      float: left;
    }
  }
}

.lk-all-tab {
  //   position: relative;
  //   height: 164px;
  //   overflow: hidden;
  .lk-all-tab-fx {
    // position: absolute;
    padding: 40px 40px 0;
    box-sizing: border-box;
    width: 100%;
  }
}

.addNextModel {
  width: 411px;
  height: 358px;
  padding: 13px 22px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.child-search {
  width: 100%;
  height: 24px;
  margin-top: 12px;
  /deep/ span {
    margin-top: -7px;
  }
  .el-input {
    width: 100%;
    height: 100%;

    /deep/ .el-input__inner {
      background-color: #f2f2f2;
      color: #889dad;
    }
  }
}
.child-list {
  flex: 1;
  overflow-y: scroll;
  margin-top: 19px;
  span {
    display: block;
    width: 16.6666%;
    float: left;
    height: 32px;
    line-height: 32px;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.65);
  }

  span:visited {
    background: #000;
  }

  .child-list-act {
    border: 1px solid #3377ff;
    color: #3377ff;
  }
}
.child-btn {
  height: 32px;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  button {
    height: 100%;
    padding: 0 15px;
  }
}

.rigIcon {
  height: 100%;
  float: right;
  i {
    font-size: 16px;
    color: #3377ff;
    cursor: pointer;
  }
}

.lk-select {
  padding: 20px 24px;
  box-sizing: border-box;
  .lk-select-item {
    width: 19%;
    margin-right: 1%;
    float: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-select {
      flex: 1;
    }
    i {
      display: block;
      width: 32px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      cursor: pointer;
    }
  }
}
.editBtn {
  margin-left: 10px;
}
</style>
