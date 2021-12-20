const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const productRouter = require("./routers/products");
const categoryRouter = require("./routers/categories");
const orderRouter = require("./routers/orders");
const userRouter = require("./routers/users");

const Product = require("./models/product");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
//environment
require("dotenv/config");
const api = process.env.API_URL;

//Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(authJwt());
app.use(errorHandler);

app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/users`, userRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database connection is ready");
  })
  .catch((err) => console.log(err));
app.listen(3000, () => {
  console.log(api);
  console.log(`Server is running http://localhost:3000`);
});
