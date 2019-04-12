//this is where the logic for finding study buddy matches will live

//there will be an export function to return matches by user ID. 


module.exports = function (userID) {
//working on algorithm-return will change
    return "userMatches IDs";
}


/* Buddy determining inputs:
1-Parent Topic
2-Sub-Topic
3-Days of Week
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
    Sunday
4-Time of Day
    Morning
    Afternoon
    Evening
5-Remote
6-In-Person
7-Location (zip/postal code)

1-Find users who share the same Parent Topic:
    var matchingParentTopic = findByParentTopic(userID);

2-Find users who share the same Sub-Topic (pass in Parent Topic parameter):
    var matchingSubTopic = findBySubTopic(userID, matchingParentTopic);

We now have users who share the same Parent and Sub-Topic. 


3-Find users who share intersecting Availability by Days of the Week. Keys are based off of user perspective (ex: what day(s) of the week they can meet):
    Key: day of the week,
    Value: list of users with same key

4-Find users who share intersecting Availability by Time of Day. Keys are based off of user perspective (ex: what time(s) of the day they can meet):
    Key: time of day,
    Value: list of users with same key

Now we join 3 and 4 to narrow down best matches to those who can meet on the same day(s)/at the same time(s)

5 / 6 / 7-Find users who are willing to meet Remotely and In Person (based on location) (bools):
    var remoteUsers = query DB
    var inPersonUsers = query DB (these will only be those who match by location)
    var maxMatchesShown = 9;
//user remote only:
    if user is remote:
    if remoteUsers.length < maxMatchesShown, add inPersonUsers if available 
    
    else results = remoteUsers;
//user in person only:
    if user is in person:
    if inPersonUsers.length < maxMatchesShown, add remoteUsers if available

    else results = inPersonUsers;

//user both remote and in person:
    if user both remote and in person:
    TODO:

*/
