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
        增加字段</el-button
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
                active-color="#409EFF"
                v-model="form.data1"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="可有子类型">
              <el-switch
                active-color="#409EFF"
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
            <el-option label="上线" value="33333"></el-option>
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
      <div>选择联动关系</div>
      <el-row>
        <el-col :span="5">
          <el-select v-model="defVal" placeholder="请选择联动字段">
            <el-option
              v-for="item in textData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-table
            ref="multipleTable"
            :data="tabTestData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>

            <el-table-column prop="name" label="名称" width="120">
            </el-table-column>
            <el-table-column prop="value" label="值" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-select v-model="defVal" placeholder="请选择联动字段">
            <el-option
              v-for="item in textData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-table
            ref="multipleTable"
            :data="tabTestData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>

            <el-table-column prop="name" label="名称" width="120">
            </el-table-column>
            <el-table-column prop="value" label="值" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-select v-model="defVal" placeholder="请选择联动字段">
            <el-option
              v-for="item in textData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-table
            ref="multipleTable"
            :data="tabTestData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>

            <el-table-column prop="name" label="名称" width="120">
            </el-table-column>
            <el-table-column prop="value" label="值" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-button type="primary" icon="el-icon-arrow-up" circle></el-button>
        </el-col>
      </el-row>
    </div>
    <div class="card-box">
      <div class="select">
        <span>筛选</span>
        <el-button size="small" round @click="lookReuse">只看启用</el-button>
        <el-button size="small" round @click="lookStop">只看停用</el-button>
        <el-input
          placeholder="请输入内容"
          v-model="input3"
          class="input-with-select"
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="内部名称" value="1"></el-option>
            <el-option label="外部名称" value="2"></el-option>
            <el-option label="类型" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table :data="tableData" border style="width: 100%" type="expand">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="内部名称">
                <span>{{ props.row.interiorName }}</span>
              </el-form-item>
              <el-form-item label="显示名称">
                <span>{{ props.row.defaultDisplay }}</span>
              </el-form-item>
              <el-form-item label="类型">
                <span>{{ props.row.colType }}</span>
              </el-form-item>
              <!-- <el-form-item label="extcolCode">
                <span>{{ props.row.extcolCode }}</span>
              </el-form-item> -->
              <el-form-item label="isNewRecord">
                <span>{{ props.row.isNewRecord }}</span>
              </el-form-item>
              <!-- <el-form-item label="nodeCode">
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
              </el-form-item> -->
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="interiorName" label="内部名称" width="200">
        </el-table-column>
        <el-table-column prop="defaultDisplay" label="显示名称" width="200">
        </el-table-column>
        <el-table-column prop="colType" label="类型" width="150">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button
              size="small"
              type="info"
              round
              @click="fieldRecover(scope.row)"
            >
              删除</el-button
            > -->
            <el-button
              size="small"
              type="primary"
              round
              @click="fieldReuse(scope.row)"
              v-if="scope.row.status === '2'"
            >
              启用</el-button
            >
            <el-button
              size="small"
              type="danger"
              round
              @click="fieldStop(scope.row)"
              v-if="scope.row.status === '0'"
            >
              停用</el-button
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
      title="增加字段"
      :visible.sync="addField"
      width="80%"
      :before-close="addFieldClose"
      center
    >
      {{ addFieldParams.colType }}
      <el-form ref="form" :model="addFieldParams" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="内部名称">
              <el-input v-model="addFieldParams.interiorName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示名称">
              <el-input v-model="addFieldParams.defaultDisplay"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="addFieldParams.colType !== 'objects_out'">
          <el-col :span="12">
            <el-form-item label="可在'创建'时编辑">
              <el-switch
                v-model="addFieldParams.createEditable"
                active-color="#409EFF"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可在'更新'时编辑">
              <el-switch
                v-model="addFieldParams.updateEditable"
                active-color="#409EFF"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="是否唯一">
              <el-switch active-color="#409EFF" v-model="defVal"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否必填">
              <el-switch active-color="#409EFF" v-model="defVal"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="列类型">
              <el-select
                filterable
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
          <el-col
            :span="12"
            v-if="
              addFieldParams.colType === 'multi_select' ||
                addFieldParams.colType === 'dropdown' ||
                addFieldParams.colType === 'chain' ||
                addFieldParams.colType === 'composite'
            "
          >
            <el-form-item label="从字典中选择">
              <el-cascader
                :options="options"
                @change="handleChange"
                filterable
                :props="{
                  checkStrictly: true,
                  value: 'dictCode',
                  label: 'defaultDisplay',
                  expandTrigger: 'hover',
                  children: 'child',
                }"
                collapse-tags
                clearable
              ></el-cascader
            ></el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addFieldParams.colType !== 'objects_out'">
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
          <el-col :span="12" v-if="addFieldParams.colType !== 'objects_out'">
            <el-form-item label="文本长度">
              <el-input v-model="defVal"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工具提示">
              <el-input v-model="defVal"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="addFieldParams.colType === 'currency'">
            <el-form-item label="货币符号">
              <el-input v-model="defVal"></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="12"
            v-if="
              addFieldParams.colType === 'currency' ||
                addFieldParams.colType === 'double'
            "
          >
            <el-form-item label="显示的小数位">
              <el-input v-model="defVal"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          v-if="
            addFieldParams.colType !== 'objects_out' &&
              addFieldParams.colType !== 'date'
          "
        >
          <el-col :span="12">
            <el-form-item label="表格可自动换行">
              <el-input v-model="defVal"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="表格最小换行宽度">
              <el-input v-model="defVal"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="addFieldParams.colType === 'picture'">
          <el-col :span="12">
            <el-form-item label="图片高度">
              <el-input v-model="defVal"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片宽度">
              <el-input v-model="defVal"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addFieldParams.colType === 'picture'">
          <el-col :span="12">
            <el-form-item label="图片尺寸">
              <el-input v-model="defVal">
                <template slot="append">MB</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addFieldParams.colType === 'date'">
          <el-col :span="12">
            <el-form-item label="是否默认当前日期">
              <el-switch active-color="#409EFF" v-model="defVal"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期格式">
              <el-select v-model="optionDateVal" placeholder="请选择">
                <el-option
                  v-for="item in optionDate"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addFieldParams.colType === 'date'">
          <el-col :span="12">
            <el-form-item label="是否换行">
              <el-switch active-color="#409EFF" v-model="defVal"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addFieldParams.colType === 'boolean'">
          <el-col :span="12">
            <el-form-item label="默认值">
              <el-switch active-color="#409EFF" v-model="defVal"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="addFieldParams.colType === 'sequence'">
          <el-col :span="12">
            <el-form-item label="序列位数">
              <el-input v-model="defVal"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="说明">
              <el-input
                type="textarea"
                v-model="addFieldParams.description"
              ></el-input>
            </el-form-item>
          </el-col>
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
import Bus from '../Bus'
import {
  GetDomDetail,
  CreateDom,
  DeleteDom,
  EidtDom,
  GetCode,
  GetListType,
  AddField,
  ApiFieldRecover,
  ApiFieldReuse,
  ApiFieldStop,
} from '../../../api/index.js'
export default {
  data() {
    return {
      defVal: '',
      form: {
        name: '',
        date1: '',
        date2: '',
        date3: '',
        date4: '',
        delivery: false,
        oneHeight: '100px',
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
      addFieldParams: {},
      domInfo: {
        treeNames: null,
      },
      tableData: [],
      typeList: [],
      input3: '',
      select: '',
      status: null,
      options: [],
      selDictCode: [],
      optionDateVal: '',
      optionDate: [
        {
          value: '1',
          label: 'yyyy年MM月dd日 HH时mm分ss秒',
        },
        {
          value: '2',
          label: 'yyyy/MM/dd HH:mm',
        },
        {
          value: '3',
          label: 'yyyy-MM-dd HH:mm:ss',
        },
      ],
      textData: [
        {
          value: '1',
          label: '字典项1',
        },
        {
          value: '2',
          label: '字典项2',
        },
        {
          value: '3',
          label: '字典项3',
        },
        {
          value: '4',
          label: '字典项4',
        },
        {
          value: '5',
          label: '字典项5',
        },
      ],
      tabTestData: [
        {
          name: '字典项字段111',
          value: '值',
        },
        {
          name: '字典项字段222',
          value: '值',
        },
        {
          name: '字典项字段333',
          value: '值',
        },
        {
          name: '字典项字段444',
          value: '值',
        },
        {
          name: '字典项字段555',
          value: '值',
        },
      ],
      multipleSelection: [],
    }
  },
  watch: {
    //   通过路由监听地址栏
    $route: function(route) {
      var query = route.query
      this.tableData = []
      this.domInfo = query
      this.getDomInfo()
    },
  },
  created() {
    this.GetListType()
    var query = this.$route.query
    this.tableData = []
    this.domInfo = query
    this.getDomInfo()

    setTimeout(() => {
      let getDictList = JSON.parse(localStorage.getItem('dictList'))
      this.options = getDictList
    }, 2000)
  },
  mounted() {},
  filters: {},
  methods: {
    //   选中的 值
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    },
    //   选择字典change
    handleChange(e) {
      this.selDictCode = e.slice(-1).join('')
      console.log(this.selDictCode)
    },
    // 只看启用
    lookReuse() {
      this.status = '0'
      // this.getCodeData();
    },
    // 只看停用
    lookStop() {
      this.status = '2'
      // this.getCodeData();
    },
    // 删除
    fieldRecover(item) {
      ApiFieldRecover({ extcolCode: item.extcolCode }).then((res) => {
        if (res) {
          this.$message({
            message: '操作成功！',
            type: 'success',
          })
          this.getCodeData()
        } else {
          this.$message.error('操作失败！')
        }
      })
    },
    // 启用
    fieldReuse(item) {
      ApiFieldReuse({
        nodeCode: this.form.nodeCode,
        extcolCode: item.extcolCode,
      }).then((res) => {
        if (res) {
          this.$message({
            message: '操作成功！',
            type: 'success',
          })
          this.getCodeData()
        } else {
          this.$message.error('操作失败！')
        }
      })
    },
    // 停用
    fieldStop(item) {
      ApiFieldStop({
        nodeCode: this.form.nodeCode,
        extcolCode: item.extcolCode,
      }).then((res) => {
        if (res) {
          this.$message({
            message: '操作成功！',
            type: 'success',
          })
          this.getCodeData()
        } else {
          this.$message.error('操作失败！')
        }
      })
    },
    // 增加字段
    subAddCode() {
      this.addFieldParams.nodeCode = this.form.parentCodes.split(',')[1]
      this.addFieldParams.rootCode = this.form.rootTableCode

      if (
        !this.addFieldParams.interiorName ||
        !this.addFieldParams.defaultDisplay ||
        !this.addFieldParams.colType
      ) {
        this.$message({
          message: '内部名称,显示名称,列类型是必填选项！',
          type: 'warning',
        })
        return
      }
      AddField(this.addFieldParams).then((res) => {
        if (res.result === 'true') {
          this.$message({
            message: res.message,
            type: 'success',
          })
          this.addField = false
          this.addFieldParams = {}
          this.getCodeData()
        } else {
          this.$message.error(res.message)
        }
      })
    },

    // 获取字段类型
    GetListType() {
      GetListType().then((res) => {
        this.typeList = res
      })
    },
    // 获取字段
    getCodeData() {
      GetCode({
        nodeCode: this.form.nodeCode,
        status: this.status,
      }).then((res) => {
        this.tableData = res
      })
    },

    // 增加子节点
    addChildPar() {
      this.addChildParams.parentCode = this.form.nodeCode

      if (
        !this.addChildParams.defaultDisplay ||
        !this.addChildParams.interiorName
      ) {
        this.$message({ message: '请填写名称', type: 'warning' })
        return
      }
      CreateDom(this.addChildParams).then((res) => {
        if (res) {
          this.$message({
            type: 'success',
            message: '创建成功!',
          })
          this.addChild = false
          this.addChildParams = {
            defaultDisplay: '',
            parentCode: null,
          }
          Bus.$emit('upNav', this.domInfo.id)
        } else {
          this.$message.error('创建失败！')
        }
      })
    },
    // 获取节点信息
    getDomInfo() {
      GetDomDetail({ nodeCode: this.domInfo.nodeCode }).then((res) => {
        this.form = res
        this.getCodeData()
      })
    },

    //   删除节点
    deleChild() {
      this.$confirm('确定要删除这个节点吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          DeleteDom({ childCode: this.form.nodeCode }).then((res) => {
            if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              Bus.$emit('upNav', this.form.nodeCode)
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
    // 关闭节点弹窗
    addChildClose() {
      this.addChild = false
    },
    // 关闭字段弹窗
    addFieldClose() {
      this.addField = false
    },
    // 提交保存节点
    onSubmit() {
      EidtDom(this.form).then((res) => {
        if (res) {
          this.$message({
            type: 'success',
            message: '更新成功!',
          })
          this.getDomInfo()
          Bus.$emit('upNav', this.domInfo.id)
        } else {
          this.$message.error('更新失败！')
        }
      })
    },
    // 第一个card
    firTogg() {
      this.showOne = !this.showOne
      //   var heightStyle = this.$refs.firTogg.offsetHeight;
      if (!this.showOne) {
        this.$refs.firTogg.style.height = '80px'
        this.$refs.firTogg.style.overflow = 'hidden'
      } else {
        this.$refs.firTogg.style.height = 'auto'
      }
    },
  },
}
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
.select {
  display: flex;
  // justify-content: start;
  justify-content: left;
  align-items: center;
  margin-bottom: 20px;
  span {
    display: block;
    margin-right: 10px;
  }
  .el-input-group {
    width: 400px;
    margin-left: 10px;
    .el-select {
      width: 110px;
    }
  }
}
</style>
