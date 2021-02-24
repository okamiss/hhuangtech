<template>
  <div class="linkage">
    <div class="lk-tit">选择联动关系</div>
    <div class="lk-all-tab">
      <div class="lk-all-tab-fx">
        <el-table
          :data="tabTestData"
          style="width: 100%"
          border
          :row-style="{ height: 61 + 'px', 'font-size': 14 + 'px' }"
          :header-cell-style="{ display: 'none' }"
        >
          <el-table-column align="center" prop="value" label="一级标题">
          </el-table-column>
          <el-table-column align="center" prop="name" label="二级标题">
          </el-table-column>
          <el-table-column align="center" prop="value" label="三级标题">
          </el-table-column>
          <el-table-column align="center" label="操作">
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

    <div class="lk-sel">
      <el-select v-model="value" placeholder="新建联动">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- <el-button @click="dialogVisible = true">查看已联动的字段</el-button> -->
    </div>

    <div class="lk-tab">
      <div class="lk-tab-item">
        <el-table
          ref="multipleTable"
          :data="tabTestData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :header-cell-style="tableHeaderStyle"
          :row-style="{ height: 60 + 'px', 'font-size': 14 + 'px' }"
        >
          <el-table-column type="selection" width="55"> </el-table-column>

          <el-table-column label="一级标题">
            <template slot-scope="scope">
              <el-popover
                trigger="click"
                placement="right-start"
                :ref="`popover-${scope.row.value}`"
              >
                <div class="addNextModel">
                  <div class="child-tit">二级标题</div>
                  <div class="child-search">
                    <el-input
                      placeholder="请输入内容"
                      prefix-icon="el-icon-search"
                      v-model="defVal"
                    >
                    </el-input>
                  </div>
                  <div class="child-list">
                    <span class="child-list-act">杭州</span>
                    <span>杭州</span>
                    <span>杭州</span>
                    <span>杭州</span>
                    <span>杭州</span>
                    <span>杭州</span>
                    <span>杭州</span>
                    <span>上海</span>
                    <span>上海</span>
                    <span>上海</span>
                    <span>上海</span>
                    <span>上海</span>
                    <span>上海</span>
                    <span>上海</span>
                    <span>上海</span>
                  </div>
                  <div class="child-btn">
                    <el-button type="primary" @click="saveChildPar"
                      >确定</el-button
                    >
                  </div>
                </div>
                <div slot="reference" class="row-name">
                  {{ scope.row.name }}
                  <i class="el-icon-circle-plus-outline"></i>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="lk-tab-item"></div>
      <div class="lk-tab-item"></div>
    </div>
    <!-- <el-dialog
      title="已联动的字段"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      options: [
        {
          value: '1',
          label: '选项1',
        },
        {
          value: '2',
          label: '选项2',
        },
        {
          value: '3',
          label: '选项3',
        },
      ],
      value: '',
      tabTestData: [
        {
          name: '字典项字段111',
          value: '1',
        },
        {
          name: '字典项字段222',
          value: '2',
        },
        {
          name: '字典项字段333',
          value: '3',
        },
        {
          name: '字典项字段444',
          value: '4',
        },
        {
          name: '字典项字段555',
          value: '5',
        },
      ],
      multipleSelection: [],
      defVal: '',
    }
  },
  methods: {
    saveChildPar() {
      for (const key in this.$refs) {
        if (key.indexOf('popover-') !== -1) {
          this.$refs[key].doClose()
        }
      }
    },
    // handleClose() {
    //   this.dialogVisible = false
    // },
    //   编辑
    handleEdit(index, row) {
      console.log(index, row)
    },
    //   删除
    handleDelete(index, row) {
      console.log(index, row)
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
    //   选中的 值
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    },
  },
}
</script>

<style lang="less" scoped>
.linkage {
  width: 100%;
  height: 100%;
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
      width: 294px;
      float: left;
    }
  }
}

.lk-all-tab {
  position: relative;
  height: 164px;
  overflow: hidden;
  .lk-all-tab-fx {
    position: absolute;
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
.child-tit {
  font-size: 14px;
  color: #242a33;
  height: 30px;
  border-bottom: 1px solid #e8e8e8;
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
    // margin-left: -1px;
    // margin-top: -1px;
    color: rgba(0, 0, 0, 0.65);
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
.row-name {
  i {
    float: right;
    font-size: 16px;
    color: #3377ff;
    cursor: pointer;
  }
}
</style>
