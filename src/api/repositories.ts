import {Octokit} from 'octokit';
import {reactive} from 'vue';

//creating centralized store to share repos through the whole app
export const store = reactive<any>({
  repos: [],
  branches: [],
  repo: {},
  logged: false,
  reponames: [],
  selectedBranch: '',
  selectedCommits: [],
});

/**
 * Fetch all repos from user
 * @param token generated session token
 * @returns all github repos data from user
 */
export async function fetchRepos(token: string) {
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

export function getAccessCode() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get('code');

  return codeParam;
}

/**
 * get the authenticated user's session code url to fetch. Used to check if user is authenticated.
 * @param clientId Github Oauth app client ID
 * @param clientSecret Github Oauth app client secret
 * @returns url used to fetch access token
 */
export function getSessionCodeUrl(clientId: string, clientSecret: string) {
  const codeParam = getAccessCode();
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
/**
 * Logs out user
 */
export async function logOut() {
  store.logged = false;

  window.location.assign('/');
}

export async function fetchFromLink(link: string) {
  const request = await fetch(link);

  const result = await request.json();

  return result;
}

export const fetchBranch = async (repo: any, sha: any) => {
  const url =
    'https://api.github.com/repos/' + repo.full_name + '/commits?sha=' + sha;
  const res = await fetchFromLink(url);
  return res;
};

export const fetchRepo = async (repo: any) => {
  const url = 'https://api.github.com/repos/' + repo.full_name + '/branches';

  const res = await fetchFromLink(url);
  store.repo = repo;
  store.selectedBranch = res[0];
  fetchBranch(store.repo, store.selectedBranch.commit.sha).then((result) => {
    store.selectedCommits = result;
  });
  store.branches = res;
};
