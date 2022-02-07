module.exports = app => {
  const users = require("../controller/user.controller.js");
  var express = require("express");
  var router = express.Router();

  //Create the Users
  router.post("/", users.create);

  //Retrieve all Users
  router.get("/", users.findAll);

  //Find user by id
  router.get("/:id", users.findOne);

  //Update user
  router.put("/:id", users.update);

  //Delete user by ID
  router.delete("/:id", users.delete);

  //Sets the actual endpont to hit
  app.use("/api/users", router);
};
