<template>
  <div>
    <div class="card-box">
      <el-button size="small" type="primary" round @click="addChild = true"
        >增加子节点</el-button
      >
      <el-button size="small" type="danger" round @click="deleChild"
        >删除节点</el-button
      >
      <el-button size="small" type="primary" round @click="addField = true">
        扩展字段</el-button
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
          <el-col :span="2" :offset="2">
            <el-button
              v-if="showOne"
              type="primary"
              icon="el-icon-arrow-up"
              circle
              @click="firTogg"
            ></el-button>
            <el-button
              v-else
              type="primary"
              icon="el-icon-arrow-down"
              circle
              @click="firTogg"
            ></el-button>
          </el-col>
          <el-col :span="9">
            <el-form-item label="可实例化">
              <el-switch
                active-color="#13ce66"
                v-model="form.data1"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="可有子类型">
              <el-switch
                active-color="#13ce66"
                v-model="form.isRoot"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="说明">
              <el-input type="textarea" v-model="form.date1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="图标">
              <el-input v-model="form.date3">
                <el-button slot="append">选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="生命周期">
          <el-select v-model="form.date1" placeholder="请选择">
            <el-option label="设计" value="11111"></el-option>
            <el-option label="研发" value="22222"></el-option>
            <el-option label="上线" value="22222"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit"
            >保存</el-button
          >
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="card-box">
      <el-table :data="tableData" border style="100%" type="expand">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="id">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="defaultDisplay">
                <span>{{ props.row.defaultDisplay }}</span>
              </el-form-item>
              <el-form-item label="extcolCode">
                <span>{{ props.row.extcolCode }}</span>
              </el-form-item>
              <el-form-item label="isNewRecord">
                <span>{{ props.row.isNewRecord }}</span>
              </el-form-item>
              <el-form-item label="nodeCode">
                <span>{{ props.row.nodeCode }}</span>
              </el-form-item>
              <el-form-item label="rootCode">
                <span>{{ props.row.rootCode }}</span>
              </el-form-item>
              <el-form-item label="shardingCode">
                <span>{{ props.row.shardingCode }}</span>
              </el-form-item>
              <el-form-item label="shardingColCode">
                <span>{{ props.row.shardingColCode }}</span>
              </el-form-item>
              <el-form-item label="status">
                <span>{{ props.row.status }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="interiorName" label="内部名称" width="150">
        </el-table-column>
        <el-table-column prop="defaultDisplay" label="外部名称" width="200">
        </el-table-column>
        <el-table-column prop="colType" label="类型" width="150">
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="card-box">
      <el-row>
        <el-col :span="10">1</el-col>
        <el-col :span="10">1</el-col>
        <el-col :span="2" :offset="2">
          <el-button type="primary" icon="el-icon-arrow-up" circle></el-button>
        </el-col>
      </el-row>
    </div>
    <div class="card-box">
      <el-row>
        <el-col :span="10">1</el-col>
        <el-col :span="10">1</el-col>
        <el-col :span="2" :offset="2">
          <el-button type="primary" icon="el-icon-arrow-up" circle></el-button>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      title="增加子类型"
      :visible.sync="addChild"
      width="40%"
      :before-close="addChildClose"
    >
      <div class="treeNames">{{ domInfo.treeNames }}</div>
      <el-form ref="form" :model="addChildParams" label-width="80px">
        <el-form-item label="内部名称">
          <el-input v-model="addChildParams.interiorName"></el-input>
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="addChildParams.defaultDisplay"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChild = false">取 消</el-button>
        <el-button type="primary" @click="addChildPar">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="扩展字段"
      :visible.sync="addField"
      width="80%"
      :before-close="addFieldClose"
      center
    >
      <el-form ref="form" :model="addFieldParams" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="内部名称">
              <el-input v-model="addFieldParams.interiorName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="列类型">
              <el-select
                v-model="addFieldParams.colType"
                placeholder="请选列类型"
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.javaType"
                  :label="item.remarks"
                  :value="item.javaType"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="可在创建时编辑">
              <el-input v-model="addFieldParams.createEditable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据源">
              <el-input v-model="addFieldParams.datasource"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="外部显示">
              <el-input v-model="addFieldParams.defaultDisplay"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="说明">
              <el-input v-model="addFieldParams.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="extcolCode">
              <el-input v-model="addFieldParams.extcolCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公式">
              <el-input v-model="addFieldParams.formula"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="国际化代码">
              <el-input v-model="addFieldParams.i18nCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="国际化显示">
              <el-input v-model="addFieldParams.i18nDisplay"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <!-- <el-form-item label="nodeCode">
              <el-input v-model="domInfo.nodeCode"></el-input>
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联对象">
              <el-input v-model="addFieldParams.relatedObject"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <!-- <el-form-item label="rootCode">
              <el-input v-model="addFieldParams.rootCode"></el-input>
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="序列代码">
              <el-input v-model="addFieldParams.seqCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="分片代码">
              <el-input v-model="addFieldParams.shardingCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="shardingColCode">
              <el-input v-model="addFieldParams.shardingColCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="文本高度">
              <el-input v-model="addFieldParams.textHeight"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文本宽度">
              <el-input v-model="addFieldParams.textWidth"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="updateEditable">
              <el-input v-model="addFieldParams.updateEditable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addField = false">取 消</el-button>
        <el-button type="primary" @click="subAddCode">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bus from "./Bus.js";
import {
  GetDomDetail,
  CreateDom,
  DeleteDom,
  EidtDom,
  GetCode,
  GetListType,
  AddField,
} from "../../../api/index.js";
export default {
  data() {
    return {
      form: {
        name: "",
        date1: "",
        date2: "",
        date3: "",
        date4: "",
        delivery: false,
        oneHeight: "100px",
      },
      showOne: true,
      showTwo: true,
      showThree: true,
      showTour: true,
      addChild: false,
      addChildParams: {
        defaultDisplay: null,
        interiorName: null,
        parentCode: null,
      },
      addField: false,
      addFieldParams: {
        // alias: "1",
        // createEditable: "1",
        // datasource: "1",
        // defaultDisplay: "1",
        // description: "1",
        // extcolCode: "1",
        // formula: "1",
        // i18nCode: "1",
        // i18nDisplay: "1",
        // relatedObject: "1",
        // seqCode: "1",
        // shardingCode: "1",
        // shardingColCode: "1",
        // textHeight: "1",
        // textWidth: "1",
        // updateEditable: "1",
      },
      domInfo: {
        treeNames: null,
      },
      tableData: [],
      typeList: [],
    };
  },
  created() {
    this.GetListType();
  },
  mounted() {
    Bus.$on("nodeCode", (data) => {
      // console.log(data);
      this.tableData = [];
      this.domInfo = data;
      console.log(this.domInfo);
      this.getDomInfo();
      this.getCodeData();
    });
  },
  methods: {
    // 增加字段
    subAddCode() {
      this.addFieldParams.nodeCode = this.domInfo.nodeCode;
      this.addFieldParams.rootCode = this.domInfo.rootTableCode;

      // console.log(this.domInfo);
      // console.log(this.addFieldParams);

      AddField(this.addFieldParams).then((res) => {
        if (res) {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          this.addField = false;
          this.addFieldParams = {};
          Bus.$emit("create", true);
        } else {
          this.$message.error("添加失败！");
        }
      });
    },
    // 编辑字段
    handleEdit(row) {
      console.log(row);
    },
    // 删除字段
    handleDelete(row) {
      console.log(row);
    },
    // 获取字段类型
    GetListType() {
      GetListType().then((res) => {
        // console.log(res);
        this.typeList = res;
      });
    },
    // 获取字段
    getCodeData() {
      GetCode({ rootCode: this.domInfo.rootTableCode }).then((res) => {
        this.tableData = res;
      });
    },

    // 增加子节点
    addChildPar() {
      // console.log(this.domInfo.nodeCode);
      this.addChildParams.parentCode = this.domInfo.nodeCode;
      // console.log(this.addChildParams);

      if (!this.addChildParams.defaultDisplay) {
        this.$message({ message: "请填写名称", type: "warning" });
      }
      CreateDom(this.addChildParams).then((res) => {
        console.log(res);
        if (res) {
          this.$message("创建成功！");
          this.addChild = false;
          this.addChildParams = {
            defaultDisplay: "",
            parentCode: null,
          };
          Bus.$emit("create", true);
        } else {
          this.$message.error("创建失败！");
        }
      });
    },
    // 获取节点信息
    getDomInfo() {
      GetDomDetail({ nodeCode: this.domInfo.nodeCode }).then((res) => {
        // console.log(res);
        this.form = res;
      });
    },

    //   删除节点
    deleChild() {
      this.$confirm("确定要删除这个节点吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          DeleteDom({ childCode: this.domInfo.nodeCode }).then((res) => {});
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          Bus.$emit("create", true);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 关闭节点弹窗
    addChildClose() {
      this.addChild = false;
    },
    // 关闭字段弹窗
    addFieldClose() {
      this.addField = false;
    },
    // 提交保存节点
    onSubmit() {
      // console.log("submit!");
      // console.log(this.form);
      EidtDom(this.form).then((res) => {
        if (res) {
          this.$message({
            type: "success",
            message: "更新成功!",
          });
          this.getDomInfo();
          Bus.$emit("create", true);
        } else {
          this.$message.error("更新失败！");
        }
      });
    },
    // 第一个card
    firTogg() {
      this.showOne = !this.showOne;
      //   console.log(this.showOne);
      //   var heightStyle = this.$refs.firTogg.offsetHeight;
      if (!this.showOne) {
        this.$refs.firTogg.style.height = "80px";
        this.$refs.firTogg.style.overflow = "hidden";
      } else {
        this.$refs.firTogg.style.height = "auto";
      }
    },
  },
};
</script>

<style lang="less" coped>
.el-input {
  height: 32px;
  input {
    height: 100%;
  }
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 150px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.card-box {
  position: relative;
}

.el-table {
  position: absolute;
}
.treeNames {
  width: 100%;
  // background: #ccc;
  line-height: 30px;
  text-indent: 12px;
  color: blue;
  font-weight: bold;
  font-size: 17px;
}
</style>