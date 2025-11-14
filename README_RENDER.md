Special Complete — Mumet (READY for Render Web Service)

Structure (root of repo):
- server.js
- package.json
- .node-version
- public/
  - index.html
  - style.css
  - script.js
  - service-worker.js
  - manifest.json
  - offline.html
  - assets/*

Render (Web Service) settings (copy exactly):
- Environment: Node
- Build Command: npm install
- Start Command: npm start
- Root Directory: (leave blank)
- Node version: 18 (use .node-version or set via settings)

Environment variables: NONE required for default build.
Optional: set PROXY_URL in public/config.js if you deploy an AI proxy.

Troubleshooting:
- If you see "ENOENT: no such file or directory public/index.html": ensure public/ exists at repo root and index.html is inside.
- If autoplay blocked: modern browsers require muted autoplay; iframe uses mute param.
- To enable real YouTube Data API search: add YT_API_KEY to public/config.js then the search code can call API (not included by default).

Deploy steps:
1. Push all files to GitHub repo (unzip then push files, do NOT upload zip as-is)
2. On Render: New -> Web Service -> connect repo
3. Set Build: npm install ; Start: npm start ; Root Dir: (blank)
4. Deploy
