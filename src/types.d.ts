export type Branch = {
	commit: {sha: string; url: string};
	name: string;
};

export type Repo = {
	default_branch: string;
	id: number;
	name: string;
	full_name: string;
	commit: {
		message: string;
		author: {
			date: string;
		};
	};
	url: string;
	author: {
		avatar_url: string;
		date: string;
	};
	message: string;
};

export type User = {
	login: string;
	avatar_url: string;
};
