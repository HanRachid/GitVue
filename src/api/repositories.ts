import {Octokit} from 'octokit';
import {reactive} from 'vue';
import {Branch, Repo} from '../types';
const url = import.meta.env.VITE_CLIENT_URL;
//creating centralized store to share repos through the whole app
export const store = reactive<{
  repos: Repo[];
  branches: Branch[];
  repo: Repo;
  logged: boolean;
  reponames: string[];
  selectedBranch: Branch;
  selectedCommits: Object[];
  accessCode: string | null;
}>({
  repos: [],
  branches: [],
  repo: {} as Repo,
  logged: false,
  reponames: [],
  selectedBranch: {} as Branch,
  selectedCommits: [],
  accessCode: getAccessCode(),
});

/**
 * Fetch all repos from user
 */
export async function fetchRepos(token: string): Promise<any> {
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

export function getAccessCode(): string | null {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get('code');

  return codeParam;
}

/**
 * get the authenticated user's session code url to fetch. Used to check if user is authenticated.
 */
export async function getSessionCodeUrl() {
  const codeParam = getAccessCode();

  if (codeParam) {
    const response = await fetch(url + '/session/' + codeParam);
    const token = await response.json();

    return token.token;
  }

  return null;
}

/**
 * Creates new access token for current session
 */
export async function getSession(url: string): Promise<string> {
  const getSession = await fetch(url);

  const sessionResponse = await getSession.text();
  const sessionToken = sessionResponse.split('&')[0].split('access_token=')[1];
  return sessionToken;
}

/**
 * Redirect user to Github OAuth, callback redirect is set in OAuth App settings
 */
export async function githubOauth() {
  window.location.assign(url + '/Oauth');
}
/**
 * Logs out user
 */
export function logOut(): void {
  store.logged = false;

  window.location.assign('/');
}

/**
 * Fetch using a crafted link
 */
export async function fetchFromLink(link: string): Promise<any> {
  const request = await fetch(link);

  const result = await request.json();

  return result;
}

/**
 * Fetch a branch from a repo
 */
export const fetchBranch = async (repo: any, sha: any): Promise<any> => {
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
export const fetchRepo = async (
  repo: any,
  default_branch?: string
): Promise<void> => {
  const url = 'https://api.github.com/repos/' + repo.full_name + '/branches';

  const res = await fetchFromLink(url);
  store.repo = repo;
  res.forEach((result: any) => {
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
