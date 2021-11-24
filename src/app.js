const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const app = express();
require("./db/conn");

const { History } = require("./models/history");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");

let h = [];
//Middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.use(express.static(static_path));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.post("/", async (req, res) => {
  var name = req.body.name;
  var height = req.body.height;
  var weight = req.body.weight;
  var bmi = weight / (height * height);
  var message = "";
  var status = "";

  // CONDITION FOR BMI
  if (bmi < 18.5) {
    message = "You should eat a little bit more";
    status = "Underweight";
  } else if (18.5 <= bmi && bmi < 24.9) {
    message = "Keep doing what you are doing";
    status = "Normal";
  } else if (25.0 <= bmi && bmi < 29.9) {
    message = "You should cut down on your food a little bit";
    status = "Overweight";
  } else {
    message = "You should really do something about your appetite ASAP";
    status = "Obese";
  }
  h.push({ bmi, message });

  history = new History({
    name: name,
    history: h,
  });

  history = await history.save();

  if (!history) {
    return res.status(400).send("The History cannot be created");
  }

  res.send(`Hi ${name},
    Your BMI is ${bmi},
    Weight status: ${status},
    Message: ${message}  
  `);
});

app.get("/admin", async (req, res) => {
  const userlist = await History.find();

  if (!userlist) {
    res.status(400).send("No History Found");
  }

  res.send(userlist);
});

app.listen(port, () => {
  console.log(`server is running at port : ${port}`);
});
