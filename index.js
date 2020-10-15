const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const PORT = process.env.PORT || 4000;

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/vali", {
  useNewUrlParser: true,
});

mongoose.connection.on("error", function (e) {
  console.error("error in mongoose", e);
});

app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/", routes);

app.listen(PORT, () => console.log("Inició en puerto .." + PORT));
