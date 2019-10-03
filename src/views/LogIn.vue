<template>
  <div>
    <v-container class="container">
      <h3>Please Log in to Chat</h3>
      <v-row sm-6 xs-12 justify="space-around" align="center">
        <v-col>
          <v-btn @click="login">Login</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="logOut">LogOut</v-btn>
        </v-col>
      </v-row>
      <v-row xs-12 block>
        <v-col>
          Message
          <input v-model="message" type="text" placeholder="enter message" />
        </v-col>
      </v-row>
      <v-row xs-12>
        <v-col>
          <v-btn @click="sendMessage">Send</v-btn>
        </v-col>
      </v-row>
      <div v-bind="showError"></div>
      <v-row xs-12>
        <div v-for="message in messages" :key="message.id">
          <v-col>
            <img :src="message.foto" alt="profile" width="25px" rounded />
            {{ message.name}} {{message.text}}
          </v-col>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      logged: false,
      message: "",
      messages: []
    };
  },
  methods: {
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          console.log(user);
          this.logged = true;
          this.getMessages();
        })
        .catch(err => alert(err));
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          console.log("you logged out");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getMessages() {
      firebase
        .database()
        .ref("chat")
        .on("value", data => {
          this.messages = data.val();

          console.log(data);
          console.log(data.val());
        });
    },
    sendMessage() {
      if (this.logged == false) {
        alert("you are not logged in");
      }
      console.log(firebase.auth().currentUser);
      let obj = {
        text: this.message,
        name: firebase.auth().currentUser.displayName,
        foto: firebase.auth().currentUser.photoURL
      };
      firebase
        .database()
        .ref("chat")
        .push(obj);
    },
    showError() {}
  }
};
</script>

<style scoped>
.container {
  margin: 50px auto;
}
input {
  margin: 10px;
  padding: 10px;
  border: 1px solid greenyellow;
}
img {
  border-radius: 50%;
}
</style>