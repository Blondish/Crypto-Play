<template>
  <div>
    <v-container class="container">
      <h1 class="font-italic font-weight-medium">Your Account</h1>
      <v-row sm-6 xs-12 justify="space-around" align="center">
        <v-col>
          <v-btn @click="login" v-show="!logged" class="elevation-5">Login</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="logged" xs-12 block>
        <v-col>
          Message
          <input v-model="message" type="text" placeholder="enter message" />
        </v-col>
      </v-row>
      <v-row xs-12>
        <v-col>
          <v-btn v-if="logged" @click="sendMessage" class="elevation-5" large>Send</v-btn>
        </v-col>
      </v-row>
      <v-col>
        <v-btn @click="logOut" v-if="logged" class="elevation-5">LogOut</v-btn>
      </v-col>

      <div v-if="logged" class="chatroom" v-chat-scroll="{always: false, smooth: true}">
        <div v-if="loading" id="spinner"></div>
        <div class="message" v-for="message in messages" :key="message.id">
          <v-col>
            <img :src="message.foto" alt="profile" width="25px" rounded />
            {{ message.name}} {{message.text}} {{ message.currentdate}}
          </v-col>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import VueChatScroll from "vue-chat-scroll";
import moment from "moment";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      //logged: false,
      message: "",
      messages: [],
      loading: false,
      currentdate: ""
    };
  },
  methods: {
    getDate() {
      var todaydate = new Date();
      var hours = todaydate.getHours();
      var minutes = todaydate.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      this.currentdate =
        todaydate.getMonth() +
        1 +
        "/" +
        todaydate.getDate() +
        "/" +
        todaydate.getFullYear() +
        "  " +
        strTime;

      // this.currentdate = todaydate.toString();
      // this.currentdate = this.currentdate.substring(0, 10);
      // console.log(todaydate.getHours());
      //this.todaydate.substring(0, 10);
    },
    login() {
      this.loading = true;
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          console.log(user);
          this.$store.commit("logged", true);
        })
        .catch(err => {
          alert(err);
          this.loading = false;
        });
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(user => {
          this.$store.commit("logged", false);
          this.messages = [];
          this.message = "";
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getMessages() {
      this.loading = true;
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
        this.message = "";
        return;
      } else if (this.logged == true && this.message.length == 0) {
        alert("write your message");
        return;
      }
      this.getDate();
      console.log(firebase.auth().currentUser);
      let obj = {
        text: this.message,
        name: firebase.auth().currentUser.displayName,
        foto: firebase.auth().currentUser.photoURL,
        currentdate: this.currentdate
      };
      firebase
        .database()
        .ref("chat")
        .push(obj);
      this.message = "";
    }
  },
  computed: {
    ...mapGetters(["logged"])
  },
  watch: {
    logged: function(value) {
      if (value) {
        this.getMessages();
      }
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
  border: 1px solid rgb(73, 78, 64);
  border-radius: 5%;
}
img {
  border-radius: 50%;
}

.chatroom {
  height: 300px;
  width: auto;
  border: 1px solid none;
  margin-top: 10px;
  padding: 10px 20px 5px 10px;
  overflow-y: auto;
}

.message {
  width: auto;
  border: 1px solid rgb(73, 78, 64);
  border-radius: 20px;
  margin: auto;
  margin: 3px;
  list-style: none;
  padding: 10px;
  word-break: break-all;
}
/* SPINNER */
#spinner {
  visibility: visible;
  width: 80px;
  height: 80px;
  border: 2px solid #f3f3f3;
  border-top: 3px solid #cffcfc;
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