import express from 'express';
import {getAccessCode, getSession, getSessionCodeUrl} from './api/repositories';

const app = express();
var cors = require('cors');
const port = process.env.VITE_CLIENT_PORT | 3000;
const clientId = process.env.VITE_CLIENT_ID;
const clientSecret = process.env.VITE_CLIENT_SECRET;
app.use(cors());

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

//starting the app
app.listen(port, () => {
  console.log('listening on port ' + port);
});
