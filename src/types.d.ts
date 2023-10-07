export interface Branch {
  commit: {sha: string; url: string};
  name: string;
}

export interface Repo {
  default_branch: string;
  id: number;
  name: string;
  full_name: string;
}
