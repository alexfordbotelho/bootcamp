const express = require("express");
const multerconfig = require("./config/multer");
const upload = require("multer")(multerconfig);

const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const authMiddleware = require("./app/middleware/auth");
const guestMiddleware = require("./app/middleware/guest");

const routes = express.Router();

routes.get("/", guestMiddleware, SessionController.create);
routes.post("/signin", SessionController.store);

routes.get("/signup", guestMiddleware, UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

routes.use("/app", authMiddleware);

routes.get("/app/dashboard", (req, res) => {
  console.log(req.session.user);
  res.render("dashboard");
});

module.exports = routes;
