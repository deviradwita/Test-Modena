if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const Controller = require("./controllers/controller");
const authentication = require("./middleware/authentication");
const upload = require("./middleware/multer");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static("assets"));
app.post("/register", Controller.register);
app.post("/login", Controller.login);
app.use(authentication);
app.get("/dashboard", Controller.dashboard);
app.put("/upload/:id", upload.single("avatar"), Controller.uploadPhoto);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
