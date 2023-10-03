import {createApp} from 'vue';
import Home from './pages/Home.vue';
import App from './layouts/App.vue';
import './style.css';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [{path: '/', component: Home}];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);

app.mount('#app');
