var db = require("../models");

// var fakeArray = [{id:1, text:'someText'}, {id:1, text:'Some other burger text'}];

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        authenticated: true // FOR TESTING 
      });
    // });
  });

  app.get("/user/matches", function(req, res) {
      res.render("matchpage", {
        authenticated: true, // FOR TESTING
      });
  });

  app.get("/user/buddylist", function(req, res) {
    res.render("buddylist", {
      authenticated: true  // FOR TESTING
    });
});



  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   // db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: 1 //fakeArray //dbExample
  //     });
  //   // });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
