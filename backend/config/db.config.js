module.exports = {
  HOST: process.env.DATABASE_URL || "localhost",
  USER: process.env.USER || "postgres",
  PASSWORD: process.env.PASSWORD || "password",
  DB: process.env.DB || "blog",
  dialect: process.env.DIALECT || "postgres",
  pool: {
    max: 5,
    min: 0,
    aquire: 30000,
    idle: 10000,
  },
};