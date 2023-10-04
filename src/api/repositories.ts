import {Octokit} from 'octokit';

export async function fetchBranch(token: string) {
  const octokit = new Octokit({
    auth: token,
  });
  const res = await octokit.request('GET /user/repos', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  const repos: string[] = [];
  res.data.forEach((repo) => {
    repos.push(repo.name);
  });
  console.log(repos);

  return repos;
}

/**
 * Creates new access token for current session
 * @param clientId Github Oauth client ID
 * @param clientSecret Github Oauth client secret
 * @returns new access token for logged user
 */
export async function getSession(clientId: string, clientSecret: string) {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get('code');

  const method = {
    method: 'POST',
  };
  const params =
    '?client_id=' +
    clientId +
    '&client_secret=' +
    clientSecret +
    '&code=' +
    codeParam;
  console.log('https://github.com/login/oauth/access_token' + params);

  const getSession = await fetch(
    'https://github.com/login/oauth/access_token' + params
  );

  const sessionResponse = await getSession.text();
  const sessionToken = sessionResponse.split('&')[0].split('access_token=')[1];
  return sessionToken;
}

export async function githubOauth(clientId: string) {
  window.location.assign(
    'https://github.com/login/oauth/authorize?client_id=' + clientId
  );
}

export async function logOut() {
  console.log(localStorage);
}

export var A = 132213;
