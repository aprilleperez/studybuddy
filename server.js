require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");

// Requiring passport as we've configured it
var passport = require("./config/passport");

var db = require("./models");
var Seeds = require("./seeds")
var seedSurvey = require("./seedSurvey")

var app = express();
var PORT = process.env.PORT || 3000;

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
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
};

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions)
  .then(function () {
    console.log("seeding ...", Seeds)
    Seeds();
  })
  .then(function() {
    setTimeout(seedSurvey, 3000)
    //seedSurvey();
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
