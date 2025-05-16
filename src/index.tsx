import { Elysia, redirect } from "elysia";
import { html, Html } from "@elysiajs/html";

import { formatDistance, formatRelative } from "date-fns";

import { GithubPage } from "./github-page-class";
import { tryCache } from "./cache";
import Layout from "./layout";

const app = new Elysia().use(html());

app.get("/", () => {
  return (
    <Layout title="github beginnings">
      <p>
        This is a simple tool I created to find the first ever git commit for
        any given GitHub repo
      </p>

      <form onsubmit="event.preventDefault(), event.target[0].value.includes('/') ? window.location.href = event.target[0].value : alert('Not a valid repo')">
        <input type="text" placeholder="owner/repo" required />
        <input type="submit" />
      </form>
    </Layout>
  );
});

app.get("/:owner", () => {
  return "Invalid path, please include both the repo owner and the repo name: like this `facebook/react`";
});

app.get("/:owner/:repo", async ({ params }) => {
  const page = new GithubPage(params.owner, params.repo);

  const firstCommit = await tryCache(
    `${params.owner}-${params.repo}-first-commit`,
    () => page.getFirstCommit(),
  );

  return redirect(`/${page.owner}/${page.repo}/commit/${firstCommit.sha}`);
});

app.get("/:owner/:repo/commit/:sha", async ({ params }) => {
  const page = new GithubPage(params.owner, params.repo);

  const { commit } = await tryCache(
    `${params.owner}-${params.repo}-${params.sha}`,
    () => page.getCommitBySha(params.sha),
  );

  return (
    <Layout title={`github beginnings - ${page.owner}/${page.repo}`}>
      <h1>
        {page.owner}/{page.repo}
      </h1>
      <h3 style="font-family: monospace">
        {params.sha.slice(0, 7)} - {commit.message}
      </h3>
      <p>by: {commit.author.name}</p>
      <h3>
        {formatRelative(new Date(commit.author.date), new Date())}

        {" - "}

        {formatDistance(new Date(commit.author.date), new Date(), {
          addSuffix: true,
        })}
      </h3>

      <a
        href={`https://github.com/${page.owner}/${page.repo}/commit/${params.sha}`}
        target="_blank"
      >
        view commit on GitHub
      </a>
    </Layout>
  );
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
