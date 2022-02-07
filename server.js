const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./services/models');

const PORT = process.env.PORT || 8080; // use either the host env var port (PORT) provided by Heroku or the local port (8081) on your machine

var corsOptions = {
  origin: process.env.FRONTEND || "http://localhost:8081", 
};

app.use(cors(corsOptions));

//Parse requests of content type - application-json
app.use(bodyParser.json());

//Parse requests of content type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Syncs the database to the models created by Sequelize - Force is used for development purposes to drop and resync.
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

//Initial route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the z-prefix-blog" });
})

require('./services/routes/blog.routes')(app);
require('./services/routes/user.routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})