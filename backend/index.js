import process from 'node:process';
import express from 'express';
import cors from 'cors';
import {getSession, getSessionCodeUrl} from './api/repositories.js';

const options = [
	cors({
		origin: '*',
		methods: '*',
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	}),
];

const app = express();
const port = process.env.VITE_CLIENT_PORT ? process.env.VITE_CLIENT_PORT : 3000;
const clientId = process.env.VITE_CLIENT_ID;
const clientSecret = process.env.VITE_CLIENT_SECRET;

// Redirect user to OAuth window
app.get('/Oauth', (request, response) => {
	response.redirect(
		'https://github.com/login/oauth/authorize?client_id=' + clientId,
	);
});

// Generates session token using clientId, secretId and session code
app.get('/session/:sessionCode', (request, response) => {
	const codeUrl = getSessionCodeUrl(
		clientId,
		clientSecret,
		request.params.sessionCode,
	);

	getSession(codeUrl).then(result => {
		response.send({token: result});
	});
});

app.use(options);
// Starting the app

app.listen(port, () => {
	console.log('listening on port ' + port);
});

const allowCors = fn => async (request, response) => {
	response.setHeader('Access-Control-Allow-Credentials', true);

	response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
	response.setHeader(
		'Access-Control-Allow-Methods',
		'GET,OPTIONS,PATCH,DELETE,POST,PUT',
	);
	response.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
	);
	if (request.method === 'OPTIONS') {
		response.status(200).end();
		return;
	}

	return fn(request, response);
};

app.use(allowCors);
