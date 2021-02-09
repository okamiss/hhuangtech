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
        >创建字典项</el-button
      >
    </div>
    <div class="card-box" ref="firTogg">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="id">
                <span>{{ props.row.id }}</span>
              </el-form-item>
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
              <el-form-item label="dictItemCode">
                <span>{{ props.row.dictItemCode }}</span>
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
          width="180"
        ></el-table-column>
        <el-table-column
          prop="defaultDisplay"
          label="显示名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="dictVal"
          label="字典值"
          width="180"
        ></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >创建字典项关联</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除字典项关联</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="增加字典"
      :visible.sync="addChild"
      width="40%"
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
      title="关联字典项"
      :visible.sync="relModel"
      width="40%"
      :before-close="relModelClose"
    >
      <el-row>
        <el-col :span="6">选择关联父级</el-col>
        <el-col :span="18">
          <el-select v-model="relParValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.dictCode"
              :label="item.interiorName"
              :value="item.dictCode"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="relModel = false">取 消</el-button>
        <el-button type="primary" @click="relModelPar">确 定</el-button>
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
  GetDictList,
  CreateDictTermRel,
} from "../../../api/index.js";
export default {
  data() {
    return {
      form: {},
      addChild: false,
      addDictInfo: { interiorName: null, defaultDisplay: null },
      addChildTermModel: false,
      addTermParams: {
        defaultDisplay: "",
        dictVal: "",
        interiorName: "",
      },
      domInfo: {
        treeNames: null,
      },
      tableData: [],
      relModel: false,
      relParValue: null,
      options: [],
      dictItemCode: null,
    };
  },
  mounted() {
    Bus.$on("dictInfo", (data) => {
      this.domInfo = data;
      this.GetDictQueryPar();
    });
  },
  methods: {
    // 关联字典项
    relModelPar() {
      CreateDictTermRel({
        dictCode: this.domInfo.dictCode,
        dictItemCode: this.dictItemCode,
        parentDictCode: this.relParValue,
      })
        .then((res) => {
          if (res) {
            this.$message({
              type: "success",
              message: "关联成功!",
            });
          } else {
            this.$message.error("关联失败!");
          }
        })
        .catch((err) => {
          this.$message.error("服务器错误!");
        });
    },
    //  关闭关联弹窗
    relModelClose() {
      this.relModel = false;
    },
    // 创建字典项关联
    handleEdit(row) {
      this.relModel = true;
      this.dictItemCode = row.dictItemCode;

      GetDictList({ parentCode: this.domInfo.parentCode }).then((res) => {
        this.options = res;
      });
    },
    // 删除字典项关联
    handleDelete(index, row) {
      console.log(index, row);
    },

    // 创建字典项
    CreateDictTermPar() {
      this.addTermParams.dictCode = this.domInfo.dictCode;
      CreateDictTerm(this.addTermParams).then((res) => {
        if (res) {
          this.$message({
            type: "success",
            message: "创建成功!",
          });
          this.addChildTermModel = false;
          this.GetDictQueryPar();
        } else {
          this.$message.error("创建失败!");
        }
      });
    },

    // 查询字典项
    GetDictQueryPar() {
      GetDictQuery({
        dictCode: this.domInfo.dictCode,
      }).then((res) => {
        this.tableData = res;
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
          DeleteDict({ dictCode: this.domInfo.dictCode }).then((res) => {
            if (res) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              Bus.$emit("upDict", this.domInfo.parentCode);
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
      this.addDictInfo.parentCode = this.domInfo.dictCode;

      CreateDict(this.addDictInfo).then((res) => {
        if (res) {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          this.addChild = false;
          Bus.$emit("upDict", this.domInfo.id);
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