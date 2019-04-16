//html routes below show all front-end user routes

var db = require("../models");

// var fakeArray = [{id:1, text:'someText'}, {id:1, text:'Some other burger text'}];

module.exports = function(app) {
  // root route: landing page. TODO: Hook in user authentication
  app.get("/", function(req, res) {
    // if (!req.user) {
    //   res.redirect("/");
    //   return;
    

    res.render("index", {
    authenticated: true // FOR TESTING 
    });
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/");
    }
    res.render("login");
  });

// user is taken to User Search (results/matches) page /user/matches TODO: update findAll to use algorithm.js.Update examples:dbExamples to handlebars properties 
  app.get("/matches", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("matches", {
        examples: dbExamples
      });
    // });
  });


// favorites route, user clicks on favorites from nav bar and is taken to favorites page.  TODO: update findFavorites to use sequelize.Update examples:dbExamples to handlebars properties 
app.get("/user/buddylist", function(req, res) {
  db.Example.findFavorites({ where: { id: req.params.id } }).then(function(dbExample) {
    res.render("buddylist", {
      authenticated: true, // FOR TESTING
      });
    });
  });
});

// Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

