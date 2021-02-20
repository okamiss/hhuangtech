<template>
  <div>
    <div class="card-box">
      <el-button size="small" type="primary" round @click="addFileModel = true"
        >增加子目录</el-button
      >
      <el-button size="small" type="danger" round @click="deleFile"
        >删除目录</el-button
      >

      <el-button
        size="small"
        type="primary"
        round
        @click="moveFileModel = true"
      >
        移动目录</el-button
      >
      <el-button size="small" type="primary" round @click="addDictModel = true">
        增加字典</el-button
      >
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
          <el-button size="small" type="primary" @click="updateFile"
            >更新</el-button
          >
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
        <el-button @click="addFileModel = false">取 消</el-button>
        <el-button type="primary" @click="addFileParamsSave">确 定</el-button>
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
    <el-dialog
      title="增加字典"
      :visible.sync="addDictModel"
      width="80%"
      :before-close="dictChildClose"
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
