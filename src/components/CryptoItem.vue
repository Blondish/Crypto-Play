<template></template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      myarr: []
    };
  },
  methods: {
    getData() {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      axios
        .get(
          proxyurl +
            "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
          {
            headers: {
              "X-CMC_PRO_API_KEY": "e1eb1f30-5c4e-43aa-be04-4b50df00807a"
            }
          }
        )
        .then(response => {
          console.log(response);
          this.myarr = response.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
</style>