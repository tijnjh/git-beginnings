import { effetch, tryCatch } from "tsuite";

const base_url = "https://api.github.com";

export class GithubPage {
  owner: string;
  repo: string;
  branch: string;

  constructor(owner: string, repo: string, branch: string = "main") {
    this.owner = owner;
    this.repo = repo;
    this.branch = branch;
  }

  async getLatestSha() {
    const url = `${base_url}/repos/${this.owner}/${this.repo}/commits`;
    const commits = await effetch<any[]>(url);
    return commits[0].sha as string;
  }

  async getCommitCount() {
    const url = `${base_url}/repos/${this.owner}/${this.repo}/commits?sha=${this.branch}&per_page=1&page=1`;

    const [response, fetchErr] = await tryCatch(fetch(url));

    if (fetchErr) {
      throw new Error(`Failed to fetch: ${fetchErr}`);
    }

    const lastPageMatch = String(response?.headers.get("link"))?.match(
      /page=(\d+)>; rel="last"/,
    );

    let lastPage = null;

    if (lastPageMatch && lastPageMatch[1]) {
      const [res, err] = tryCatch(() => parseInt(lastPageMatch[1], 10));

      if (err) {
        throw new Error(`Failed to parse: ${err}`);
      }

      lastPage = res;
    }

    return lastPage!;
  }

  async getCommitByPageNumber(page: number) {
    const url = `${base_url}/repos/${this.owner}/${this.repo}/commits?sha=${this.branch}&per_page=1&page=${page}`;
    const commits = await effetch<any[]>(url);
    return commits[0];
  }

  async getCommitBySha(sha: string) {
    const url = `${base_url}/repos/${this.owner}/${this.repo}/commits/${sha}`;
    const commit = await effetch<any>(url);
    return commit;
  }

  async getFirstCommit() {
    const commitCount = await this.getCommitCount();
    const firstCommit = await this.getCommitByPageNumber(commitCount);
    return firstCommit;
  }
}
