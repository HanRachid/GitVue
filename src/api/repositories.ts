import {client} from '@tilework/opus';
import {Octokit} from 'octokit';

const octokit = new Octokit({
  /* auth: token, */
});

// fetches using user Oauth token

// /user for current logged user
// /user/repos for current user repos
export async function fetchBranch() {
  const res = await octokit.request('GET /user/repos', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  const repos: string[] = [];
  res.data.forEach((repo) => {
    repos.push(repo.name);
  });

  return repos;
}

export async function githubOauth(clientId: string) {
  window.location.assign(
    'https://github.com/login/oauth/authorize?client_id=' + clientId
  );
}

export async function logOut() {
  console.log(localStorage);

  localStorage.removeItem('accessToken');
}

export var A = 132213;
