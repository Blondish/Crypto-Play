<template>
  <div class="contact">
    <h1>Get In Touch</h1>
    <v-content>
      <v-form ref="form" lazy-validation>
        <v-text-field :counter="10" label="Name" required></v-text-field>

        <v-text-field label="E-mail" required></v-text-field>

        <v-text-field label="Question"></v-text-field>

        <v-checkbox
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Would you like to receive our newsletter?"
        ></v-checkbox>

        <v-btn color="warning">Submit</v-btn>
      </v-form>
    </v-content>
  </div>
</template>

<script>
export default {
  name: "contact",
  props: {
    msg: String
  }
};
</script>

<style scoped>
.contact {
  margin: 20px;
}
</style>