import {createApp} from 'vue';
import HomePage from './pages/HomePage.vue';
import RepoPage from './pages/RepoPage.vue';
import App from './layouts/App.vue';
import WelcomePage from './pages/WelcomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import './style.css';
import {createRouter, createWebHistory} from 'vue-router';


const routes = [
  {
    path: '/:accessCode',
    component: HomePage,
    name: 'Home',
  },
  {
    path: '/index',
    component: WelcomePage,
    name: 'Welcome',
    alias: '/',
  },
  {
    path: '/login',
    component: LoginPage,
    name: 'Login',
  },
  {
    path: '/repo/:accessCode/repo/:repoId',
    name: 'Repo',
    component: RepoPage,
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
