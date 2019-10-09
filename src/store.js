import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  cryptodata: [],
  singleCrypto: {},
  search: ""
};

const getters = {
  allCryptos: state => {
    console.log(state.search);

    return state.cryptodata;
  },
  singleCrypto: state => state.singleCrypto,
  addToSearch: state => payload => {
    console.log(payload);

    if (payload != "") {
      return state.cryptodata.filter(item => {
        return item.name.toLowerCase().includes(payload.toLowerCase());
      });
    }
  },
  getSearch: state => state.search
};
const actions = {
  getData({ commit }) {
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
        commit("setCryptos", response.data.data);
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  getSingleCrypto({ commit }, id) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios
      .get(
        proxyurl +
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=" +
          id,
        {
          headers: {
            "X-CMC_PRO_API_KEY": "e1eb1f30-5c4e-43aa-be04-4b50df00807a"
          }
        }
      )
      .then(response => {
        console.log(response);
        commit("setSingleCrypto", response.data.data);
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  searchedCrypto({ commit }, payload) {
    commit("search", payload);
  }
};
const mutations = {
  setCryptos: (state, payload) => (state.cryptodata = payload),
  setSingleCrypto: (state, payload) => (state.singleCrypto = payload),
  search: (state, payload) => (state.search = payload)
};

export default new Vuex.Store({
  state,

  actions,

  getters,

  mutations
});
