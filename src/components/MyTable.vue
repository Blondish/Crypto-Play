<template>
  <div>
    <v-data-table
      :headers="headers"
      @click:row="getCrypto"
      :items="fixedDecimals"
      :items-per-page="10"
      :mobile-breakpoint="0"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyTable",

  data() {
    return {
      headers: [
        { text: "Rank", value: "cmc_rank" },
        {
          text: "Name",
          sortable: false,
          value: "name"
        },
        { text: "Symbol", value: "symbol", sortable: false },
        { text: "Price", value: "quote[USD][price]" },
        { text: "% Change", value: "quote[USD][percent_change_24h]" },

        { text: "Market Cap", value: "quote[USD][market_cap]", sortable: false }
      ],
      tabledata: []
    };
  },
  methods: {
    getCrypto(item) {
      console.log(item.id);
      this.$router.replace("/cryptoitem/" + item.id);
    },
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
          this.tabledata = response.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  computed: {
    fixedDecimals() {
      let newData = Array.from(this.tabledata);
      for (var i = 0; i < this.tabledata.length; i++) {
        newData[i].quote.USD.price = this.tabledata[i].quote.USD.price.toFixed(
          2
        );
        newData[i].quote.USD.percent_change_24h = this.tabledata[
          i
        ].quote.USD.percent_change_24h.toFixed(2);

        newData[i].quote.USD.market_cap =
          this.tabledata[i].quote.USD.market_cap.toString().slice(0, 3) + "B";
      }
      return newData;
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style>
</style>