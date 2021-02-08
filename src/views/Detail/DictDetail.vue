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
        size="small"
        type="primary"
        round
        @click="addChildTermModel = true"
        >创建字典项目</el-button
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
          <el-col :span="2" :offset="2"></el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog
      title="增加字典"
      :visible.sync="addChild"
      width="40%"
      :before-close="addChildClose"
    >
      <div class="treeNames">{{ addDictInfo.treeNames }}</div>
      <el-form ref="form" :model="addDictInfo" label-width="80px">
        <el-form-item label="内部名称">
          <el-input v-model="addDictInfo.interiorName"></el-input>
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="addDictInfo.defaultDisplay"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChild = false">取 消</el-button>
        <el-button type="primary" @click="addChildPar">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="增加字典项目"
      :visible.sync="addChildTermModel"
      width="40%"
      :before-close="addTermParamsClose"
    >
      <div class="treeNames">{{ addDictInfo.treeNames }}</div>
      <el-form ref="form" :model="addTermParams" label-width="80px">
        <el-form-item label="内部名称">
          <el-input v-model="addTermParams.interiorName"></el-input>
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="addTermParams.defaultDisplay"></el-input>
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="addTermParams.dictVal"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChild = false">取 消</el-button>
        <el-button type="primary" @click="addChildPar">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bus from "../Bus/index.js";
import {
  CreateDict,
  DeleteDict,
  GetDictQuery,
  CreateDictTerm,
} from "../../../api/index.js";
export default {
  data() {
    return {
      form: {},
      addChild: false,
      addDictInfo: { interiorName: null, defaultDisplay: null },
      addChildTermModel: true,
      addTermParams: {
        defaultDisplay: "",
        dictVal: "",
        interiorName: "",
      },
    };
  },
  mounted() {
    Bus.$on("dictInfo", (data) => {
      console.log(data);
      this.form = data;
      this.GetDictQueryPar();
    });
  },
  methods: {
    // 创建字典项
    CreateDictTermPar() {
      CreateDictTerm().then((res) => {
        console.log(res);
      });
    },

    // 查询字典项
    GetDictQueryPar() {
      GetDictQuery({
        dictCode: this.form.dictCode,
      }).then((res) => {
        console.log(res);
      });
    },

    // 删除字典
    DeleteDictPar() {
      this.$confirm("确定要删除这个节点吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          DeleteDict({ dictCode: this.form.dictCode }).then((res) => {
            if (res) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              Bus.$emit("create", true);
            } else {
              this.$message.error("删除失败!");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 增加子字典
    addChildPar() {
      let params = {
        interiorName: this.addDictInfo.interiorName,
        defaultDisplay: this.addDictInfo.defaultDisplay,
        parentCode: this.form.dictCode,
      };
      CreateDict(params).then((res) => {
        if (res) {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          this.addChild = false;
          Bus.$emit("create", true);
        } else {
          this.$message.error("添加失败！");
        }
      });
    },
    // 关闭新增字典弹框
    addChildClose() {
      this.addChild = false;
    },
    // 关闭字典项弹窗
    addTermParamsClose() {
      this.addChildTermModel = false;
    },
  },
};
</script>

<style>
</style>