<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- {{this.$store.state.name}} -->
    <h1>Home</h1>
    <h1>欢迎来到宏凰后台管理系统！</h1>
    <p>官网www.hhuangtech.com</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  created() {},
};
</script>
<style lang="less" scoped>
h1 {
  text-align: center;
  line-height: 80px;
}
p {
  text-align: center;
}
</style>
