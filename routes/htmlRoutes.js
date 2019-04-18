//html routes below show all front-end user routes

var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// var fakeArray = [{id:1, text:'someText'}, {id:1, text:'Some other burger text'}];

module.exports = function (app) {
  // root route: landing page. TODO: Hook in user authentication
  app.get("/", function (req, res) {
    if (req.user) {
      // return res.redirect("/user/matches");
      // authenticated = true;
      res.render("index", {
        authenticated: true
      });
    }

    else {
      res.render("index");
    }
  });

  // user is taken to User Search (results/matches) page /user/matches TODO: update findAll to use algorithm.js.Update examples:dbExamples to handlebars properties 
  app.get("/user/matches", isAuthenticated, function (req, res) {
    //get the data and put it in an object
    db.Users.findAll({}).then(function (dbExample) {
      res.render("matchpage", { matches: dbExample });
    });
  });


  // favorites route, user clicks on favorites from nav bar and is taken to favorites page.  TODO: update findFavorites to use sequelize.Update examples:dbExamples to handlebars properties 
  app.get("/user/buddylist", isAuthenticated, function (req, res) {
    db.Users.findAll({ where: { id: req.user.id } }).then(function (dbExample) {
      dbExample[0].getFriends().then(friends => {
        // console.log(friends);
        res.render('buddylist', { favorites: friends })
      })
    });
  });



  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};






    // example data is dummy people to test hbs card generation. TODO: We need real data.
    // exampleData = {
    //   matches: [
    //     {
    //       //example person 1
    //       username: "Samsmith",
    //       first_name: "Sam",
    //       last_name: "Smith",
    //       email: "sam@mail.com",
    //       location: 98101,
    //       id: 1,
    //       photo: "https://slidesjs.com/examples/standard/img/example-slide-1.jpg"
    //     },
    //     {
    //       // example person 4
    //       username: "aprillep",
    //       first_name: "Aprille",
    //       last_name: "P",
    //       email: "aprille@mail.com",
    //       location: 98122,
    //       id: 2,
    //       photo: "https://slidesjs.com/examples/standard/img/example-slide-1.jpg"
    //     }
    //   ]
    // }
