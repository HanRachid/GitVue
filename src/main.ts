import { createApp } from "vue";
import Home from "./pages/Home.vue";
import Repo from "./pages/Repo.vue";
import App from "./layouts/App.vue";
import "./style.css";
import { createRouter, createWebHistory } from "vue-router";
import Welcome from "./pages/Welcome.vue";
import Login from "./pages/Login.vue";
const url = import.meta.env.BASE_URL ? import.meta.env.BASE_URL : "/";

const routes = [
  {
    path: url + "/:accessCode",
    component: Home,
    name: "Home",
  },
  {
    path: url + "/index",
    component: Welcome,
    name: "Welcome",
    alias: url + "/",
  },
  {
    path: url + "/login",
    component: Login,
    name: "Login",
  },
  {
    path: url + "/repo/:accessCode/repo/:repoId",
    name: "Repo",
    component: Repo,
    prop: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
