var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};

// ---------------API ROUTES-------------------
//  modal 1 user information on click is sent to DB Table 1: User Info (create account)


// modal 2 user survey results on click are sent to Table 2: User Search in DB (new or additional) (survey)


// get matches for user for user search (match results) page


// user clicks to favorite a profile and this information is sent to Table 3: Favorites in DB (favorites)


// user clicks on favorites and is presented with a list of all of the people they have marked as favorites


// log in/log out route(s) ?????



*/