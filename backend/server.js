const express = require("express");
const userRoutes = require("./routes/users");
const testRoutes = require("./routes/tests");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect("mongodb://localhost/edi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use("/user", userRoutes);
app.use("/test", testRoutes);

app.listen(1111);
