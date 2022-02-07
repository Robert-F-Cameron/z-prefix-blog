module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validator: {
            len: 4,
        },
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
        validator: {
            is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/i,
        },
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validator: {
            isEmail: true,
        },
    },
  });

  return User;
};
