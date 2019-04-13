//html routes below show all front-end user routes

var db = require("../models");

module.exports = function(app) {
  // root route: landing page. TODO: Hook in user authentication
  app.get("/", function(req, res) {
    res.render("index");
  });

// user is taken to User Search (results/matches) page /user/matches TODO: update findAll to use algorithm.js.Update examples:dbExamples to handlebars properties 
  app.get("/matches", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("matches", {
        examples: dbExamples
      });
    });
  });


// favorites route, user clicks on favorites from nav bar and is taken to favorites page.  TODO: update findFavorites to use sequelize.Update examples:dbExamples to handlebars properties 
app.get("/favorites", function(req, res) {
  db.Example.findFavorites({ where: { id: req.params.id } }).then(function(dbExample) {
    res.render("favorites", {
      example: dbExample
    });
  });
});

// Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

