//html routes below show all front-end user routes

var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// var fakeArray = [{id:1, text:'someText'}, {id:1, text:'Some other burger text'}];

module.exports = function(app) {
  // root route: landing page. TODO: Hook in user authentication
  app.get("/", function(req, res) {
    if (req.user) {
      return res.redirect("/user/matches");
    }
    

    res.render("index");
  });

// user is taken to User Search (results/matches) page /user/matches TODO: update findAll to use algorithm.js.Update examples:dbExamples to handlebars properties 
  app.get("/user/matches", isAuthenticated, function(req, res) {

    res.render("matchpage");
      
  });


// favorites route, user clicks on favorites from nav bar and is taken to favorites page.  TODO: update findFavorites to use sequelize.Update examples:dbExamples to handlebars properties 
app.get("/user/buddylist", isAuthenticated,  function(req, res) {
  db.Example.findFavorites({ where: { id: req.params.id } }).then(function(dbExample) {
    res.render("buddylist");
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

// Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

