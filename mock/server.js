const http = require("http");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost:3001");

  if (url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "healthy" }));
  }

  if (url.pathname === "/faults/server-error") {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Simulated server error" }));
  }

  if (url.pathname === "/faults/malformed-json") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end("{ invalid json");
  }

  if (url.pathname === "/faults/delay") {
    return setTimeout(() => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Delayed response" }));
    }, 5000);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(3001, () => {
  console.log("API Sentinel mock server running at http://localhost:3001");
});
