var db = require("./models");


var surveySeeds = [{
    studytopic: 'math',
    subtopic: 'algebra',
    preftime: 'morning',
    prefday: 'mon',
    meetvirtual: 0,
    meetIP: 0,
    username: 'JDoe',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 1,
},
{
    studytopic: 'math',
    subtopic: 'calculus',
    preftime: 'morning',
    prefday: 'tues',
    meetvirtual: 0,
    meetIP: 0,
    username: 'JJones',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 2,
},
{
    studytopic: 'math',
    subtopic: 'geometry',
    preftime: 'evening',
    prefday: 'fri',
    meetvirtual: 0,
    meetIP: 1,
    username: 'ASmith',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 3,
},
{
    studytopic: 'math',
    subtopic: 'numtheory',
    preftime: 'afternoon',
    prefday: 'sun',
    meetvirtual: 0,
    meetIP: 1,
    username: 'FThompson',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 4,
},
{
    studytopic: 'math',
    subtopic: 'diffeq',
    preftime: 'afternoon',
    prefday: 'sat',
    meetvirtual: 0,
    meetIP: 1,
    username: 'TWilliams',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 5,
},
{
    studytopic: 'math',
    subtopic: 'diffeq',
    preftime: 'morning',
    prefday: 'sat',
    meetvirtual: 0,
    meetIP: 0,
    username: 'LAndrews',
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: 6,
}
];

//this code checks the DB to see if there is already content (seeds)
//if no content, add seeds. 
//if there is content, do not add seeds.
function seedSurveys() {
    db.Survey.count().then(c => { 
        if (c == 0) {
            surveySeeds.forEach(function (user) {
                db.Survey.create(user);
            })
        }
    });
}

module.exports = seedSurveys