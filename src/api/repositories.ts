import {Octokit} from 'octokit';
import {reactive} from 'vue';
import {User, type Branch, type Repo} from '../types';

const url = 'https://rachid-handaoui-taas-frontend-challenge-2q61.vercel.app';

// Creating centralized store to share repos through the whole app

export const store = reactive<{
	repos: Repo[];
	branches: Branch[];
	repo: Repo | undefined;
	logged: boolean;
	reponames: string[];
	selectedBranch: Branch | undefined;
	selectedCommits: Repo[];
	accessCode: string | undefined;
	user: User | undefined
}>({
	repos: [],
	branches: [],
	repo: undefined,
	logged: false,
	reponames: [],
	selectedBranch: undefined,
	selectedCommits: [],
	accessCode: getAccessCode(),
	user: undefined,
});

/**
 * Fetch all repos from user
 */
export async function fetchRepos(token: string, path:string): Promise<Array<Record<string, unknown>>> {
	const octokit = new Octokit({
		auth: token,
	});
	const result = await octokit.request('GET /user' + path, {
		headers: {
			'X-GitHub-Api-Version': '2022-11-28',
		},
	});

	return result.data;
}

/**
 *
 * Get access code
 *
 */

export function getAccessCode(): string | undefined {
	const queryString = window.location.search;

	const urlParameters = new URLSearchParams(queryString);
	const codeParameter = urlParameters.get('code') as string | undefined;

	return codeParameter;
}

/**
 * Get the authenticated user's session code url to fetch. Used to check if user is authenticated.
 */
export async function getSessionCodeUrl() {
	const codeParameter = getAccessCode();

	if (codeParameter) {
		const response = await fetch(url + '/session/' + codeParameter);
		const token:{token:string} = await response.json();

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
export async function fetchFromLink(link: string): Promise<Array<Record<string, unknown>>> {
	const request = await fetch(link);

	const result = await request.json();

	return result;
}

/**
 * Fetch a branch from a repo
 */
export const fetchBranch = async (repo: Repo, sha: string): Promise<Array<Record<string, unknown>>> => {
	const url
    = 'https://api.github.com/repos/' + repo.full_name + '/commits?sha=' + sha;
	const res = await fetchFromLink(url);
	return res;
};

/**
 * Fetch repo and show default branch
 */
export const fetchRepo = async (
	repo: Repo,
	defaultBranch?: string,
): Promise<void> => {
	const url = 'https://api.github.com/repos/' + repo.full_name + '/branches';

	const res = await fetchFromLink(url);
	store.repo = repo;
	res.forEach((result: Record<string, unknown>) => {
		const res = result as Branch;
		if (res.name === defaultBranch) {
			store.selectedBranch = res;
		}
	});
	if (defaultBranch) {
		fetchBranch(store.repo, store.selectedBranch!.commit.sha).then((result: Array<Record<string, unknown>>) => {
			store.selectedCommits = result as unknown as Repo[];
		});
	}

	store.branches = res as Branch[];
};
