const express = require("express");
const Connect_MongoDB = require("./config/mongodb");
const app = express();
const dotENV = require("dotenv").config({ path: "./config/config.env" });
const port = process.env.PORT;
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
Connect_MongoDB();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use("/api/v1/user", require("./Routes/User"));
app.use("/api/v1/category", require("./Routes/Category"));
app.use("/api/v1/sub-category", require("./Routes/SubCategory"));
app.use("/api/v1/attribute", require("./Routes/Attribute"));
app.use("/api/v1/brand", require("./Routes/Brand"));
app.use("/api/v1/unit", require("./Routes/Unit"));
app.use("/api/v1/role", require("./Routes/Role"));
app.use("/api/v1/address", require("./Routes/Address"));
app.use("/api/v1/product", require("./Routes/Product"));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
