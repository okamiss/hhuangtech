<template>
  <div>
    <div class="card-box">
      <el-button type="blue" @click="addField = true"> 增加字段</el-button>
      <el-button type="blue" @click="addChild = true">增加子节点</el-button>
      <el-button type="redx" @click="deleChild">删除节点</el-button>
      <el-button type="blue" @click="goGroup">创建组</el-button>
    </div>
    <div class="card-box def-height" ref="firTogg">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
      >
        <el-row :gutter="40">
          <el-col :span="7">
            <el-form-item label="内部名称">
              <el-input v-model="form.interiorName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="显示名称">
              <el-input v-model="form.defaultDisplay"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" :offset="7">
            <el-button
              v-if="showOne"
              type="radius"
              class="rotate90"
              icon="el-icon-d-arrow-left"
              @click="firTogg"
            ></el-button>
            <el-button
              v-else
              type="radius"
              class="rotate90"
              icon="el-icon-d-arrow-right"
              @click="firTogg"
            ></el-button>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="7">
            <el-form-item label="生命周期">
              <el-select v-model="form.date1" placeholder="请选择">
                <el-option label="设计" value="11111"></el-option>
                <el-option label="研发" value="22222"></el-option>
                <el-option label="上线" value="33333"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="图标">
              <el-input v-model="form.date3">
                <el-button slot="append">选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="7">
            <el-form-item label="可实例化">
              <el-switch
                active-color="#409EFF"
                v-model="form.data1"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="可有子类">
              <el-switch
                active-color="#409EFF"
                v-model="form.isRoot"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="说明">
              <el-input
                type="textarea"
                :rows="4"
                v-model="form.date1"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="blue" @click="onSubmit">保存</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>

    <div class="card-box">
      <el-button type="blue" @click="saveCreateGroup">创建组</el-button>
      <div class="create-group">
        <div class="create-group-item">
          <span>组名称</span>
          <el-input v-model="groupParams.defaultDisplay"></el-input>
        </div>
        <div class="create-group-item">
          <span>组列数</span>
          <el-input v-model="groupParams.maxRows"></el-input>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="card-box">
      <div class="change-group-sel">
        <div class="change-group-sel-item">字段</div>
        <div class="change-group-sel-item change-group-sel-act">
          布局 <i class="el-icon-arrow-down"></i>
        </div>
        <div class="change-group-sel-item">联动</div>
      </div>
      <div class="group-list" v-for="item in groupList" :key="item.id">
        <div class="group-list-tit">
          <div class="group-list-tit-attr">可用属性</div>
          <div class="group-list-tit-group">
            {{ item.defaultDisplay }} <i class="el-icon-edit-outline"></i>
            <i class="el-icon-delete" @click="delGroup(item.groupCode)"></i>
          </div>
        </div>
        <!-- {{ item.list }} -->
        <div class="group-list-data">
          <div
            class="group-list-data-col"
            v-for="(item2, index2) in item.list"
            :key="index2"
          >
            <draggable
              v-model="item.list[index2]"
              :group="item.id"
              animation="300"
              dragClass="dragClass"
              ghostClass="ghostClass"
              chosenClass="chosenClass"
              @start="onStart"
              @end="onEnd(item)"
              class="colHeight"
            >
              <transition-group>
                <div
                  class="group-list-data-item"
                  v-for="item3 in item2"
                  :key="item3.id + item3.interiorName"
                >
                  {{ item3.interiorName }}
                </div>
              </transition-group>
            </draggable>
          </div>

          <div class="clear"></div>
        </div>
      </div>
    </div>

    <div class="card-box">
      <div class="select">
        <!-- <span></span> -->
        <!-- <el-button size="small">筛选</el-button> -->
        <template v-if="status === '0'">
          <el-button type="blue" @click="lookReuse">只看启用</el-button>
          <el-button type="bluex" @click="lookStop">只看停用</el-button>
        </template>
        <template v-else-if="status === '2'">
          <el-button type="bluex" @click="lookReuse">只看启用</el-button>
          <el-button type="blue" @click="lookStop">只看停用</el-button>
        </template>
        <template v-else>
          <el-button type="bluex" @click="lookReuse">只看启用</el-button>
          <el-button type="bluex" @click="lookStop">只看停用</el-button>
        </template>

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
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        type="expand"
        :header-cell-style="{
          height: 60 + 'px',
          background: '#F7F7F7',
          'font-size': 18 + 'px',
          color: '#384B59',
          'font-weight': 500,
        }"
        :row-style="{ height: 60 + 'px', 'font-size': 14 + 'px' }"
      >
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

        <el-table-column prop="interiorName" label="内部名称" width="300">
        </el-table-column>
        <el-table-column prop="defaultDisplay" label="显示名称" width="300">
        </el-table-column>
        <el-table-column prop="colType" label="类型" width="200">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="blue"
              @click="fieldReuse(scope.row)"
              v-if="scope.row.status === '2'"
            >
              启用</el-button
            >
            <el-button
              type="redx"
              @click="fieldStop(scope.row)"
              v-if="scope.row.status === '0'"
            >
              停用</el-button
            >
            <el-button
              v-if="scope.row.colType === 'chain'"
              type="blue"
              @click="goToLinkage(scope.row)"
            >
              联动</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <div class="card-box">
      <el-row>
        <el-col :span="10">1</el-col>
        <el-col :span="10">1</el-col>
        <el-col :span="2" :offset="2">
          <el-button type="primary" icon="el-icon-arrow-up" circle></el-button>
        </el-col>
      </el-row>
    </div> -->

    <el-dialog
      title="增加子节点"
      :visible.sync="addChild"
      width="40%"
      :before-close="addChildClose"
    >
      <div class="dlg-xian"></div>
      <div class="treeNames">当前位置：{{ domInfo.treeNames }}</div>
      <el-form ref="form" :model="addChildParams" label-width="80px">
        <el-form-item label="内部名称">
          <el-input v-model="addChildParams.interiorName"></el-input>
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="addChildParams.defaultDisplay"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="bluex" @click="addChild = false">取 消</el-button>
        <el-button type="blue" @click="addChildPar">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="增加字段"
      :visible.sync="addField"
      width="1140px"
      :before-close="addFieldClose"
    >
      <div class="dlg-xian"></div>
      {{ addFieldParams.colType }}
      <el-form
        ref="form"
        :model="addFieldParams"
        label-width="80px"
        label-position="left"
      >
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="内部名称">
              <el-input v-model="addFieldParams.interiorName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="显示名称">
              <el-input v-model="addFieldParams.defaultDisplay"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="inter-img">
            <el-popover
              placement="bottom-end"
              trigger="manual"
              v-model="interVisible"
              width="400"
            >
              <div class="child-tit">国际化配置</div>
              <el-button type="blue" @click="interVisible = false"
                >确定</el-button
              >
              <img
                slot="reference"
                @click="interVisible = true"
                src="@/assets/img/inter_icon.png"
                alt=""
              />
            </el-popover>
          </el-col>
          <el-col :span="8">
            <el-form-item label="字段类型">
              <el-select
                v-model="addFieldParams.colType"
                filterable
                placeholder="请选字段类型"
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.javaType"
                  :label="item.remarks"
                  :value="item.javaType"
                >
                </el-option>
              </el-select>

              <!-- <el-input
                placeholder="请输入内容"
                v-model="defVal"
                class="input-with-select"
              >
                <el-select
                  slot="append"
                  filterable
                  v-model="addFieldParams.colType"
                  placeholder="请选列类型"
                  class="searCaseSel"
                >
                  <el-option
                    v-for="item in typeList"
                    :key="item.javaType"
                    :label="item.remarks"
                    :value="item.javaType"
                  >
                  </el-option>
                </el-select>
              </el-input> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="addFieldParams.colType !== 'objects_out'" :gutter="40">
          <el-col :span="6">
            <el-form-item label="可在'创建'时编辑" label-width="140px">
              <el-switch
                v-model="addFieldParams.createEditable"
                active-color="#3377FF"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="可在'更新'时编辑" label-width="140px">
              <el-switch
                v-model="addFieldParams.updateEditable"
                active-color="#3377FF"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否唯一">
              <el-switch active-color="#3377FF" v-model="defVal"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否必填">
              <el-switch active-color="#3377FF" v-model="defVal"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="40">
          <el-col
            :span="12"
            v-if="
              addFieldParams.colType === 'multi_select' ||
                addFieldParams.colType === 'dropdown' ||
                addFieldParams.colType === 'chain' ||
                addFieldParams.colType === 'composite' ||
                addFieldParams.colType === 'washing_style'
            "
          >
            <el-form-item label="选择字典" label-width="110px">
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
        <el-row v-if="addFieldParams.colType !== 'objects_out'" :gutter="40">
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
        <el-row :gutter="40">
          <el-col :span="12" v-if="addFieldParams.colType !== 'objects_out'">
            <el-form-item label="文本长度">
              <el-input v-model="addFieldParams.textMaxLength"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工具提示">
              <el-input v-model="addFieldParams.tips"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="公式">
              <el-input v-model="addFieldParams.formula"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          v-if="
            addFieldParams.colType !== 'objects_out' &&
              addFieldParams.colType !== 'date'
          "
          :gutter="40"
        >
          <el-col :span="12">
            <el-form-item label="表格可自动换行" label-width="130px">
              <el-switch
                v-model="addFieldParams.autoLinefeed"
                active-color="#3377FF"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="表格最小换行宽度" label-width="140px">
              <el-input v-model="addFieldParams.minLinefeedWidth"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12" v-if="addFieldParams.colType === 'currency'">
            <el-form-item label="货币符号">
              <el-input v-model="addFieldParams.currency"></el-input>
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
              <el-input v-model="addFieldParams.decimals"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="addFieldParams.colType === 'picture'" :gutter="40">
          <el-col :span="12">
            <el-form-item label="图片高度">
              <el-input v-model="addFieldParams.picHeight"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片宽度">
              <el-input v-model="addFieldParams.picWidth"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addFieldParams.colType === 'picture'" :gutter="40">
          <el-col :span="12">
            <el-form-item label="图片尺寸">
              <el-input v-model="addFieldParams.picMaxSize">
                <template slot="append">MB</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addFieldParams.colType === 'date'" :gutter="40">
          <el-col :span="6">
            <el-form-item label="是否默认当前日期" label-width="140px">
              <el-switch active-color="#3377FF" v-model="defVal"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="addFieldParams.colType === 'date'">
            <el-form-item label="是否换行">
              <el-switch active-color="#3377FF" v-model="defVal"></el-switch>
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

        <el-row v-if="addFieldParams.colType === 'boolean'" :gutter="40">
          <el-col :span="12">
            <el-form-item label="默认值">
              <el-switch active-color="#409EFF" v-model="defVal"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="addFieldParams.colType === 'sequence'" :gutter="40">
          <el-col :span="12">
            <el-form-item label="序列位数">
              <el-input v-model="defVal"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="24">
            <el-form-item label="说明">
              <el-input
                :rows="5"
                type="textarea"
                v-model="addFieldParams.description"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="bluex" @click="addField = false">取 消</el-button>
        <el-button type="blue" @click="subAddCode">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//导入draggable组件
