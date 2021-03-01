<template>
  <div>
    <div class="card-box">
      <el-button type="blue" @click="createGroupModel = true">创建组</el-button>
    </div>
    <div class="card-box" v-for="(item, index) in groupList" :key="index">
      <div class="group-tit">
        {{ item.defaultDisplay }}
        <el-button type="blue" @click="showGroupModel(item.groupCode)"
          >添加字段</el-button
        >
        <el-button type="redx" @click="delGroup(item.groupCode)"
          >删除组</el-button
        >
      </div>
      <div class="group-box">
        <div class="col" v-for="(item2, index2) in item.list" :key="index2">
          <div class="title">第 {{ index2 + 1 }}列</div>
          <draggable
            v-model="item.list[index2]"
            :group="item.defaultDisplay"
            animation="300"
            dragClass="dragClass"
            ghostClass="ghostClass"
            chosenClass="chosenClass"
            @start="onStart"
            @end="onEnd(item, item2)"
            class="colHeight"
          >
            <transition-group>
              <div class="item" v-for="item3 in item2" :key="item3.id">
                {{ item3.interiorName }} <i class="el-icon-circle-close"></i>
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <el-dialog
      title="创建组"
      :visible.sync="createGroupModel"
      width="700px"
      :before-close="createGroupClose"
    >
      <div class="dlg-xian"></div>
      <el-form ref="form" :model="groupParams" label-width="80px">
        <el-form-item label="组名称">
          <el-input v-model="groupParams.defaultDisplay"></el-input>
        </el-form-item>
        <el-form-item label="组列数">
          <el-input v-model="groupParams.maxRows"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="bluex" @click="createGroupModel = false"
          >取 消</el-button
        >
        <el-button type="blue" @click="saveCreateGroup">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择字段"
      :visible.sync="addFieldGroupModel"
      width="700px"
      :before-close="addFieldGroupClose"
    >
      <div class="dlg-xian"></div>
      <el-radio-group v-model="interiorName">
        <el-radio-button
          v-for="(item, index) in fieldList"
          :key="index"
          :label="item.interiorName"
          >{{ item.defaultDisplay }}</el-radio-button
        >
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="bluex" @click="addFieldGroupModel = false"
          >取 消</el-button
        >
        <el-button type="blue" @click="saveAddFieldGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//导入draggable组件
import draggable from 'vuedraggable'
import {
  createGroup,
  getGroupList,
  GetCode,
  addFieldToGroup,
  getGroupInfo,
  removeGroup,
} from '../../../api/index.js'
export default {
  //注册draggable组件
  components: {
    draggable,
  },
  data() {
    return {
      createGroupModel: false,
      addFieldGroupModel: false,
      groupParams: {
        defaultDisplay: '',
        groupCode: '',
        layoutCss: '',
        nodeCode: '',
        maxRows: '',
      },
      nodeCode: '',
      options: [],
      value: '',
      groupList: [],
      fieldList: [],
      interiorName: '',
      groupCode: '',
    }
  },
  created() {
    const getLinkInfo = this.$route.query
    console.log(getLinkInfo)
    this.groupParams.nodeCode = getLinkInfo.nodeCode
    this.nodeCode = getLinkInfo.nodeCode
    this.getGroupListFun()
    this.getCodeFun()
  },
  methods: {
    //开始拖拽事件
    onStart() {
      console.log('拖拽')
    },
    //拖拽结束事件
    onEnd(a, b) {
      console.log(a, b)
      console.log('拖拽结束')
    },
    //   删除组
    delGroup(groupCode) {
      this.$confirm('确定删除这个组吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          removeGroup({ groupCode }).then((res) => {
            if (res.result) {
              this.$message({
                message: res.message,
                type: 'success',
              })
              this.addFieldGroupModel = false
              this.getGroupListFun()
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
    //   添加字段弹框
    showGroupModel(code) {
      this.addFieldGroupModel = true
      console.log(code)
      this.groupCode = code
    },
    //   组添加字段
    saveAddFieldGroup() {
      const params = {
        interiorName: this.interiorName,
        groupCode: this.groupCode,
        nodeCode: this.nodeCode,
      }
      console.log(params)
      addFieldToGroup(params).then((res) => {
        if (res.result) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.addFieldGroupModel = false
          this.getGroupListFun()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取组列表
    getGroupListFun() {
      getGroupList({ nodeCode: this.nodeCode }).then((res) => {
        console.log(res)

        res.forEach((item) => {
          console.log(item.maxRows)
          item.list = []
          for (let i = 0; i < item.maxRows; i++) {
            item.list.push([])
          }
          getGroupInfo({ groupCode: item.groupCode }).then((resp) => {
            // console.log(resp)
            item.list[0] = resp.extcols
          })
        })
        // console.log(res)
        setTimeout(() => {
          this.groupList = res
          console.log(this.groupList)
        }, 500)
        // this.$forceUpdate()
      })
    },

    // 获取字段列表
    getCodeFun() {
      GetCode({ nodeCode: this.nodeCode }).then((res) => {
        // console.log(res)
        this.fieldList = res
      })
    },
    //   关闭创建组弹窗
    createGroupClose() {
      this.createGroupModel = false
    },
    addFieldGroupClose() {
      this.addFieldGroupModel = false
    },
    // 创建组
    saveCreateGroup() {
      console.log(this.groupParams)
      createGroup(this.groupParams).then((res) => {
        console.log(res)
        if (res.result) {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.createGroupModel = false
          this.getGroupListFun()
        } else {
          this.$message.error(res.message)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.group-box {
  .add-tit {
    width: 100%;
    line-height: 32px;
  }
  .el-select {
    width: 100%;
  }
  .goto-icon {
    margin-top: 32px;
    line-height: 32px;
    font-size: 24px;
    text-align: center;
  }
}
.card-box {
  .group-tit {
    line-height: 32px;
    font-size: 18px;
    .el-button {
      margin-left: 10px;
    }
  }
  .group-box {
    padding: 20px 0;
    box-sizing: border-box;
  }
}

/*定义要拖拽元素的样式*/
.ghostClass {
  background-color: #0984e3 !important;
}
.chosenClass {
  background-color: #81ecec !important;
  opacity: 1 !important;
}
.dragClass {
  background-color: #00cec9 !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}
.itxst {
  margin: 10px;
}
.title {
  padding: 6px 12px;
}
.col {
  width: 19%;
  //   flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  box-sizing: border-box;
  float: left;
  margin-right: 1%;
}
.col + .col {
  //   margin-left: 10px;
}

.item {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
  i {
    float: right;
  }
}
.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}
.item + .item {
  border-top: none;
  margin-top: 6px;
}
.colHeight {
  /* height: 50px; */
  span {
    display: block;
    min-height: 100px;
  }
}
</style>
