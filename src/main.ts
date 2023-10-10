import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
// App Import
import App from './layouts/App.vue';
// Pages Imports
import HomePage from './pages/HomePage.vue';
import RepoPage from './pages/RepoPage.vue';
import WelcomePage from './pages/WelcomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import './style.css';

export const baseUrl = '/rachid_handaoui-taas-frontend-challenge';
const routes = [
	{
		path: baseUrl + '/:user',
		component: HomePage,
		name: 'Home',
	},
	{
		path: baseUrl + '/index',
		component: WelcomePage,
		name: 'Welcome',
		alias: baseUrl,
	},
	{
		path: baseUrl + '/login',
		component: LoginPage,
		name: 'Login',
	},
	{
		path: baseUrl + '/:user/repo/:repoId',
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
