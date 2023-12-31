const express = require("express"); // I guess this uses the express module
const { exec } = require("child_process"); // This allows for shells commands.
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const {
  checkDatabase,
  saveDataToDataBase,
  run,
  getLaTexCodeStringFromDatabaseFunction,
  remote_run,
} = require("./javascript/mongodbCheck.js");
remote_run().catch(console.dir);
app.get("/", (req, res) => {
  console.log(path.join(__dirname, "public", "index.html"));
  res.sendFile(path.join(__dirname, "public", "index.html"));
  console.log(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages", "background.html"));
});

app.post("/run", (req, res) => {
  exec(`./addDoubles ${req.body.input}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    res.send(`Output: ${stdout}`);
  });
});

app.post("/saveDataToDataBaseRoute", saveDataToDataBase);

app.get(
  "/getLaTexCodeStringFromDatabaseRoute",
  getLaTexCodeStringFromDatabaseFunction
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server started on port 3000");
});
