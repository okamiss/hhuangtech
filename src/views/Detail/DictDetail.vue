<template>
  <div class="dict-box">
    <!-- <div class="dict-box-item"></div>
    <div class="dict-box-item"></div> -->
    <div class="card-box">
      <el-button type="blue" @click="addChild = true">创建字典</el-button>
      <el-button
        v-if="domInfo.parentCode === '0'"
        type="blue"
        @click="addChildTermModel = true"
        >创建字典项</el-button
      >
      <el-button type="blue" @click="moveFileModel = true">移动目录</el-button>
      <el-button type="redx" @click="DeleteDictPar">删除字典</el-button>
    </div>

    <div class="dict-box-dn">
      <div class="dict-box-item">
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          class="setTabCss"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="isNewRecord">
                  <span>{{ props.row.isNewRecord }}</span>
                </el-form-item>
                <el-form-item label="updateDate">
                  <span>{{ props.row.updateDate }}</span>
                </el-form-item>
                <el-form-item label="createDate">
                  <span>{{ props.row.createDate }}</span>
                </el-form-item>
                <el-form-item label="createBy">
                  <span>{{ props.row.createBy }}</span>
                </el-form-item>
                <el-form-item label="updateBy">
                  <span>{{ props.row.updateBy }}</span>
                </el-form-item>
                <el-form-item label="status">
                  <span>{{ props.row.status }}</span>
                </el-form-item>

                <el-form-item label="dictVal">
                  <span>{{ props.row.dictVal }}</span>
                </el-form-item>
                <el-form-item label="defaultDisplay">
                  <span>{{ props.row.defaultDisplay }}</span>
                </el-form-item>
                <el-form-item label="interiorName">
                  <span>{{ props.row.interiorName }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <!-- <el-table-column
            prop="interiorName"
            label="内部名称"
          ></el-table-column> -->
          <el-table-column prop="defaultDisplay">
            <template slot="header" slot-scope="scope">
              <div class="diy-tab-head">
                <div class="diy-tab-name">显示名称</div>
                <div class="diy-tab-inp">
                  <el-input
                    placeholder="搜索显示名称"
                    v-model="defVal"
                    class="input-with-select"
                  >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="control">
                <i class="el-icon-edit-outline"></i>
                <i
                  class="el-icon-collection"
                  @click="handleEdit(scope.row)"
                ></i>
              </div>
              <!-- <el-button type="blue">编辑</el-button> -->
              <!-- <el-button type="blue">创建字典项关联</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="dict-box-item">
        <el-table
          class="setTabCss"
          :data="tableDataUsed"
          style="width: 100%"
          border
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="isNewRecord">
                  <span>{{ props.row.isNewRecord }}</span>
                </el-form-item>
                <el-form-item label="updateDate">
                  <span>{{ props.row.updateDate }}</span>
                </el-form-item>
                <el-form-item label="createDate">
                  <span>{{ props.row.createDate }}</span>
                </el-form-item>
                <el-form-item label="createBy">
                  <span>{{ props.row.createBy }}</span>
                </el-form-item>
                <el-form-item label="updateBy">
                  <span>{{ props.row.updateBy }}</span>
                </el-form-item>
                <el-form-item label="status">
                  <span>{{ props.row.status }}</span>
                </el-form-item>

                <el-form-item label="dictVal">
                  <span>{{ props.row.dictVal }}</span>
                </el-form-item>
                <el-form-item label="defaultDisplay">
                  <span>{{ props.row.defaultDisplay }}</span>
                </el-form-item>
                <el-form-item label="interiorName">
                  <span>{{ props.row.interiorName }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column prop="interiorName">
            <template slot="header" slot-scope="scope">
              <div class="diy-tab-head">
                <div class="diy-tab-name">显示名称</div>
                <div class="diy-tab-inp">
                  <el-input
                    placeholder="搜索显示名称"
                    v-model="defVal"
                    class="input-with-select"
                  >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="control">
                <i class="el-icon-edit-outline"></i>
                <i
                  class="el-icon-delete red"
                  @click="handleDelete(scope.row)"
                ></i>
              </div>

              <!-- <el-button type="blue">编辑</el-button>
              <el-button type="redx">删除字典项关联</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="创建字典"
      :visible.sync="addChild"
      width="700px"
      :before-close="addChildClose"
    >
      <!-- <div class="dlg-xian"></div> -->
      <!-- <div class="treeNames">当前位置：{{ domInfo.treeNames }}</div> -->

      <el-form
        ref="form"
        :model="addDictInfo"
        label-width="70px"
        label-position="left"
      >
        <el-row :gutter="24">
          <el-col :span="12" class="set-name"
            ><el-form-item label="内部名称">
              <el-input
                v-model="addDictInfo.interiorName"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12" class="set-name">
            <el-form-item label="显示名称">
              <el-input
                v-model="addDictInfo.defaultDisplay"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
      <div class="batTit">
        批量增加字典项
        <i @click="addBatItem" class="el-icon-circle-plus-outline"></i>
      </div>
      <div class="batchAdd" v-for="(item, index) in batchArr" :key="index">
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="add-name-style">
              <div class="batName">内部名称：</div>
              <el-input v-model="item.interiorName"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="add-name-style">
              <div class="batName">显示名称：</div>
              <el-input v-model="item.defaultDisplay"></el-input>

              <div class="batCz">
                <img src="@/assets/img/inter_icon2.png" alt="" />
                <i @click="batchDel(index)" class="el-icon-remove-outline"></i>
              </div>
            </div> </el-col
        ></el-row>

        <!-- <div :span="3" class="batCz">
         
        </div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="bluex" @click="addChild = false">取 消</el-button>
        <el-button type="blue" @click="addChildPar">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="增加字典项"
      :visible.sync="addChildTermModel"
      width="40%"
      :before-close="addTermParamsClose"
    >
      <div class="treeNames">{{ domInfo.treeNames }}</div>
      <el-form ref="form" :model="addTermParams" label-width="80px">
        <el-form-item label="内部名称">
          <el-input v-model="addTermParams.interiorName"></el-input>
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="addTermParams.defaultDisplay"></el-input>
        </el-form-item>
        <el-form-item label="字典值">
          <el-input v-model="addTermParams.dictVal"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildTermModel = false">取 消</el-button>
        <el-button type="primary" @click="CreateDictTermPar">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="移动目录"
      :visible.sync="moveFileModel"
      width="40%"
      :before-close="moveFileModelClose"
    >
      <div class="dlg-xian"></div>
      <div class="treeNames">当前目录：{{ domInfo.treeNames }}</div>
      <el-cascader
        :options="options"
        @change="handleChange"
        :props="{
          checkStrictly: true,
          value: 'directoryCode',
          label: 'defaultDisplay',
          expandTrigger: 'hover',
          children: 'child',
        }"
        clearable
      ></el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button type="bluex" @click="moveFileModel = false">取 消</el-button>
        <el-button type="blue" @click="moveFileSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bus from '../Bus/index.js'
import {
  CreateDict,
  DeleteDict,
  GetDictQuery,
  CreateDictTerm,
  CreateDictTermRel,
  DeleteDictTermRel,
  MoveDict,
} from '../../../api/index.js'
export default {
  data() {
    return {
      defVal: '',
      //   img: require('@/assets/img/carewash'),
      //   img: require('@/assets/img/carewash/'),
      moveFileModel: false,
      form: {},
      addChild: true,
      addDictInfo: {
        interiorName: null,
        defaultDisplay: null,
      },
      addChildTermModel: false,
      addTermParams: {
        defaultDisplay: '',
        dictVal: '',
        interiorName: '',
      },
      domInfo: {
        treeNames: null,
      },
      tableData: [],
      tableDataUsed: [],
      relParValue: null,
      options: [],
      dictItemCode: null,
      batchArr: [{ interiorName: '', defaultDisplay: '' }],
      moveToCode: null,
    }
  },
  computed: {},
  watch: {
    $route: function(route) {
      var query = route.query
      this.tableData = []
      this.domInfo = query
      this.GetDictQueryPar()
    },
  },
  created() {
    var query = this.$route.query
    this.tableData = []
    this.domInfo = query
    this.GetDictQueryPar()

    setTimeout(() => {
      let getFileList = JSON.parse(localStorage.getItem('fileList'))
      this.options = getFileList
    }, 1000)
  },
  mounted() {},
  methods: {
    //   选择目录change
    handleChange(e) {
      this.moveToCode = e.slice(-1).join('')
    },
    // 关闭移动目录窗口
    moveFileModelClose() {
      this.moveFileModel = false
    },
    // 移动字典到目标
    moveFileSave() {
      //   return
      MoveDict({
        dictCode: this.domInfo.dictCode,
        destDirectoryCode: this.moveToCode,
      }).then((res) => {
        if (res) {
          this.$message({
            type: 'success',
            message: '移动成功!',
          })
          this.moveFileModel = false
          Bus.$emit('upDict', this.domInfo.id)
          Bus.$emit('upFile', this.domInfo.id)
        } else {
          this.$message.error('移动失败！')
        }
      })
    },
    // 批量删除字典项
    batchDel(index) {
      this.batchArr.splice(index, 1)
    },

    //   批量增加字典项
    addBatItem() {
      this.batchArr.push({
        defaultDisplay: '',
        interiorName: '',
        // dictCode: this.domInfo.dictCode,
      })
    },

    // 创建字典项关联
    handleEdit(row) {
      //   this.relModel = true
      this.dictItemCode = row.dictItemCode

      CreateDictTermRel({
        dictCode: this.domInfo.dictCode,
        dictItemCode: row.dictItemCode,
        parentDictCode: this.domInfo.parentCode,
      })
        .then((res) => {
          if (res.result) {
            this.$message({
              type: 'success',
              message: res.message,
            })
            this.GetDictQueryPar()
          } else {
            this.$message.error(res.message)
          }
        })
        .catch((err) => {
          this.$message.error('服务器错误!')
        })
    },
    // 删除字典项关联
    handleDelete(row) {
      DeleteDictTermRel({
        dictCode: this.domInfo.dictCode,
        dictItemCode: row.dictItemCode,
      }).then((res) => {
        if (res.result) {
          this.$message({
            type: 'success',
            message: res.message,
          })
          this.GetDictQueryPar()
        } else {
          this.$message.error(res.message)
        }
      })
    },

    // 创建字典项
    CreateDictTermPar() {
      this.addTermParams.dictCode = this.domInfo.dictCode
      CreateDictTerm(this.addTermParams).then((res) => {
        if (res.result) {
          this.$message({
            type: 'success',
            message: res.message,
          })
          this.addChildTermModel = false
          this.GetDictQueryPar()
        } else {
          this.$message.error(res.message)
        }
      })
    },

    // 查询字典项
    GetDictQueryPar() {
      GetDictQuery({
        dictCode:
          this.domInfo.parentCode === '0'
            ? this.domInfo.dictCode
            : this.domInfo.parentCode,
        currDictCode: this.domInfo.dictCode,
      }).then((res) => {
        if (this.domInfo.parentCode === '0') {
          this.tableData = res.used
          this.tableDataUsed = res.unuse
        } else {
          this.tableData = res.unuse
          this.tableDataUsed = res.used
        }
      })
    },

    // 删除字典
    DeleteDictPar() {
      this.$confirm('确定要删除这个节点吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          DeleteDict({ dictCode: this.domInfo.dictCode }).then((res) => {
            if (res.result) {
              this.$message({
                type: 'success',
                message: res.message,
              })
              Bus.$emit('upDict', this.domInfo.parentCode)
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 增加子字典
    addChildPar() {
      //   return
      this.addDictInfo.items = this.batchArr
      this.addDictInfo.parentCode = this.domInfo.dictCode

      CreateDict(this.addDictInfo).then((res) => {
        if (res.result) {
          this.$message({
            type: 'success',
            message: res.message,
          })
          this.addChild = false
          Bus.$emit('upDict', this.domInfo.id)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 关闭新增字典弹框
    addChildClose() {
      this.addChild = false
    },
    // 关闭字典项弹窗
    addTermParamsClose() {
      this.addChildTermModel = false
    },
  },
}
</script>

<style lang="less" scoped>
.batchAdd {
  width: 100%;
  margin-top: 10px;
  height: 28px;
  .batName {
    // text-align: left;
    line-height: 28px;
  }
  .el-input {
    // width: 236px;
    flex: 1;
    // margin-right: 23px;
  }
  .batCz {
    // text-align: center;
    height: 28px;
    display: flex;
    align-items: center;
    font-size: 20px;
    i {
      cursor: pointer;
      margin-left: 9px;
    }
    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin-left: 9px;
    }
  }
}
.batTit {
  font-size: 16px;
  margin-bottom: 10px;
  i {
    cursor: pointer;
  }
}

.dict-box {
  width: 100%;
  height: 100%;
  //   background: #fff;
  .dict-box-dn {
    margin-top: 24px;
    height: calc(100% - 104px);
    .dict-box-item {
      width: calc(50% - 12px);
      overflow: hidden;
      float: left;
      background: #fff;
      border-radius: 6px;
      height: 100%;
    }
    .dict-box-item:last-child {
      float: right;
    }
  }
}

.control {
  font-size: 16px;
  i {
    color: #1a1a1a;
    margin-right: 12px;
    cursor: pointer;
  }
}

.diy-tab-head {
  display: flex;
  align-items: center;
  .diy-tab-name {
    width: 60px;
  }
  .diy-tab-inp {
    flex: 1;
    .input-with-select {
      float: right;
      width: 154px;
      height: 20px;
      margin-right: 49px;
      border-radius: 50px;
      overflow: hidden;
      //   border: 1px solid #707070;
      box-sizing: border-box;
      /deep/ .el-input__inner {
        border-radius: 50px 0 0 50px;
        width: 120px !important;
        height: 20px !important;
        padding: 0 12px !important;
      }
      /deep/ .el-input-group__append {
        border-radius: 0 50px 50px 0;
        width: 34px;
        background: #3377ff;
        padding: 0;
        .el-button {
          padding: 12px 27px;
          i {
            color: #fff;
          }
        }
      }
    }
  }
}

.setTabCss {
  /deep/ .el-form-item__label,
  /deep/ .el-form-item__content {
    line-height: 30px;
    font-size: 14px !important;
  }
  /deep/ .el-form-item {
    margin-bottom: 0 !important;
  }
  /deep/ .el-table__expanded-cell[class*='cell'] {
    padding: 10px 50px;
  }

  /deep/ .el-form-item {
    width: 50%;
  }
}

.set-name {
  /deep/ .el-form-item__label {
    font-size: 14px !important;
  }
}

.add-name-style {
  display: flex;
}

.red {
  color: #f00 !important;
}
</style>
