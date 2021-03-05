<template>
  <div>
    <div class="card-box" v-for="item in group" :key="item.id">
      <div class="group-tit">{{ item.defaultDisplay }}</div>
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
              {{ item3.defaultDisplay }} ---{{ item3.colType }}
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
    </div>
  </div>
</template>

<script>
import { getGroupList } from '../../../api/index.js'
export default {
  data() {
    return {
      options: [],
      defval: '',
      nodeCode: '',
      group: [],
    }
  },
  created() {
    const getLinkInfo = this.$route.query
    // console.log(getLinkInfo)
    this.nodeCode = getLinkInfo.nodeCode
    this.getGroupListFun()
  },
  methods: {
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
  .group-list-item-child {
    width: 100%;
    display: flex;
    .group-list-item-childName {
      width: 80px;
    }
    .group-list-item-childVal {
      flex: 1;
    }
  }
}
</style>
