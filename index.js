const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connection } = require("./config/db");
const { TravelRouter } = require("./routes/travel.route");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(TravelRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
  } catch (error) {
    console.log(error);
  }
  console.log("Server started on port", process.env.PORT);
});
