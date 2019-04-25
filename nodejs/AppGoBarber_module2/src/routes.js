const express = require("express");
const multerconfig = require("./config/multer");
const upload = require("multer")(multerconfig);

const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const FileController = require("./app/controllers/FileController");
const authMiddleware = require("./app/middleware/auth");
const guestMiddleware = require("./app/middleware/guest");

const DashboardController = require("./app/controllers/DashboardController");
const AppointmentsController = require("./app/controllers/AppointmentsController");
const AvailableController = require("./app/controllers/AvailableController");

const routes = express.Router();

routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash("success");
  res.locals.flashError = req.flash("error");

  return next();
});

routes.get("/files/:file", FileController.show);

routes.get("/", guestMiddleware, SessionController.create);
routes.post("/signin", SessionController.store);

routes.get("/signup", guestMiddleware, UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

routes.use("/app", authMiddleware);

routes.get("/app/dashboard", DashboardController.index);
routes.get("/app/appointments/new/:provider", AppointmentsController.create);
routes.post("/app/appointments/new/:provider", AppointmentsController.store);
routes.get("/app/available/:provider", AvailableController.index);

routes.get("/app/logout", SessionController.destroy);

module.exports = routes;
