const express = require("express");
const app = express();
const mongoose = require("mongoose");
const produtRoute = require("./routes/products");
const userRoute = require("./routes/users");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connnected to mongodb"))
  .catch((err) => console.log(err));
app.use("/api/v1", produtRoute);
app.use("/api/v1", userRoute);

app.listen(5000, () => console.log("listening on port 5000"));
