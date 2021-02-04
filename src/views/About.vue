<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <!-- 6666666666 -->
    <!-- {{ this.$store.state.name }} -->
    <!-- {{name}} -->
    <!-- <input type="text" v-model="name" />
    <div @click="name1">名字1</div>
    <div @click="name2">名字2</div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: null,
    };
  },
  created() {
    // console.log(this.$store);
    // this.$store.mutations.aaaa

    console.log(process.env.NODE_ENV);
    this.test();
  },
  mounted() {},
  methods: {
    test() {
      this.$get("/plm/rs/col/type/list")
        .then((response) => {
          console.log(response);
        })
        .catch(() => {
          console.log("erer");
        });
    },

    name1() {
      this.$store.commit("name1");
    },
    name2() {
      this.$store.commit({
        type: "name2",
        name: this.name,
      });
    },
  },
};
</script>

