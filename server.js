const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".woff": "application/font-woff",
  ".ttf": "application/font-ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "application/font-otf",
  ".wasm": "application/wasm",
};

// Function to process SSI includes
function processSSI(content, basePath = ".") {
  const includeRegex = /<!--#include\s+file="([^"]+)"\s*-->/g;
  let match;
  let processedContent = content;

  while ((match = includeRegex.exec(content)) !== null) {
    const includePath = path.join(basePath, match[1]);
    try {
      const includeContent = fs.readFileSync(includePath, "utf8");
      processedContent = processedContent.replace(match[0], includeContent);
    } catch (error) {
      console.error(`Error including file ${includePath}:`, error);
      processedContent = processedContent.replace(
        match[0],
        `<!-- Error including ${match[1]} -->`
      );
    }
  }

  return processedContent;
}

// Live reload script
const liveReloadScript = `
<script>
  (function() {
    const ws = new WebSocket('ws://localhost:${PORT + 1}');
    ws.onmessage = function(event) {
      if (event.data === 'reload') {
        window.location.reload();
      }
    };
    ws.onclose = function() {
      console.log('Live reload disconnected. Reconnecting...');
      setTimeout(() => window.location.reload(), 1000);
    };
  })();
</script>
`;

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Handle favicon requests
  if (req.url === "/favicon.ico") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Default to index.html for root path
  let filePath = req.url === "/" ? "./index.html" : "." + req.url;

  const extname = path.extname(filePath);
  let contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        // File not found
        res.writeHead(404);
        res.end("File not found");
      } else {
        // Server error
        res.writeHead(500);
        res.end("Server error: " + error.code);
      }
    } else {
      // Process SSI for HTML files
      if (extname === ".html") {
        content = processSSI(content.toString());
        // Add live reload script to HTML files
        content = content.replace("</body>", liveReloadScript + "</body>");
      }

      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

// WebSocket server for live reload
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: PORT + 1 });

// File watcher
const chokidar = require("chokidar");
const watcher = chokidar.watch(".", {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
});

watcher.on("change", (path) => {
  console.log(`File ${path} has been changed`);
  // Notify all connected clients to reload
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send("reload");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log("Live reload enabled on WebSocket port", PORT + 1);
  console.log("Press Ctrl+C to stop the server");
  console.log("SSI (Server-Side Includes) are enabled");
});
