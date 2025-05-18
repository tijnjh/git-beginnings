"use client";

import { useState } from "react";
import { useRouter } from "waku";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [query, setQuery] = useState("");

  const router = useRouter();

  return (
    <>
      <p>
        This is a simple tool to find the first ever git commit for any given
        GitHub repo
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (query.includes("/")) {
            router.push(query as any);
          } else {
            alert("Not a valid repo");
          }
        }}
        className="flex gap-2"
      >
        <Input
          type="text"
          placeholder="owner/repo"
          required
          onChange={(e) => {
            setQuery(e.currentTarget.value);
          }}
          value={query}
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
