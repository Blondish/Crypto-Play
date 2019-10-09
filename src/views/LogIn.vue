<template>
  <div>
    <v-container class="container">
      <h2>Please Log in to Chat</h2>
      <v-row sm-6 xs-12 justify="space-around" align="center">
        <v-col>
          <v-btn @click="login" v-show="logInVisible">Login</v-btn>
        </v-col>
      </v-row>

      <v-col>
        <v-btn @click="logOut" v-show="logOutVisible">LogOut</v-btn>
      </v-col>

      <div class="chatroom" v-chat-scroll="{always: false, smooth: true}">
        <div v-if="loading" id="spinner"></div>
        <div class="message" v-for="message in messages" :key="message.id">
          <v-col>
            <img :src="message.foto" alt="profile" width="25px" rounded />
            {{ message.name}} {{message.text}}
          </v-col>
        </div>
      </div>
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
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import VueChatScroll from "vue-chat-scroll";
import moment from "moment";
import { log } from "util";

export default {
  data() {
    return {
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      logged: false,
      message: "",
      messages: [],
      logInVisible: true,
      logOutVisible: false,
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          console.log(user);
          this.logged = true;
          this.logInVisible = false;
          this.logOutVisible = true;
          this.getMessages();
        })
        .catch(err => alert(err));
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(user => {
          this.logged = false;
          this.logInVisible = true;
          this.logOutVisible = false;
          this.messages = [];
          this.message = "";
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
          this.loading = false;
        });
    },

    sendMessage() {
      if (this.logged == false) {
        alert("You are not logged in");
      } else if (this.logged == true && this.message.length == 0) {
        alert("write your sessage");
        return;
      }
      console.log(firebase.auth().currentUser);
      let obj = {
        text: this.message,
        name: firebase.auth().currentUser.displayName,
        foto: firebase.auth().currentUser.photoURL
      };
      console.log(moment);
      firebase
        .database()
        .ref("chat")
        .push(obj);
      this.message = "";
    }
  }
};
</script>

<style scoped>
.container {
  margin: 10px auto;
}
input {
  margin: 10px;
  padding: 10px;
  border: 1px solid greenyellow;
}
img {
  border-radius: 50%;
}

.chatroom {
  height: 300px;
  width: auto;
  border: 1px solid none;
  padding: 10px 20px 5px 10px;
  overflow-y: auto;
}

.message {
  width: auto;
  border: 1px solid greenyellow;
  margin: auto;
  margin: 3px;
  list-style: none;
  padding: 10px;
}
/* SPINNER */
#spinner {
  visibility: visible;
  width: 80px;
  height: 80px;
  border: 2px solid #f3f3f3;
  border-top: 3px solid #f25a41;
  border-radius: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: spin 1s infinite linear;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>