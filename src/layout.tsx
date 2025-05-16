import { Html } from "@elysiajs/html";

export default function Layout({
  children,
  title,
}: {
  children: any;
  title: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👶</text></svg>"
        />
        <meta name="color-scheme" content="light dark" />
        <title>{title}</title>
      </head>
      <body style="font-family: system-ui;">
        <header style="display: flex; justify-content: space-between; align-items: center;">
          <a href="/">
            <h2>github beginnings</h2>
          </a>
          <div>
            <a href="https://tijn.dev" target="_blank">
              made by tijn/jonas
            </a>
            {" &bull; "}
            <a href="https://tijn.dev/git-beginnings" target="_blank">
              View source
            </a>
          </div>
        </header>
        <hr />
        {children}
      </body>
    </html>
  );
}
