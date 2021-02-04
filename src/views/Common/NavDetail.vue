<template>
  <div>
    <div class="operation">
      <el-button size="medium" type="primary" round>增加子节点</el-button>
      <el-button size="medium" type="danger" round>删除节点</el-button>
      <el-button size="medium" type="primary" round>扩展字段</el-button>
    </div>
    <div class="edit-form">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="内部名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="可实例化">
          <el-switch active-color="#13ce66" v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" v-model="form.date1"></el-input>
        </el-form-item>
        <el-form-item label="可有子类型">
          <el-switch active-color="#13ce66" v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="生命周期">
          <el-select v-model="form.date1" placeholder="请选择">
            <el-option label="设计" value="11111"></el-option>
            <el-option label="研发" value="22222"></el-option>
            <el-option label="上线" value="22222"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          >·
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
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
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="less" coped>
.edit-form {
  margin-top: 20px;
  .el-form {
    width: 600px;
  }
}
</style>