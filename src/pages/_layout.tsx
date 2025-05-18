import { Link } from "waku";
import "../styles.css";

import type { ReactNode } from "react";
import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ToggleAppearance from "@/components/ToggleAppearrance";

function toggleAppearance() {}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TooltipProvider>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👶</text></svg>"
      />
      <title>GitHub beginnings</title>
      <header className="items-center max-w-4xl mx-auto flex justify-between p-4">
        <Link to="/" className="hover:underline">
          <h2>👶 GitHub beginnings</h2>
        </Link>

        <div className="flex gap-2 items-center">
          <Button asChild variant="outline">
            <a href="https://tijn.dev" target="_blank" className="block">
              <img
                src="https://github.com/tijnjh.png"
                className="size-6 rounded-full"
              />
              tijn.dev
            </a>
          </Button>

          <Tooltip>
            <TooltipTrigger>
              <Button asChild>
                <a
                  href="https://tijn.dev/git-beginnings"
                  target="_blank"
                  className="block"
                >
                  <GithubIcon />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View source</p>
            </TooltipContent>
          </Tooltip>

          <ToggleAppearance />
        </div>
      </header>

      <hr />

      <main className="p-4 grid grid-cols-1 gap-4 max-w-4xl mx-auto">
        {children}
      </main>
    </TooltipProvider>
  );
}
