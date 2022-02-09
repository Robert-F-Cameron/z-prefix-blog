module.exports = app => {
  const users = require("../controller/user.controller.js");
  const { verifySignUp } = require("../middleware");
  var express = require("express");
  var router = express.Router();

  //Create the Users and checks for duplicate email or username
  router.post("/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    users.signup
  );

  //signs the user in.
  router.post("/signin",
    users.signin
  );

  //Retrieve all Users
  router.get("/", users.findAll);

  //Find user by id
  router.get("/:id", users.findOne);

  //Update user
  router.put("/:id", users.update);

  //Delete user by ID
  router.delete("/:id", users.delete);

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Sets the actual endpont to hit
  app.use("/api/users", router);
};
