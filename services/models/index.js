const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  ssl: {
    rejectUnauthorized: false,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.blog = require("./blog.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

//Relationhips
db.user.hasMany(db.blog, {
  as: "blogPosts"
});

db.blog.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user"
})

module.exports = db;
