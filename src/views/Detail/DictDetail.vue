<template>
  <div>
    <div class="card-box">
      <el-button size="small" type="primary" round @click="addChild = true"
        >创建字典</el-button
      >
      <el-button size="small" type="danger" round @click="DeleteDictPar"
        >删除字典</el-button
      >
      <el-button
        v-if="domInfo.parentCode === '0'"
        size="small"
        type="primary"
        round
        @click="addChildTermModel = true"
        >创建字典项</el-button
      >
      <el-button size="small" type="primary" round @click="moveFileModel = true"
        >移动到目录</el-button
      >
    </div>
    <div class="card-box" ref="firTogg">
      <el-row>
        <el-col :span="12">
          <el-table :data="tableData" style="width: 100%">
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
            <el-table-column
              prop="interiorName"
              label="内部名称"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="defaultDisplay"
              label="显示名称"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="dictVal"
              label="字典值"
              width="150"
            ></el-table-column>

            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)"
                  >创建字典项关联</el-button
                >
                <!-- <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)"
                  >删除字典项关联</el-button
                > -->
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table :data="tableDataUsed" style="width: 100%">
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
            <el-table-column
              prop="interiorName"
              label="内部名称"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="defaultDisplay"
              label="显示名称"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="dictVal"
              label="字典值"
              width="150"
            ></el-table-column>

            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <!-- <el-button size="mini" @click="handleEdit(scope.row)"
                  >创建字典项关联</el-button
                > -->
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)"
                  >删除字典项关联</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="增加字典"
      :visible.sync="addChild"
      width="80%"
      :before-close="addChildClose"
    >
      <div class="treeNames">{{ domInfo.treeNames }}</div>
      <el-form ref="form" :model="addDictInfo" label-width="80px">
        <el-form-item label="内部名称">
          <el-input v-model="addDictInfo.interiorName"></el-input>
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="addDictInfo.defaultDisplay"></el-input>
        </el-form-item>
      </el-form>
      <div class="batTit">
        批量增加字典项
        <i @click="addBatItem" class="el-icon-circle-plus-outline"></i>
      </div>
      <el-row class="batchAdd" v-for="(item, index) in batchArr" :key="index">
        <el-col :span="2" class="batName">内部名称：</el-col>
        <el-col :span="5"
          ><el-input v-model="item.interiorName"></el-input
        ></el-col>
        <el-col :span="2" class="batName">显示名称：</el-col>
        <el-col :span="5"
          ><el-input v-model="item.defaultDisplay"></el-input
        ></el-col>
        <!-- <el-col :span="2" class="batName">字典值：</el-col>
        <el-col :span="5"><el-input></el-input></el-col> -->
        <el-col :span="3" class="batCz"
          ><i @click="batchDel(index)" class="el-icon-remove-outline"></i
        ></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChild = false">取 消</el-button>
        <el-button type="primary" @click="addChildPar">确 定</el-button>
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
      title="请选择移动目标目录"
      :visible.sync="moveFileModel"
      width="40%"
      :before-close="moveFileModelClose"
    >
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
        <el-button @click="moveFileModel = false">取 消</el-button>
        <el-button type="primary" @click="moveFileSave">确 定</el-button>
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
  GetDictList,
  CreateDictTermRel,
  DeleteDictTermRel,
  MoveDict,
} from '../../../api/index.js'
export default {
  data() {
    return {
      moveFileModel: false,
      form: {},
      addChild: false,
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
    }, 2000)
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
          if (res) {
            this.$message({
              type: 'success',
              message: '关联成功!',
            })
            this.GetDictQueryPar()
          } else {
            this.$message.error('关联失败!')
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
        if (res) {
          this.$message({
            type: 'success',
            message: '删除关联成功!',
          })
          this.GetDictQueryPar()
        } else {
          this.$message.error('删除失败!')
        }
      })
    },

    // 创建字典项
    CreateDictTermPar() {
      this.addTermParams.dictCode = this.domInfo.dictCode
      CreateDictTerm(this.addTermParams).then((res) => {
        if (res) {
          this.$message({
            type: 'success',
            message: '创建成功!',
          })
          this.addChildTermModel = false
          this.GetDictQueryPar()
        } else {
          this.$message.error('创建失败!')
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
          //   this.options = res
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
            if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              Bus.$emit('upDict', this.domInfo.parentCode)
            } else {
              this.$message.error('删除失败!')
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
        if (res) {
          this.$message({
            message: '添加成功！',
            type: 'success',
          })
          this.addChild = false
          Bus.$emit('upDict', this.domInfo.id)
        } else {
          this.$message.error('添加失败！')
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
  margin-top: 10px;
  .batName {
    text-align: right;
    line-height: 32px;
  }
  .batCz {
    // text-align: center;
    line-height: 32px;
    font-size: 20px;
    text-indent: 5px;
    i {
      cursor: pointer;
    }
  }
}
.batTit {
  font-size: 18px;
  margin-bottom: 10px;
  i {
    cursor: pointer;
  }
}
</style>
