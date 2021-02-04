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
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="显示名称">
              <el-input v-model="form.name"></el-input>
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
                v-model="form.delivery"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="可有子类型">
              <el-switch
                active-color="#13ce66"
                v-model="form.delivery"
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
      title="增加子节点"
      :visible.sync="addChild"
      width="40%"
      :before-close="addChildClose"
      center
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="addChildParams.data"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChild = false">取 消</el-button>
        <el-button type="primary" @click="addChild = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="扩展字段"
      :visible.sync="addField"
      width="40%"
      :before-close="addFieldClose"
      center
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="字段名称">
          <el-input v-model="addFieldParams.data"></el-input>
        </el-form-item>
        <el-form-item label="字段类型">
          <el-select v-model="addFieldParams.data" placeholder="请选择字段类型">
            <el-option label="类型1" value="1"></el-option>
            <el-option label="类型2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文本高度">
          <el-input v-model="addFieldParams.data"></el-input>
        </el-form-item>
        <el-form-item label="文本宽度">
          <el-input v-model="addFieldParams.data"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addField = false">取 消</el-button>
        <el-button type="primary" @click="addField = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { GetList } from "../../../api/index.js";
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
        data: "",
      },
      addField: false,
      addFieldParams: {
        data: "",
      },
    };
  },
  created() {
    // GetList.then((res) => {
    //   console.log(res);
    // });
  },
  mounted() {},
  methods: {
    //   删除节点
    deleChild() {
      this.$confirm("确定要删除这个节点吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
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
      console.log("submit!");
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
</style>