<template>
  <div>
    <div class="card-box">
      <el-button size="small" type="primary" round @click="addFileModel = true"
        >增加子目录</el-button
      >
      <el-button size="small" type="danger" round @click="deleFile"
        >删除目录</el-button
      >
      <!-- <el-button size="small" type="primary" round @click="addDictModel = true">
        增加字典</el-button
      > -->
      <el-button
        size="small"
        type="primary"
        round
        @click="moveFileModel = true"
      >
        移动目录</el-button
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
import Bus from '../Bus'
import {
  AddChildFile,
  DelChildFile,
  UpdateFile,
  MoveFile,
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
      moveToCode: null,
    }
  },
  watch: {
    $route: function(route) {
      var query = route.query
      console.log(query)
      this.domInfo = query
      this.form = query
    },
  },
  created() {
    var query = this.$route.query
    console.log(query)
    this.domInfo = query
    this.form = query

    setTimeout(() => {
      let getFileList = JSON.parse(localStorage.getItem('fileList'))
      this.options = getFileList
    }, 2000)
  },
  methods: {
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
</style>