import draggable from 'vuedraggable'
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
  createGroup,
  getGroupList,
  addFieldToGroup,
  getGroupInfo,
  removeGroup,
  editGroup,
} from '../../../api/index.js'
export default {
  //注册draggable组件
  components: {
    draggable,
  },

  data() {
    return {
      interVisible: false,
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
      showOne: false,
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
        items: [
          {
            objectCode: null,
          },
        ],
      },
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
      multipleSelection: [],
      nodeCode: '',
      groupList: [],
      groupParams: {
        defaultDisplay: '',
        groupCode: '',
        layoutCss: '',
        nodeCode: '',
        maxRows: '',
      },
    }
  },
  watch: {
    //   通过路由监听地址栏
    $route: function(route) {
      var query = route.query
      this.nodeCode = query.nodeCode
      this.groupParams.nodeCode = query.nodeCode
      this.tableData = []
      this.domInfo = query
      this.getDomInfo()
    },
  },
  created() {
    this.GetListType()
    var query = this.$route.query
    this.nodeCode = query.nodeCode
    this.groupParams.nodeCode = query.nodeCode
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

    // 创建组
    saveCreateGroup() {
      createGroup(this.groupParams).then((res) => {
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
    //开始拖拽事件
    onStart() {},
    //拖拽结束事件
    onEnd(a) {
      const list = a.list
      list.forEach((item, index) => {
        item.forEach((itemc) => {
          itemc.position = index
        })
      })

      const params = {
        defaultDisplay: a.defaultDisplay,
        groupCode: a.groupCode,
        layoutCss: JSON.stringify(list),
        maxRows: a.maxRows,
        nodeCode: a.nodeCode,
      }
      editGroup(params).then((res) => {})
    },

    // 获取组列表
    getGroupListFun() {
      getGroupList({ nodeCode: this.nodeCode }).then((res) => {
        res.forEach((item) => {
          if (item.layoutCss) {
            const getListStyle = JSON.parse(item.layoutCss)
            item.list = getListStyle
          } else {
            item.list = []
            item.list.push(this.tableData)
            for (let i = 0; i < item.maxRows; i++) {
              item.list.push([])
            }
          }
        })
        setTimeout(() => {
          this.groupList = res
        }, 500)
      })
    },

    // goto联动
    goToLinkage(row) {
      const params = {
        nodeCode: this.domInfo.nodeCode,
        extcolCode: row.extcolCode,
        interiorName: row.interiorName,
      }
      this.$router.push({
        path: '/Linkage',
        query: params,
      })
    },
    // 创建组
    goGroup() {
      const params = {
        nodeCode: this.domInfo.nodeCode,
      }
      this.$router.push({ path: '/Group', query: params })
    },
    //   选中的 值
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //   选择字典change
    handleChange(e) {
      this.selDictCode = e.slice(-1).join('')
    },
    // 只看启用
    lookReuse() {
      if (this.status === '0') {
        this.status = null
      } else {
        this.status = '0'
      }

      // this.getCodeData();
    },
    // 只看停用
    lookStop() {
      if (this.status === '2') {
        this.status = null
      } else {
        this.status = '2'
      }

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
      if (
        /(multi_select|dropdown|chain|composite|washing_style)/i.test(
          this.addFieldParams.colType
        )
      ) {
        this.addFieldParams.items[0].objectCode = this.selDictCode
      } else {
        delete this.addFieldParams.items
      }
      this.addFieldParams.nodeCode = this.form.parentCodes.split(',')[1]
        ? this.form.parentCodes.split(',')[1]
        : this.form.nodeCode
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
          this.addFieldParams = {
            items: [
              {
                objectCode: null,
              },
            ],
          }
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
        this.getGroupListFun()
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
        this.$refs.firTogg.style.height = '70px'
        this.$refs.firTogg.style.overflow = 'hidden'
      } else {
        this.$refs.firTogg.style.height = 'auto'
      }
    },
  },
}
</script>

<style lang="less" coped>
.def-height {
  height: 70px;
  overflow: hidden;
}
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

.select {
  display: flex;
  // justify-content: start;
  justify-content: left;
  align-items: center;
  margin-bottom: 20px;
  span {
    display: block;
    // margin-right: 10px;
  }
  .el-input-group {
    width: 400px;
    margin-left: 10px;
    .el-select {
      width: 110px;
      span {
        margin-top: -1px;
      }
    }
  }
  .el-input-group__prepend {
    background-color: transparent !important;
  }
  .el-input-group__append {
    background-color: #3377ff !important;

    color: #fff;
    width: 88px;
    padding: 0;
    text-align: center;
  }
}
.el-form-item {
  margin-bottom: 10px !important;
}

.rotate90 {
  transform: rotate(90deg);
  -ms-transform: rotate(90deg); /* IE 9 */
  -moz-transform: rotate(90deg); /* Firefox */
  -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
  -o-transform: rotate(90deg); /* Opera */
}
.searCaseSel {
  width: 120px;
}

.change-group-sel {
  height: 32px;
  .change-group-sel-item {
    height: 100%;
    float: left;
    width: 88px;
    background: #f7f7f7;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
    i {
      margin-left: 5px;
    }
  }
  .change-group-sel-act {
    background: #3377ff;
    color: #fff;
  }
}

.create-group {
  margin-top: 10px;
  height: 32px;
  .create-group-item {
    height: 100%;
    width: 338px;
    display: flex;
    float: left;
    margin-right: 24px;
    span {
      width: 68px;
      line-height: 32px;
      font-size: 16px;
    }
    .el-input {
      flex: 1;
    }
  }
}

.group-list {
  margin-bottom: 40px;
  .group-list-tit {
    width: 100%;
    height: 40px;
    background: #f7f7f7;
    display: flex;
    border-top: 1px solid #3377ff;
  }
  .group-list-tit-attr {
    width: 312px;
    height: 100%;
    border-right: 1px solid #e8e8e8;
    font-size: 16px;
    font-weight: 500;
    line-height: 40px;
    text-indent: 24px;
  }
  .group-list-tit-group {
    flex: 1;
    height: 100%;
    font-size: 16px;
    font-weight: 500;
    line-height: 40px;
    text-indent: 24px;
    i {
      text-indent: 12px;
      cursor: pointer;
    }
  }
}
.group-list-data {
  width: 100%;
  height: 200px;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  display: flex;
  .group-list-data-col {
    overflow-y: scroll;
    float: left;
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid #e8e8e8;

    .group-list-data-item {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-indent: 24px;
      box-sizing: border-box;
      border-bottom: 1px solid #e8e8e8;
      cursor: move;
    }
  }
  .group-list-data-col:first-child {
    flex: inherit;
    width: 312px;
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

.colHeight {
  /* height: 50px; */
  span {
    display: block;
    height: 200px;
  }
}
</style>
