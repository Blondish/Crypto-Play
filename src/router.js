import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Research from "./views/Research.vue";
import Contact from "./views/Contact.vue";
import LogIn from "./views/LogIn.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/research",
      name: "research",
      component: Research
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact
    },
    {
      path: "/login",
      name: "login",
      component: LogIn
    }
  ]
});
