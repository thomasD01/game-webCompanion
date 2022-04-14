//Libraries
import http from 'http';
import https from 'https';
import next from 'next';
import fs from 'fs';
import path from 'path';
import express from 'express';

require('dotenv').config();

const port_https = parseInt(process.env.PORT_HTTPS || "8443", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

//ssl certificate
const httpsOptions = {
  key: fs.readFileSync("./.cert/server.pem"),
  cert: fs.readFileSync("./.cert/server.pem") 
};

//makes NEXT App ready for development, creates https server and loads App on Server
app.prepare().then(() => {
  const server = express();

  server.use(express.static(path.join(__dirname, "../public")));

  server.all("*", (req, res) => handler(req, res));

  const httpsServer = https.createServer(httpsOptions, server)
  
  httpsServer.listen(port_https, () => {
    console.log('\x1b[32mready \x1b[0m- started server on url: https://localhost:' + port_https);
  });

}).catch((error) => {
  console.error('\x1b[31merror \x1b[0m-', error);
  process.exit(1);
})
