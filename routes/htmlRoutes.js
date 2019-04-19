//html routes below show all front-end user routes

var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// var fakeArray = [{id:1, text:'someText'}, {id:1, text:'Some other burger text'}];

module.exports = function (app) {
  // root route: landing page. 
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

  // user is taken to User Search (results/matches) page /user/matches
  app.get("/user/matches", isAuthenticated, function (req, res) {    
    findMatches(req.user.id, function (bestMatchIds, additionalIds) {
      db.Users.findAll({
        where: { id: bestMatchIds }
      }).then(function (bestMatches) {

        db.Users.findAll({
          where: { id: additionalIds }
        }).then(function (additionalMatches) {

          return res.render("matchpage",
            { matches: bestMatches, addtional: additionalMatches });
        });
      });
    });
  });


  // favorites route, user clicks on favorites from nav bar and is taken to favorites page
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

//////////////////////////////////
/////////Matching Algorithm//////
////////////////////////////////

function findMatches(userId, cb) {
  //looks at users most recent survey results
  db.Survey.findAll({
    limit: 1,
    where: { UserId: userId },
    //this is what tells it to look in descending order (at the users most recent survey results)
    order: [['updatedAt', 'DESC']]
  }).then(function (surveys) {

    var userSurvey = surveys[0];
    var userStudytopic = userSurvey.studytopic;
    var userSubtopic = userSurvey.subtopic;

    var userDays = userSurvey.prefday.split(',').map(str => str.trim());
    var userTime = userSurvey.preftime;
    var userRemote = userSurvey.meetvirtual;
    var userInPerson = userSurvey.meetIP;

    //this looks at all of the user surveys that have the same study topic except for the current user
    db.Survey.findAll({
      where: {
        studytopic: userStudytopic,
        //this code ensures that the current user isn't taken into the matching alg-we don't want to match the user with themselves! 
        userId: { $not: userId }
      }
    }).then(function (surveys) {

      var matchedUsersInPerson = [];
      var matchedUsersRemote = [];

      //this code determines the TOP BUDDIES based on Sub-Topic, Days, Times, Remote, In-Person
      surveys.forEach(survey => {
        //this code looks to compare users sub-topic
        if (survey.subtopic != userSubtopic) {
          return;
        }
        //this code looks to compare users day and time of day selections
        var days = survey.prefday.split(",").map(str => str.trim());
        var timeOfDay = survey.preftime;
        days.forEach(day => {

          if (userDays.includes(day) && userTime == timeOfDay) {
            // alg looks for those who also selected remote
            if (userRemote && userRemote == survey.meetvirtual) {
              matchedUsersRemote.push(survey.UserId);
            }
            //alg looks for those who also selected in person  
            if (userInPerson && userInPerson == survey.meetIP) {
              matchedUsersInPerson.push(survey.UserId);
            }
          }
        });
      });

      //this combines the in person and remote users to compile the final matches list 
      //slice shows the first 3 (top 3 matches) only if there are at least 3 matches
      var bestMatches = matchedUsersInPerson.concat(matchedUsersRemote).slice(0, 3);

      //here we start looking for ADDITIONAL MATCHES
      var additionalMatches = [];

      //This code looks for up to 3 additional matches by Topic and Sub-Topic

      surveys.forEach(survey => {
        //skips over users who have already been added
        if (bestMatches.includes(survey.UserId)) {
          return;
        }
        //looks for user who selected the same Sub-Topic
        if (survey.subtopic != userSubtopic) {
          return;
        }
        //if additional matches were found, adds matches to the page
        if (additionalMatches.length < 3) {
          additionalMatches.push(survey.UserId);
        }
      });


      //this code is used if there are still less than 3 matches for the additional matches by parent Topic.
      if (additionalMatches.length < 3) {
        surveys.forEach(survey => {
          //skips over users who have already been added
          if (bestMatches.includes(survey.UserId) ||
            additionalMatches.includes(survey.UserId)) {
            return;
          }
          //if additional matches were found, adds matches to the additional matches section
          if (additionalMatches.length < 3) {
            additionalMatches.push(survey.UserId);
          }
        });
      }

      //calls callback with matches (if any) so that matches page can print the matches to the TOP BUDDIES and ADDITIONAL MATCHES sections. 

      cb(bestMatches, additionalMatches);
    })
  });
}


