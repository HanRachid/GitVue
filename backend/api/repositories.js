import {Octokit} from 'octokit';

const clientId = process.env.VITE_CLIENT_ID;
const clientSecret = process.env.VITE_CLIENT_SECRET;
const env = require('dotenv').config();
/**
 * Fetch all repos from user
 */
export async function fetchRepos(token) {
  const octokit = new Octokit({
    auth: token,
  });
  const res = await octokit.request('GET /user/repos', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  return res.data;
}

/**
 *
 * Get access code
 *
 */
export function getAccessCode() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get('code');

  return codeParam;
}

/**
 * get the authenticated user's session code url to fetch. Used to check if user is authenticated.
 */
export function getSessionCodeUrl(clientId, clientSecret, accessCode) {
  if (accessCode) {
    const params =
      '?client_id=' +
      clientId +
      '&client_secret=' +
      clientSecret +
      '&code=' +
      accessCode;

    return 'https://github.com/login/oauth/access_token' + params;
  }
  return null;
}

/**
 * Creates new access token for current session
 */
export async function getSession(url) {
  const getSession = await fetch(url);

  const sessionResponse = await getSession.text();
  console.log('SESSION RESPONSE');
  console.log(sessionResponse);
  const sessionToken = sessionResponse.split('&')[0].split('access_token=')[1];
  return sessionToken;
}

/**
 * Redirect user to Github OAuth, callback redirect is set in OAuth App settings
 */
export async function githubOauth(clientId) {
  window.location.assign(
    'https://github.com/login/oauth/authorize?client_id=' + clientId
  );
}
/**
 * Logs out user
 */

/**
 * Fetch using a crafted link
 */
export async function fetchFromLink(link) {
  const request = await fetch(link);

  const result = await request.json();

  return result;
}

/**
 * Fetch a branch from a repo
 */
export const fetchBranch = async (repo, sha) => {
  const url =
    'https://api.github.com/repos/' + repo.full_name + '/commits?sha=' + sha;
  const res = await fetchFromLink(url);
  return res;
};

/**
 * fetch repo and show default branch
 * @param repo repo to fetch
 * @param default_branch the repo's default branch, used to show the branch first
 */
export const fetchRepo = async (repo, default_branch) => {
  const url = 'https://api.github.com/repos/' + repo.full_name + '/branches';

  const res = await fetchFromLink(url);
  store.repo = repo;
  res.forEach((result) => {
    if (result.name === default_branch) {
      store.selectedBranch = result;
    }
  });
  if (default_branch) {
    fetchBranch(store.repo, store.selectedBranch.commit.sha).then((result) => {
      store.selectedCommits = result;
    });
  }

  store.branches = res;
};
