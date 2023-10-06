import {createApp} from 'vue';
import Home from './pages/Home.vue';
import Repo from './pages/Repo.vue';
import App from './layouts/App.vue';
import './style.css';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {path: '/', component: Home},
  {
    path: '/?code=:accessCode/repo/:repoId',
    name: 'Repo',
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

app.mount('#app');
