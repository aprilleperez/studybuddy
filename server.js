require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");

// Requiring passport as we've configured it
var passport = require("./config/passport");

var db = require("./models");
var Seeds = require("./seeds")

var app = express();
var PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Passport integration for user auth
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "happy cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
};

// var order = [
//   'userinfo',
//   'usersearch',
//   'favorites'
// ];

// async.eachSeries(order, function (file, callback) {
//   var model = require(currentDir + '/' + file + '.model.js');
//   model
//     .sync({ force: true })
//     .then(function () {
//       console.log('Force-synced %s', file);
//       // callback();
//     })
//     .catch(callback);
// }, function (err) {
//   if (err) throw err;
//   console.log('Completed migration in order as such %o', files);
// });

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions)
  .then(function () {
    console.log("seeding ...", Seeds)
    Seeds();
  })
  .then(function () {
    app.listen(PORT, function () {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });

module.exports = app;
