<template>
  <div>
    <div class="card-box">
      <el-button type="blue" @click="addFileModel = true">增加子目录</el-button>
      <el-button type="blue" @click="moveFileModel = true">移动目录</el-button>
      <el-button type="blue" @click="addDictModel = true">增加字典</el-button>
      <el-button type="redx" @click="deleFile">删除目录</el-button>
    </div>

    <div class="card-box" ref="firTogg">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="9">
            <el-form-item label="内部名称">
              <el-input v-model="form.interiorName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="显示名称">
              <el-input v-model="form.defaultDisplay"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="blue" @click="updateFile">更新</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="增加子目录"
      :visible.sync="addFileModel"
      width="40%"
      :before-close="addFileModelClose"
    >
      <div class="dlg-xian"></div>
      <div class="treeNames">{{ domInfo.treeNames }}</div>
      <el-form ref="form" :model="addFileParams" label-width="80px">
        <el-form-item label="内部名称">
          <el-input v-model="addFileParams.interiorName"></el-input>
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="addFileParams.defaultDisplay"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="bluex" @click="addFileModel = false">取 消</el-button>
        <el-button type="blue" @click="addFileParamsSave">确 定</el-button>
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
    <el-dialog
      title="增加字典"
      :visible.sync="addDictModel"
      width="60%"
      :before-close="dictChildClose"
    >
      <!-- <div class="dlg-xian"></div>
      <div class="treeNames">{{ domInfo.treeNames }}</div> -->
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
                <img src="@/assets/img/inter_icon.png" alt="" />
                <i @click="batchDel(index)" class="el-icon-remove-outline"></i>
              </div>
            </div> </el-col
        ></el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDictModel = false">取 消</el-button>
        <el-button type="primary" @click="addDictChildPar">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bus from '../Bus'
import {
  AddChildFile,
  DelChildFile,
  UpdateFile,
  MoveFile,
  CreateDict,
} from '../../../api/index.js'
import { parse } from 'qs'
export default {
  data() {
    return {
      addFileModel: false,
      addDictModel: false,
      moveFileModel: false,
      domInfo: {},
      addFileParams: {},
      form: {},
      options: [],
      batchArr: [{ interiorName: '', defaultDisplay: '' }],
      moveToCode: null,
      addDictInfo: {
        interiorName: null,
        defaultDisplay: null,
      },
    }
  },
  watch: {
    $route: function(route) {
      var query = route.query
      this.domInfo = query
      this.form = query
    },
  },
  created() {
    var query = this.$route.query
    this.domInfo = query
    this.form = query

    setTimeout(() => {
      let getFileList = JSON.parse(localStorage.getItem('fileList'))
      this.options = getFileList
    }, 2000)
  },
  methods: {
    // 关闭新增字典弹框
    dictChildClose() {
      this.addDictModel = false
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
    // 增加子字典
    addDictChildPar() {
      this.addDictInfo.items = this.batchArr
      this.addDictInfo.directoryCode = this.domInfo.directoryCode
      //   console.log(this.addDictInfo)
      //   return
      CreateDict(this.addDictInfo).then((res) => {
        if (res) {
          this.$message({
            message: '添加成功！',
            type: 'success',
          })
          this.addDictModel = false
          Bus.$emit('upFile', this.domInfo.id)
        } else {
          this.$message.error('添加失败！')
        }
      })
    },
    //   选择目录change
    handleChange(e) {
      this.moveToCode = e.slice(-1).join('')
    },
    // 保存移动目标
    moveFileSave() {
      MoveFile({
        child: this.domInfo.directoryCode,
        dest: this.moveToCode,
      }).then((res) => {
        if (res) {
          this.$message({
            type: 'success',
            message: '移动成功!',
          })
          this.moveFileModel = false
          Bus.$emit('upFile', this.domInfo.id)
        } else {
          this.$message.error('移动失败！')
        }
      })
    },
    //   更新目录
    updateFile() {
      UpdateFile(this.form).then((res) => {
        if (res) {
          this.$message({
            type: 'success',
            message: '更新成功!',
          })
          Bus.$emit('upFile', this.domInfo.id)
        } else {
          this.$message.error('创建失败！')
        }
      })
    },
    //   删除目录
    deleFile() {
      this.$confirm('确定要删除这个目录吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          DelChildFile({ directoryCode: this.domInfo.directoryCode }).then(
            (res) => {
              if (res) {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                })
                Bus.$emit('upFile', this.domInfo.parentCode)
              } else {
                this.$message.error('删除失败!')
              }
            }
          )
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 关闭创建子目录弹窗
    addFileModelClose() {
      this.addFileModel = false
    },
    // 关闭移动目录窗口
    moveFileModelClose() {
      this.moveFileModel = false
    },
    // 添加子目录
    addFileParamsSave() {
      //   return
      this.addFileParams.parentCode = this.domInfo.directoryCode
      AddChildFile(this.addFileParams).then((res) => {
        if (res) {
          this.$message({
            type: 'success',
            message: '创建成功!',
          })
          this.addFileModel = false
          this.addFileParams = {
            defaultDisplay: '',
            parentCode: null,
          }
          Bus.$emit('upFile', this.domInfo.id)
        } else {
          this.$message.error('创建失败！')
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.card-box {
  //   i {
  //     font-size: 30px;
  //   }
}
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
  margin-top: 24px;
  i {
    cursor: pointer;
  }
}

.add-name-style {
  display: flex;
}

.set-name {
  height: 28px;
  line-height: 28px;
  /deep/ .el-form-item__label {
    font-size: 14px !important;
    line-height: 28px;
    height: 28px;
  }
  /deep/ .el-input__inner {
    height: 28px;
    line-height: 28px;
  }
  /deep/ .el-form-item__content {
    line-height: 28px;
  }
}
</style>
