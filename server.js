const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./backend/models');
const Role = db.role

const PORT = process.env.PORT || 8080; // use either the host env var port (PORT) provided by Heroku or the local port (8081) on your machine

var corsOptions = {
  origin: `https://z-prefix-blog.herokuapp.com/`|| "http://localhost:3000", 
};

app.use(cors(corsOptions));
app.use(express.static("build"));
//Parse requests of content type - application-json
app.use(bodyParser.json());

//Parse requests of content type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Syncs the database to the models created by Sequelize - Force is used for development purposes to drop and resync.
db.sequelize.sync({ force: true })
  .then(() => {
  console.log("Drop and re-sync db.");
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

//Initial route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the z-prefix-blog" });
})

require('./backend/routes/blog.routes')(app);
require('./backend/routes/user.routes')(app);
require('./backend/routes/test.routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})