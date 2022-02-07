const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

//Create new user
exports.create = (req, res) => {
  //validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Username cannot be empty!",
    });
    return;
  }
  //Creates the user objcts
  const user = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  //Posts the user to the database 😊
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while creating the user.",
      });
    });
};

//Retreives all users from the database 💪
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username
    ? { username: { [Op.like]: `%${username}%` } }
    : null;
  User.findAll({
    where: condition,
    include: ['blogPosts'],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while retreiving the users.",
      });
    });
};

//Finds single user with user ID 🕵️‍♂️
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, { include: ["blogPosts"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retreiving user with ID=" + id,
      });
    });
};

//Update user by ID 🆙
exports.update = (req, res) => {
  User.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User updated successfully!",
        });
      } else {
        res.send({
          message: `Cannot update user id=${id}. Maybe user was not found or req.body was empty.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating user with id=${id}`,
      });
    });
};

//Deletes user by ID 💀
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted sucessfully!"
                })
            }
            else {
                res.send({
                    message: `Cannot delete user id=${id}. Maybe user was not found or req.body was empty.`
                })
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Cannot delete user with id=" + id
            });
        });
};
