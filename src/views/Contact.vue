<template>
  <div class="contact">
    <v-content v-show="hideOnSubmit">
      <h1>Get In Touch</h1>

      <v-form ref="form" lazy-validation>
        <v-text-field v-model="name" :counter="20" :rules="nameRules" label="Name" required></v-text-field>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-text-field label="Question" required></v-text-field>

        <v-checkbox label="Would you like to receive our newsletter?"></v-checkbox>

        <v-btn @click="ReverseView" color="warning">Submit</v-btn>
      </v-form>
    </v-content>
    <span v-show="ThankyouMsg">
      <h2>Thank you for your Input</h2>
      <h3>We will respond to your query withing 48 hours</h3>
    </span>
  </div>
</template>

<script>
export default {
  name: "contact",

  data() {
    return {
      hideOnSubmit: true,
      ThankyouMsg: false
    };
  },
  methods: {
    ReverseView() {
      (this.hideOnSubmit = false), (this.ThankyouMsg = true);
    }
  }
};
</script>

<style scoped>
.contact {
  margin: 20px;
}
div.contact {
  margin: 50px 20px;
}
</style>