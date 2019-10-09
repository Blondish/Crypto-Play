<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-col xs-2>
          <router-link to="/" tag="button">
            <v-btn outlined>
              <v-icon>mdi-backspace</v-icon>
            </v-btn>
          </router-link>
        </v-col>
        <v-col xs-8>
          <div class="title" v-if="singleCrypto[id]">{{singleCrypto[id].name}}</div>
          <div class="title" v-if="singleCrypto[id]">{{singleCrypto[id].symbol}}</div>
          <img v-if="singleCrypto[id]" v-bind:src="singleCrypto[id].logo" />
        </v-col>
        <v-col xs-2>
          <v-btn outlined>
            <select class="button">
              <option value="USD">USD</option>
              <option value="CAD">CAD</option>
              <option value="EUR">EUR</option>
              <option value="DASP">DASP</option>
            </select>
          </v-btn>
        </v-col>
      </v-layout>

      <v-row>
        <v-col xs-12>
          <div
            class="font-weight-bold"
            v-if="cryptoFromTable.quote"
          >$ {{ cryptoFromTable.quote.USD.price }}</div>
        </v-col>
      </v-row>
      <MyChart
        v-if="singleCrypto[id] && cryptoFromTable.quote"
        :singleCrypto="singleCrypto"
        :id="id"
        :cryptoFromTable="cryptoFromTable"
      />

      <v-row>
        <v-col xs-12>
          <div v-if="singleCrypto[id]">{{singleCrypto[id].description}}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h4>
            For more information on
            <span v-if="singleCrypto[id]">{{singleCrypto[id].name}}</span> please refer to below links
          </h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs-4>
          <a
            v-if="singleCrypto[id]"
            v-bind:href="singleCrypto[id].urls.website"
            target="_blank"
          >Website</a>
        </v-col>
        <v-col xs-4>
          <a
            v-if="singleCrypto[id]"
            v-bind:href="singleCrypto[id].urls.reddit"
            target="_blank"
          >Reddit Page</a>
        </v-col>
        <v-col xs-4>
          <a
            v-if="singleCrypto[id]"
            v-bind:href="singleCrypto[id].urls.twitter"
            target="_blank"
          >Twitter Page</a>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
//import axios from "axios";
import MyChart from "./MyChart";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["id"],
  components: { MyChart },

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["singleCrypto", "allCryptos"]),
    cryptoFromTable() {
      return this.allCryptos.find(crypto => crypto.id == this.id);
    }
  },
  methods: {
    ...mapActions(["getSingleCrypto"])
    // getData() {
    //   const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //   axios
    //     .get(
    //       proxyurl +
    //         "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=" +
    //         this.id,
    //       {
    //         headers: {
    //           "X-CMC_PRO_API_KEY": "e1eb1f30-5c4e-43aa-be04-4b50df00807a"
    //         }
    //       }
    //     )
    //     .then(response => {
    //       console.log(response);
    //       this.cryptodata = response.data;
    //       console.log(this.cryptodata);
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    // }

    // cryptoInfo() {
    //   const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //   axios
    //     .get(
    //       proxyurl +
    //         "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    //       {
    //         headers: {
    //           "X-CMC_PRO_API_KEY": "e1eb1f30-5c4e-43aa-be04-4b50df00807a"
    //         }
    //       }
    //     )
    //     .then(response => {
    //       console.log(response);
    //       let info = response.data.data;
    //       this.cryptoFromTable = info.find(crypto => crypto.id == this.id);
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    // }
  },
  created() {
    this.getSingleCrypto(this.id);
  }
};
</script>

<style scoped>
select {
  border: none;
}
a {
  text-decoration: none;
  color: red;
}
</style>