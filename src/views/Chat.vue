<template>
  <div class="chat">
    <v-container class="container">
      <h2>Please Log in to Chat</h2>
      <v-row sm-6 xs-12 justify="space-around" align="center">
        <v-col>
          <v-btn raised @click="redirectToLog">Login</v-btn>
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
  margin-bottom: 50px;
}
</style>