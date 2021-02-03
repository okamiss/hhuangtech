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
    // this.getFilmList();
    console.log(process.env.NODE_ENV);
    this.test();
    this.$cookies.config("1d");
    this.$cookies.set("jeesite.session.id", "726267242ce14b9fa64f6a4c5b48eec3");
    this.$cookies.set(
      "rememberMe",
      "FD8tB14tVwhm7NAb3J8IZUNCLnPAmCRUX1la5O4TM/vyysbqNg6HMhuBqK9zl+tfyEze1sFls5PcViha2CYOlFl4bOh/mlp56ZN5vQZOnbELr6ibx6CpfDZP481HIa3Tal1ZKRpU6TZW1b2JHIAzwuS16gwCwZ8tg6gsV7DdbyL2ojB1mHzfShsH7LbduIQIzfHrrOENqIcTuTlrb1RUwnHzoAj6VVqzCD6y+LrcdNy1dVIdnDDPiAad9jcYATx7HEH70Lp7HGYm+brrTyPvQjhjOWQUJKqE5RZpdLH6oeJQ/EUJEKz2QBP73bu4RYzOZ5krEx1a3jajFdZGZvuivALiwj41nmxLkP+yCBDNbk0a7LmWCJC4UoGv6S4GDiovQ7WCA4TnN/Zu8ihFPGtGbpYXommxic/dLmXfgBVo3XSxcmpHxNwepEAzOlya3uoiE+iII8vQEQNeg4mgIkkSqhdDJo4BKlcOaakJJZbfb8tHKXu9Iog1jc/WIkEL12NdtdfeqtSsUyNwSMHptyc8viQ+L4cDII+6n54eG9t2uys/AElwESTWv2vANib0pvqvbvINLHkNgtGFBXmQcgTLrCwZe0qt2MyHLIw1HAvFD/iWhlJaNxe3rLTyHxne8DIQNwFCa/yNzXFsoiS5Olxg9AklNh9ddz6bK+H9Swi6MuNtxc0IeVEFeyYF6QonCM5xmtEVlwmbn4moNMtXMFGRymaO4qjtwNHGfvQlP4vQuHATSdAlNBONHsNl+cBNOIsbVgS28CWf+1imSCaZW0nrtNzWp8ARBic4LdSIpanu7VxKbvqs6NE5CdKqDp7oi23KMwnNGjXIw+LHww=="
    );
    this.$cookies.set("rememberUserCode", "system");
  },
  mounted() {},
  methods: {
    test() {
      this.$get("/rs/col/type/list")
        .then((response) => {
          console.log(response);
        })
        .catch(() => {
          console.log("erer");
        });
    },
    // async getFilmList() {
    //   const url = "/rs/col/type/list";
    //   // 要访问第二页的话在网址后面加 ?type=2&pageNum=页数
    //   const res = await this.$http.get(url);
    //   // this.filmList = res.films;
    // },

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

