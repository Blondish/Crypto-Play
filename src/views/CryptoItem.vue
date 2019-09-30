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
          <div v-if="cryptodata.data">{{cryptodata.data[id].name}}</div>
          <div v-if="cryptodata.data">{{cryptodata.data[id].symbol}}</div>
          <img v-if="cryptodata.data" v-bind:src="cryptodata.data[id].logo" />
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
          <div v-if="cryptodata.data">{{cryptodata.data[id].name}}</div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],

  data() {
    return {
      cryptodata: {},
      cryptoFromTable: {}
    };
  },
  methods: {
    getData() {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      axios
        .get(
          proxyurl +
            "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=" +
            this.id,
          {
            headers: {
              "X-CMC_PRO_API_KEY": "e1eb1f30-5c4e-43aa-be04-4b50df00807a"
            }
          }
        )
        .then(response => {
          console.log(response);
          this.cryptodata = response.data;
          console.log(this.cryptodata);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    cryptoInfo() {
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
          let info = response.data.data;
          this.cryptoFromTable = info.find(crypto => crypto.id == this.id);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
    this.cryptoInfo();
  }
};
</script>

<style scoped>
select {
  border: none;
}
</style>