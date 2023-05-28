import { Data } from "./github"

const githubMap = new Map();

Data.forEach(obj => {
  const githubHandle = obj.Github_handle;
  githubMap.set(githubHandle, obj);
});

export const checkUserGh = (username: string) => {
    return githubMap.get(username);
}