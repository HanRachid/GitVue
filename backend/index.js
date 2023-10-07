import express from 'express';
import {getAccessCode, getSession, getSessionCodeUrl} from './api/repositories';
import cors from 'cors';
const options = [
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
];

const app = express();
const port = process.env.VITE_CLIENT_PORT | 3000;
const clientId = process.env.VITE_CLIENT_ID;
const clientSecret = process.env.VITE_CLIENT_SECRET;

//redirect user to OAuth window
app.get('/Oauth', (req, res) => {
  res.redirect(
    'https://github.com/login/oauth/authorize?client_id=' + clientId
  );
});

// generates session token using clientId, secretId and session code
app.get('/session/:sessionCode', (req, res) => {
  const codeUrl = getSessionCodeUrl(
    clientId,
    clientSecret,
    req.params.sessionCode
  );

  getSession(codeUrl).then((result) => {
    res.send({token: result});
  });
});

app.get('/', (req, res) => {
  res.send('ezaeza World!');
});

app.get('/test', (req, res) => {
  res.send('WHY ISNT THIS WORKING ');
});

app.get('best', (req, res) => {
  res.send('WHY ISNT THIS WORKING ');
});

app.use(options);
//starting the app

app.listen(port, () => {
  console.log('listening on port ' + port);
});
