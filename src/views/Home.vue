<template>
  <div class="home">
    <div class="search">
      <v-btn block centered type="text">
        <v-icon left>mdi-magnify</v-icon>
      </v-btn>
    </div>

    <h2>Top Ranked Cryptos</h2>
    <MyTable />
  </div>
</template>

<script>
import MyTable from "@/components/MyTable.vue";
export default {
  components: { MyTable }
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
</style>