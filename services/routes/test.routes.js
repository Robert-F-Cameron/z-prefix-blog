module.exports = app => {
  const { authJwt } = require("../middleware");
  const controller = require("../controller/test.controller");
  var express = require("express");
    var router = express.Router();
    

  router.get("/all", controller.allAccess);
  router.get("/user", [authJwt.verifyToken], controller.userBoard);
  router.get(
    "/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  router.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //Sets the actual endpont to hit
  app.use("/api/test", router);
};
