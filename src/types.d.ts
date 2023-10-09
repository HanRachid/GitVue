export interface Branch {
  commit: {sha: string; url: string};
  name: string;
}

export interface Repo {
  default_branch: string;
  id: number;
  name: string;
  full_name: string;
  commit:{
    message:string;
    author:{
      date:string
    }
  };
  url:string;
  author:{
    avatar_url:string
    date:string
  };
  message:string
}
