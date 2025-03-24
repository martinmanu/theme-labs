#!/usr/bin/env node
const { exec } = require("child_process");
const path = require("path");

const serverPath = path.join(__dirname, "../server.js");
exec(`node ${serverPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting UI: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(stdout);
});
