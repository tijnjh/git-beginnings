import { PageProps } from "waku/router";
import { tryCache } from "../../../lib/cache";
import { GithubPage } from "../../../lib/github-page-class";

import { Button } from "@/components/ui/button";

import { formatDistance, formatRelative } from "date-fns";
import { GithubIcon } from "lucide-react";

export default async function RepoPage({
  owner,
  repo,
}: PageProps<"/[owner]/[repo]">) {
  const { sha, commit } = await getData(owner, repo);

  return (
    <>
      <a
        href={`https://github.com/${owner}/${repo}`}
        className="hover:underline"
      >
        <h1 className="text-4xl font-semibold my-2">
          {owner}/{repo}
        </h1>
      </a>
      <h3 className="font-mono">
        {sha.slice(0, 7)} - {commit.message}
      </h3>

      <p>
        by: <b>{commit.author.name}</b> - {commit.author.email}
      </p>

      <h3>
        {formatRelative(new Date(commit.author.date), new Date())}

        {" - "}

        {formatDistance(new Date(commit.author.date), new Date(), {
          addSuffix: true,
        })}
      </h3>

      <Button asChild>
        <a
          href={`https://github.com/${owner}/${repo}/commit/${sha}`}
          target="_blank"
          className=" w-fit"
        >
          <GithubIcon />
          View commit on GitHub
        </a>
      </Button>
    </>
  );
}

const getData = async (owner: string, repo: string) => {
  const page = new GithubPage(owner, repo);

  const { sha } = await tryCache(`${owner}-${repo}-first-commit-sha`, () =>
    page.getFirstCommit(),
  );

  const { commit } = await tryCache(`${owner}-${repo}-${sha}`, () =>
    page.getCommitBySha(sha),
  );

  return { sha, commit };
};
