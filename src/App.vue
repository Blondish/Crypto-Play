<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <MyFooter />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import MyFooter from "@/components/MyFooter";

export default {
  name: "App",
  components: { Navbar, MyFooter },
  data: () => ({})
};
</script>

<style>
#app {
  text-align: center;
}
</style>
