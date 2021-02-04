<template>
  <div class="hh-usinfo">
    <div class="hh-usinfo-box hh-usinfo-msg">
      <div class="msg-tips-spot"></div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-bell"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="clearfix">
            评论
            <el-badge class="mark" :value="12" />
          </el-dropdown-item>
          <el-dropdown-item class="clearfix">
            回复
            <el-badge class="mark" :value="3" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="hh-usinfo-box hh-usinfo-user">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-user"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="clearfix">
            评论
            <el-badge class="mark" :value="22" />
          </el-dropdown-item>
          <el-dropdown-item class="clearfix">
            回复
            <el-badge class="mark" :value="33" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.hh-usinfo {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .hh-usinfo-box {
    width: 36px;
    height: 36px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 5px 5px 10px #ccc;
    cursor: pointer;
    line-height: 36px;
    text-align: center;
    i {
      font-size: 20px;
    }
  }
  .hh-usinfo-msg {
    margin-right: 10px;

    position: relative;

    .msg-tips-spot {
      position: absolute;
      width: 5px;
      height: 5px;
      top: 0;
      right: 0;
      background: #f00;
      border-radius: 50%;
    }
  }
  .hh-usinfo-user {
    margin-right: 20px;
  }
}
</style>