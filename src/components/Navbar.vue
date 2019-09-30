<template>
  <div>
    <v-app-bar app light class="green lighten-4">
      <v-toolbar-title>
        <router-link :to="titlelink.route">
          <div>
            <img class="logo" src="../assets/cryptologo.png" alt="cryptologo" srcset />
          </div>
        </router-link>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items v-for="link in links" :key="link.text">
        <v-btn :to="link.route" text>{{link.text}}</v-btn>
      </v-toolbar-items>
      <div class="flex-grow-1"></div>
      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
        <router-link :to="loginlink.route" tag="v-btn">
          <v-btn icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </router-link>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      titlelink: { text: "CryptoPlay", route: "/" },
      loginlink: { route: "/login" },
      links: [
        { text: "About", route: "/about" },
        { text: "Research", route: "/research" },
        { text: "Contact", route: "/contact" }
      ]
    };
  }
};
</script>


<style scoped>
img {
  width: 100px;
  height: 50px;
}
</style>