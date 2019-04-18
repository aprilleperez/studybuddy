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
    //     db.Users.findAll({}).then(function (dbExample) {
    //       res.render("matchpage", { matches: dbExample });
    //     });

    findMatches(req.user.id, function (matchedUserIds) {
      db.Users.findAll({
        where: { id: matchedUserIds }
      }).then(function (matches) {
        return res.render("matchpage", /*your data here*/{bestMatches:bestMatches,  matches: matches });
      });
    });


    // example data is dummy people to test hbs card generation. TODO: We need real data.
    // db.Survey.findOne({
    //   where: {UserId: req.user.id}
    // }).then(function(survey){
    //   return db.Survey.findAll({
    //     where: {subtopic: survey.subtopic},
    //     include:[{model: db.Users}]
    //   })
    // }).then(function (surveys){
    //   matches = surveys.map(s => s.User.dataValues)
    //   res.render("matchpage", /*your data here*/{matches: matches});
    //   //res.json(surveys);
    //   //console.log("step 2", surveys)
    //   return
    // })
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

function findMatches(userId, cb) {

  db.Survey.findAll({
    limit: 1,
    where: { UserId: userId },
    order: [['updatedAt', 'DESC']]
  }).then(function (surveys) {
    //looks at users most recent survey results
    var userSurvey = surveys[0];
    var userStudytopic = userSurvey.studytopic;
    var userSubtopic = userSurvey.subtopic;

    var userDays = userSurvey.prefday.split(',').map(str => str.trim());
    var userTime = userSurvey.preftime;
    var userRemote = userSurvey.meetvirtual;
    var userInPerson = userSurvey.meetIP;

    // lets see if any of the users match our days

    db.Survey.findAll({
      where: {
        studytopic: userStudytopic,
        userId: { $not: userId }
      }
    }).then(function (surveys) {
      //looks at users most recent survey results

      var matchedUsersInPerson = [];
      var matchedUsersRemote = [];

      surveys.forEach(survey => {

        if (survey.subtopic != userSubtopic) {
          return;
        }

        var days = survey.prefday.split(",").map(str => str.trim());
        var timeOfDay = survey.preftime;
        days.forEach(day => {

          if (userDays.includes(day) && userTime == timeOfDay) {
            // this user matches
            if (userRemote && userRemote == survey.meetvirtual) {
              matchedUsersRemote.push(survey.UserId);
            }

            if (userInPerson && userInPerson == survey.meetIP) {
              matchedUsersInPerson.push(survey.UserId);
            }
          }
        });
      });

      // TODO: Need to update code to return "close" matches if less than max
      var matchedUsers = matchedUsersInPerson.concat(matchedUsersRemote);
      if (matchedUsers.length < 6) {
        surveys.forEach(survey => {
          if (matchedUsers.includes(survey.UserId)) {
            return;
          }

          if (survey.subtopic != userSubtopic) {
            return;
          }
        
          if (matchedUsers.length < 6) {
            matchedUsers.push(survey.UserId);
          }
        });
      }

      if (matchedUsers.length < 6) {
        surveys.forEach(survey => {
          if (matchedUsers.includes(survey.UserId)) {
            return;
          }
  
          if (matchedUsers.length < 6) {
            matchedUsers.push(survey.UserId);
          }
        });
        
      }

      cb(matchedUsers);
    })
  });
}

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
