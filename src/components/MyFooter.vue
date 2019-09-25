<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>This is my footer</p>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
