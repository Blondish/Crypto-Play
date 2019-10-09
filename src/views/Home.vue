<template>
  <div class="home">
    <div>
      <v-icon left>mdi-magnify</v-icon>
      <input id="search" type="search" required v-model="keyword" />
      <label class="label-icon" for="search"></label>
    </div>
    <h2>Top Ranked Cryptos</h2>
    <div v-if="loading" id="spinner"></div>
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
    ...mapGetters(["allCryptos", "addToSearch", "getSearch", "loading"]),
    getCryptos() {
      return this.addToSearch(this.keyword);
    }
  },

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
#search {
  border: 1px solid greenyellow;
  width: 40%;
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
/* SPINNER */
#spinner {
  visibility: visible;
  width: 80px;
  height: 80px;
  border: 2px solid #f3f3f3;
  border-top: 3px solid #f25a41;
  border-radius: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: spin 1s infinite linear;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>