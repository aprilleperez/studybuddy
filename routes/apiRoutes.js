// api routes show all back-end routes for accessing the DB and user authentication 

var db = require("../models");

// Requiring our models and passport as we've configured it
var passport = require("../config/passport");

module.exports = function (app) {
  //  modal 1 user information on click is sent to DB Table 1: User Info (create account)
  // TODO: code once Passport is installed and configured


  // modal 2 user survey results on click are sent to Table 2: User Search in DB (new or additional) (survey). TODO: update db.Example per handlebars specifications
  app.post("/api/submitSurvey", function (req, res) {
    db.Example.createSurvey(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });


  // get matches for user for user search (match results) page. TODO: update db.Example per handlebars specifications 
  app.get("/api/getMatches", function (req, res) {
    db.Example.findMatches(res.user).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });


  // user clicks to favorite a profile and this information is sent to Table 3: Favorites in DB (favorites). TODO: update db.Example per handlebars specifications to pass in clicked favorite user by favUserID AND if a favorite, pass true, else false for res.isFav. This will allow the user to both favorite and un-favorite other users.
  app.get("/api/updateFavorite", function (req, res) {
    db.Example.updateFavorite(res.user, res.favUserID, res.isFav).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });


  // user clicks on favorites and is presented with a list of all of the people they have marked as favorites. TODO: update db.Example per handlebars specifications 
  app.get("/api/getFavorites", function (req, res) {
    db.Example.findFavorites(res.user).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });




  // --------------------------------------------------
  //user authentication routes aka log in/log out route(s) ?????

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });


};
