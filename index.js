const path = require("path");
const express = require("express");
const { spawn } = require("child_process");

const ytDlpLinuxBinaryPath = path.resolve("./yt-dlp");
const ytDlpWindowsBinaryPath = path.resolve("./yt-dlp");

const app = express();
const port = 8000;
app.get("/", (req, res) => {
  let jsonData = "";
  const url = "https://www.youtube.com/watch?v=QpcNM3I7mrI";
  const ytdlp = spawn(ytDlpLinuxBinaryPath, ["-j", "-F", "-o", "-", url]);
  ytdlp.stdout.on("data", (chund) => console.log(chund.toString()));
  ytdlp.stderr.on("data", (chund) => (jsonData += chund.toString()));
  ytdlp.on("close", (chund) => res.send(jsonData));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
