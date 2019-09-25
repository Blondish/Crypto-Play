<template>
  <div>
    <v-data-table :headers="headers" :items="tabledata" :items-per-page="10" class="elevation-1"></v-data-table>
    <CryptoItem />
  </div>
</template>

<script>
import CryptoItem from "@/components/CryptoItem.vue";

export default {
  name: "MyTable",
  components: { CryptoItem },
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "center",
          sortable: false,
          value: "name"
        },
        { text: "Symbol", value: "symbol" },
        { text: "Price", value: "quote[USD][price]" },
        { text: "% Change", value: "quote[USD][percent_change_24h]" },
        { text: "Supply", value: "max_supply" },
        { text: "Market Cap", value: "quote[USD][market_cap]" }
      ],
      tabledata: [
        {
          id: 1,
          name: "Bitcoin",
          symbol: "BTC",
          slug: "bitcoin",
          num_market_pairs: 8051,
          date_added: "2013-04-28T00:00:00.000Z",
          tags: ["mineable"],
          max_supply: 21000000,
          circulating_supply: 17943062,
          total_supply: 17943062,
          platform: null,
          cmc_rank: 1,
          last_updated: "2019-09-18T13:20:34.000Z",
          quote: {
            USD: {
              price: 10238.5773417,
              volume_24h: 16454219061.202,
              percent_change_1h: 0.301334,
              percent_change_24h: -0.0195354,
              percent_change_7d: 1.53376,
              market_cap: 183711428033.91827,
              last_updated: "2019-09-18T13:20:34.000Z"
            }
          }
        }
      ]
    };
  }
};
</script>

<style>
</style>