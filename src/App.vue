<template>
  <div id="app">
    <div class="container-left">
      <Nav />
    </div>

    <div class="container-right">
      <router-view />
    </div>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body,html{width:100%; height:100%}
#app {
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.container-left {
  width: 300px;
  height: 100%;
}
.container-right{
 flex: 1;
 height: 100%;
}
</style>
<script>
import Nav from "./views/Navlist";
export default {
  components: {
    Nav,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
