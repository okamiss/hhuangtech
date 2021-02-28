<template>
  <div>
    <div class="card-box">
      <el-table :data="listData" style="width: 100%">
        <el-table-column label="" width="500">
          <template slot-scope="scope">
            {{ scope.row.defaultDisplay }}
            <i class="el-icon-circle-plus-outline"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { GetCode } from '../../../api/index.js'
export default {
  data() {
    return {
      listData: [],
    }
  },
  created() {
    const getLinkInfo = this.$route.query
    console.log(getLinkInfo)
    this.extcolCode = getLinkInfo.extcolCode
    this.nodeCode = getLinkInfo.nodeCode
    this.interiorName = getLinkInfo.interiorName

    this.getCodeList()
  },
  methods: {
    // 查询已扩展的字段
    getCodeList() {
      GetCode({ nodeCode: this.nodeCode, colType: 'chain', status: '' }).then(
        (res) => {
          console.log(res)
          this.listData = res
        }
      )
    },
  },
}
</script>

<style></style>
