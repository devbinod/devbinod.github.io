const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

const path = require("path");

app.get("/", (req, res) => {
  const currentPath = path.dirname(__dirname);

  res.sendFile(`${currentPath}/calculator/calculator.html`);
});

const getResult = (value) => {
  return `<h1>your result is : ${value}</h1> <br/>
    Go to Main page : <a href='http://localhost:3000/'> Another calculation”</a>`;
};

app.post("/operation", (req, resp) => {
  const num1 = parseInt(req.body.num1);
  const num2 = parseInt(req.body.num2);
  const operation = req.body.operation;

  switch (operation) {
    case "add":
      resp.send(getResult(num1 + num2));
      break;
    case "sub":
      resp.send(getResult(num1 - num2));
      break;

    case "mul":
      resp.send(getResult(num1 *num2));
      break;
    case "div":
      resp.send(getResult(num1-num2));
      break;

      default:

        resp.send("Please choose correct operation \n     Go to Main page : <a href='http://localhost:3000/'> Another calculation”</a>")
  }
});

app.listen(3000, "localhost", () => {
  console.log("app is running");
});
