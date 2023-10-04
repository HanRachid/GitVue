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
 * get the authenticated user's session code url to fetch. Used to check if user is authenticated.
 * @param clientId Github Oauth app client ID
 * @param clientSecret Github Oauth app client secret
 * @returns url used to fetch access token
 */
export function getSessionCodeUrl(clientId: string, clientSecret: string) {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get('code');
  if (codeParam) {
    const params =
      '?client_id=' +
      clientId +
      '&client_secret=' +
      clientSecret +
      '&code=' +
      codeParam;

    return 'https://github.com/login/oauth/access_token' + params;
  }
  return null;
}

/**
 * Creates new access token for current session
 * @returns new access token for logged user
 */
export async function getSession(url: string) {
  const getSession = await fetch(url);

  const sessionResponse = await getSession.text();
  const sessionToken = sessionResponse.split('&')[0].split('access_token=')[1];
  return sessionToken;
}

/**
 * Redirect user to Github OAuth, callback redirect is set in OAuth App settings
 * @param clientId Github OAuth app client ID
 */
export async function githubOauth(clientId: string) {
  window.location.assign(
    'https://github.com/login/oauth/authorize?client_id=' + clientId
  );
}

export async function logOut() {
  window.location.assign('/');
}

export var A = 132213;
