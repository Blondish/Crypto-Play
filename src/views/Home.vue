<template>
  <div class="home">
    <div class="search">
      <input id="search" type="search" required v-model="keyword" />
      <label class="label-icon" for="search"></label>
      <v-icon left>mdi-magnify</v-icon>
    </div>
    <h2>Top Ranked Cryptos</h2>
    <MyTable />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MyTable from "@/components/MyTable.vue";

export default {
  data() {
    return {
      keyword: ""
    };
  },
  watch: {
    keyword: function() {
      console.log("searchInput changed to " + this.keyword);
      this.$store.dispatch("searchedCrypto", this.keyword);
    }
  },

  computed: {
    ...mapGetters(["allCryptos", "addToSearch", "getSearch"]),
    getCryptos() {
      return this.addToSearch(this.keyword);
    }
  },
  // fiteredCrypto() {
  //   return this.allCryptos.filter(crypto =>
  //     crypto.name.toUpperCase().includes(this.searchInput.toUpperCase())
  //   );
  // },
  methods: {
    ...mapActions(["getData", "searchedCrypto"]),
    search() {
      this.$store.dispatch("searchedCrypto", this.keyword);
    }
  },
  components: { MyTable },

  created() {
    this.getData();
    this.keyword = this.getSearch;
  }
};
</script>

<style scoped>
.search {
  width: 30%;
  padding: 2px 10px;
  margin: 20px auto 10px;
}
h2 {
  margin: 10px 0;
}
.home {
  background: url("/assets/photo-1518483239595-6f1f9e80b7c7.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 400px;
  width: auto;
}
</style>