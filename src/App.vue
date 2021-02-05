<template>
  <div id="app">
    <NavList />
    <div class="container-right">
      <TopUser />
      <div class="hh-cont">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavList from "./views/Common/NavList";
import TopUser from "./views/Common/TopUser";
export default {
  components: {
    NavList,
    TopUser,
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
