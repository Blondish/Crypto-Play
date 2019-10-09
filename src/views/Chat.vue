<template>
  <div class="chat">
    <v-container class="container">
      <h2>Crypto Chatroom</h2>
      <v-row sm-6 xs-12 justify="space-around" align="center">
        <v-col>
          <v-btn raised @click="redirectToLog">Login</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>
            Would you like to connect to other traders of cryptocurrency?
            Have ideas or questions regarding mining of cryptos or architecture of the industry?
          </p>
          <p>Our secure chat gives you access to thousands of cryptolovers just like you!</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "chat",
  props: {
    msg: String
  },
  methods: {
    redirectToLog() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>
<style scoped>
h2 {
  margin-top: 50px;
  margin-bottom: 20px;
}
p {
  font-size: 1.2em;
}
</style>