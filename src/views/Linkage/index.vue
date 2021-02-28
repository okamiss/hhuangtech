<template>
  <div class="linkage">
    <div class="lk-tit">选择联动关系</div>
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
          <el-table-column prop="extcolName" label="一级标题" width="400">
          </el-table-column>

          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="handleEdit(scope.$index, scope.row)"
                type="blue"
                >编辑</el-button
              >
              <el-button
                @click="handleDelete(scope.$index, scope.row)"
                type="redx"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- <div class="lk-sel">
      <el-select v-model="value" placeholder="新建联动">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.defaultDisplay"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div> -->

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

          <el-table-column label="字典项1">
            <template slot-scope="scope">
              {{ scope.row.defaultDisplay }}
              <el-popover
                trigger="click"
                placement="right-start"
                :ref="`popover-${scope.row.id}`"
                class="rigIcon"
              >
                <div class="addNextModel">
                  <div class="child-tit">字段</div>
                  <div class="child-search">
                    <el-input
                      placeholder="请输入内容"
                      prefix-icon="el-icon-search"
                      v-model="defVal"
                    >
                    </el-input>
                  </div>
                  <div class="child-list">
                    <el-radio-group v-model="radio1">
                      <el-radio-button
                        v-for="(item, index) in fieldList"
                        :key="index"
                        :label="item.extcolCode"
                        >{{ item.defaultDisplay }}</el-radio-button
                      >
                    </el-radio-group>
                    <!-- <span class="child-list-act">杭州</span> -->
                    <!-- <span v-for="(item, index) in fieldList" :key="index">{{
                      item.defaultDisplay
                    }}</span> -->
                  </div>
                  <div class="child-btn">
                    <el-button type="primary" @click="saveChildPar"
                      >确定</el-button
                    >
                  </div>
                </div>

                <div slot="reference">
                  <i
                    v-if="scope.row.checked"
                    class="el-icon-circle-plus-outline"
                  ></i>
                </div>
              </el-popover>
            </template>
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
      secdictCode: '',
      tabList: [],
    }
  },
  created() {
    const getLinkInfo = this.$route.query
    this.extcolCode = getLinkInfo.extcolCode
    this.nodeCode = getLinkInfo.nodeCode
    this.getKzList()
    this.getCodeList()
    this.relatedQuery()
  },
  methods: {
    //   确定联动关系
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
        dictCode: this.objectCode,
        dictItemCode: this.firLink.dictItemCode,
        extcolCode: this.extcolCode,
        flag: 2,
        items: secList,
        nodeCode: this.nodeCode,
        relatedExtcolCode: this.radio1,
      }
      linkage(params).then((res) => {
        if (res.result === 'true') {
          this.$message({
            type: 'success',
            message: res.message,
          })
          this.relatedQuery()
        } else {
          this.$message.error(res.message)
        }
      })
    },

    // 查询关联关系
    relatedQuery() {
      getRelatedQuery({ extcolCode: this.extcolCode }).then((res) => {
        console.log(res)
        res.forEach((item) => {
          getRelatedInstance({ relatedCode: item.relatedCode }).then((ress) => {
            console.log(ress)
            ress.id = Math.round(Math.random() * 1000)
            if (ress.chains) {
              ress.chains.forEach((item) => {
                item.id = Math.round(Math.random() * 1000)
              })
            }

            this.tabList.push(ress)
          })
        })
      })
      //   console.log(this.tabList)
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
    //   关闭选择字段弹窗
    saveChildPar() {
      for (const key in this.$refs) {
        if (key.indexOf('popover-') !== -1) {
          this.$refs[key].doClose()
        }
      }

      getObjLink({ extcolCode: this.radio1 }).then((res) => {
        if (res) {
          this.secdictCode = res[0].objectCode
          getDictUsed({
            dictCode: res[0].objectCode,
          }).then((res) => {
            this.tabTestData2 = res
          })
        }

        if (res.result === false) {
          this.$message({
            message: '没有可关联的字典项',
            type: 'warning',
          })
          this.tabTestData2 = []
        }

        // this.objectCode = res.extColumnDictRelationPoList[0].objectCode
        // this.getDictUsedFun()
      })
    },

    // 查询已扩展的字段
    getCodeList() {
      GetCode({ nodeCode: this.nodeCode }).then((res) => {
        this.fieldList = res
      })
    },

    // 查询已使用的字典项
    getDictUsedFun() {
      getDictUsed({ dictCode: this.objectCode }).then((res) => {
        res.forEach((item) => {
          item.checked = false
        })
        this.tabTestData = res
      })
    },
    // 查询对象连接
    getKzList() {
      getObjLink({ extcolCode: this.extcolCode }).then((res) => {
        // console.log(res)
        if (res) {
          this.objectCode = res[0].objectCode
          this.getDictUsedFun()
        }
      })
    },
    // handleClose() {
    //   this.dialogVisible = false
    // },
    //   编辑
    handleEdit(index, row) {
      //   console.log(index, row)
    },
    //   删除
    handleDelete(index, row) {
      //   console.log(index, row)
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
</style>
