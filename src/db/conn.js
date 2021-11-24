const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://AlmasT10:Qwerty_0101@cluster0.oak3m.mongodb.net/bmi?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB Connection Successful");
  })
  .catch((e) => {
    console.log("no DB connection");
  });
