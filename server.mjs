import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { promises as fsPromises } from "fs";
import http from "http";

const { readFile, stat } = fsPromises;

const dir = dirname(fileURLToPath(import.meta.url));

const extensions = new Map();
extensions.set(".css", "text/css");
extensions.set(".html", "text/html");
extensions.set(".js", "text/javascript");
extensions.set(".map", "application/json");
extensions.set(".png", "image/png");
extensions.set(".woff2", "font/woff2");

const getContentType = (path) => {
  const textPlain = "text/plain";

  const ext = [...extensions.keys()].find((ext) => path.includes(ext));
  if (typeof ext === "undefined") return textPlain;

  return extensions.get(ext);
};

const router = async (req, res) => {
  const { url } = req;
  if (typeof url === "undefined") {
    throw new Error("req.url is undefined");
  }

  let path = join(dir, url);

  let stats;
  try {
    stats = await stat(path);
    if (stats.isDirectory()) path = join(dir, "/index.html");
  } catch {
    path = join(dir, "/index.html");
  }

  const file = await readFile(path);

  const contentType = getContentType(path);

  console.info(JSON.stringify({ url, path, contentType }, null, 2));

  res.writeHead(200, {
    "Content-Type": contentType,
  });
  res.write(file);
  res.end();
  return;
};

const host = "localhost";
const port = 8000;

const server = http.createServer(router);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
