<template>
  <div>
    <!-- <div class="card-box" v-for="item in group" :key="item.id">
      <div class="group-tit">组名称：{{ item.defaultDisplay }}</div>
      <div class="group-list">
        <div
          class="group-list-item"
          v-for="(item2, index) in item.layoutCss"
          :key="index"
        >
          <div
            class="group-list-item-child"
            v-for="(item3, index3) in item2"
            :key="index3"
          >
            <div class="group-list-item-childName">
              {{ item3.defaultDisplay }} ---{{ item3.colTypeLang.local }}
            </div>
            <div
              class="group-list-item-childVal"
              v-if="item3.colType === 'href' || item3.colType === 'text'"
            >
              <el-input v-model="defval"></el-input>
            </div>
            <div
              class="group-list-item-childVal"
              v-if="item3.colType === 'dropdown'"
            >
              <el-select v-model="defval" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- 11 -->
    <div class="card-box">
      <div class="group-tit">组名称：</div>
      <div class="group-list">
        <div class="group-list-item">
          <div class="group-list-item-child">
            <div class="group-list-item-childName">
              文本
            </div>
            <div class="group-list-item-childVal">
              <el-input v-model="defval"></el-input>
            </div>
          </div>
          <div class="group-list-item-child">
            <div class="group-list-item-childName">
              公式
            </div>
            <div class="group-list-item-childVal">
              <el-input
                v-model="defval"
                placeholder="字符串1”-”字符串2”-”字符串3"
              ></el-input>
              <el-input
                v-model="defval"
                placeholder="数字1+数字2+数字3"
              ></el-input>
            </div>
          </div>
          <div class="group-list-item-child">
            <div class="group-list-item-childName">
              货币
            </div>
            <div class="group-list-item-childVal">
              <el-input placeholder="请输入内容" v-model="defval">
                <template slot="append">￥</template>
              </el-input>
            </div>
          </div>
          <div class="group-list-item-child">
            <div class="group-list-item-childName">
              多选
            </div>
            <div class="group-list-item-childVal">
              <el-select
                v-model="defval"
                multiple
                collapse-tags
                style="margin-left: 20px;"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="group-list-item">
          <div class="group-list-item-child">
            <div class="group-list-item-childName">
              超链接
            </div>
            <div class="group-list-item-childVal">
              <el-input
                v-model="defval"
                placeholder="https://www.baidu.com"
              ></el-input>
            </div>
          </div>
          <div class="group-list-item-child">
            <div class="group-list-item-childName">
              布尔
            </div>
            <div class="group-list-item-childVal">
              <el-switch v-model="defval" active-color="##3377FF"> </el-switch>
            </div>
          </div>
          <div class="group-list-item-child">
            <div class="group-list-item-childName">
              整型
            </div>
            <div class="group-list-item-childVal">
              <el-input v-model="defval" placeholder="整型 例：20"></el-input>
            </div>
          </div>
          <div class="group-list-item-child">
            <div class="group-list-item-childName">
              图片
            </div>
            <div class="group-list-item-childVal">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </div>
          </div>
        </div>
        <div class="group-list-item">
          <div class="group-list-item-child">
            <div class="group-list-item-childName">
              下拉
            </div>
            <div class="group-list-item-childVal">
              <el-select v-model="defval" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="group-list-item-child">
            <div class="group-list-item-childName">
              日期
            </div>
            <div class="group-list-item-childVal">
              <el-date-picker
                v-model="defVal"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="group-list-item-child">
            <div class="group-list-item-childName">
              序列
            </div>
            <div class="group-list-item-childVal">
              <el-input v-model="defval"></el-input>
            </div>
          </div>
          <div class="group-list-item-child">
            <div class="group-list-item-childName">
              浮点型
            </div>
            <div class="group-list-item-childVal">
              <el-input
                v-model="defval"
                placeholder="浮点型 例：3.14"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGroupList } from '../../../api/index.js'
export default {
  data() {
    return {
      options: [],
      options2: [
        {
          value: '1',
          label: '选项1',
        },
        {
          value: '2',
          label: '选项2',
        },
        {
          value: '3',
          label: '选项3',
        },
        {
          value: '4',
          label: '选项4',
        },
        {
          value: '5',
          label: '选项5',
        },
      ],
      defval: '',
      nodeCode: '',
      group: [],
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
    }
  },
  created() {
    const getLinkInfo = this.$route.query
    // console.log(getLinkInfo)
    this.nodeCode = getLinkInfo.nodeCode
    this.getGroupListFun()
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },

    getGroupListFun() {
      getGroupList({ nodeCode: this.nodeCode }).then((res) => {
        // console.log(res)
        res.forEach((item) => {
          if (item.layoutCss) {
            // console.log(JSON.parse(item.layoutCss))
            item.layoutCss = JSON.parse(item.layoutCss)
            item.layoutCss.splice(0, 1)
          }
        })
        console.log(res)
        this.group = res
      })
    },
  },
}
</script>

<style lang="less" scoped>
.group-tit {
  height: 32px;
  line-height: 32px;
}
.group-list {
  display: flex;
}
.group-list-item {
  flex: 1;
  margin: 0 5px;
  .group-list-item-child {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    .group-list-item-childName {
      width: 80px;
    }
    .group-list-item-childVal {
      flex: 1;
      /deep/ .el-select {
        width: 100%;
        margin-left: 0 !important;
      }
    }
  }
}
</style>
