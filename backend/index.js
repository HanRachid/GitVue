import express from 'express';
import {getAccessCode, getSession, getSessionCodeUrl} from './api/repositories';

const app = express();
const port = 3000;
const clientId = process.env.VITE_CLIENT_ID;
const clientSecret = process.env.VITE_CLIENT_SECRET;
//Route for token generation
app.get('/user/repos', (req, res) => {
  console.log('someone trynna access 3000');
});

app.get('/session/:sessionCode', (req, res) => {
  const codeUrl = getSessionCodeUrl(
    clientId,
    clientSecret,
    req.params.sessionCode
  );
  console.log('REQ PARAMS');
  console.log(req.params.sessionCode);
  console.log('CODE URL');

  console.log(codeUrl);
  getSession(codeUrl).then((result) => {
    res.send({token: result});
  });
});

//starting the app
app.listen(port, () => {
  console.log('listening on port' + port);
});

app.get('/Oauth', (req, res) => {
  console.log(clientId);
  res.redirect(
    'https://github.com/login/oauth/authorize?client_id=' + clientId
  );
});
