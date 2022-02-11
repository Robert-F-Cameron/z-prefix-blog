const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //Check for existing Username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is taken!"
            });
            return;
        }
        //Check for existing Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }
            next();
        });
    });
};
checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        req.body.roles.forEach(role => {
            if (!ROLES.includes(role)) {
                res.status(400).send({
                    message: `Role: ${role}, does not exist!`
                });
                return;
            }
        })
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;