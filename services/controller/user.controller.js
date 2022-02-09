const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//Create new user
exports.signup = (req, res) => {
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
    password: bcrypt.hashSync(req.body.password, 8),
  };
  //Posts the user to the database 😊
  User.create(user)
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while creating the user.",
      });
    });
};
//Signin
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
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
