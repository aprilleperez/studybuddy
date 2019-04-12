var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};


// root route: landing page 

// modal 1 is on landing page-so doesn't need route (right?). HOWEVER do need route for this information to route to the DB Table 1: User Info

// modal 2 content gets posted to Table 2: User Search in DB. 
 //AND
 // user is taken to User Search (results/matches) page /user/matches


// user clicks to favorite a profile and this information is sent to Table 3: Favorites in DB

// favorites route, user clicks on favorites from nav bar and is taken to favorites page