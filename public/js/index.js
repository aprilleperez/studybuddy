/////////////////////////////////////////////////////////////////
// PRE-DEFINED FUNCTIONS                                       //
/////////////////////////////////////////////////////////////////

function loginAction() {
  var userEmail = $("#userEmail").val().trim(); // grab user input for username
  var password = $("#password").val().trim(); // grab user input for password

  $.post("/api/login", {
    email: userEmail,
    password: password
  }).then(function (data) {
    window.location.replace(data);
    // If there's an error, log the error
  }).catch(function (err) {
    console.log(err);
  });
};

function handleLoginErr(err) {
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
};
let newUserId;
function createAccount() {
  // Capture values from form field
  var newFirstname = $("#createFirstname").val().trim(); // grab user input for first name
  var newLastname = $("#createLastname").val().trim(); // grab user input for last name
  var newUsername = $("#createUsername").val().trim(); // grab user input for username
  var newPassword = $("#createPassword").val().trim(); // grab user input for password
  var newEmail = $("#createEmail").val().trim(); // grab user input for password
  var newLocation = $("#createLocation").val().trim(); // grab user input for location
  var cloudPhoto = $("#cloudUrl").val().trim();//grab url from hidden value that was stored with cloudinary response url
  console.log("cloudUrl is this:", cloudPhoto);

  if (!cloudPhoto) {
    //stock photo for cloudPhoto
    cloudPhoto = "http://www.crmasiasolutions.com/files/images/cloud-software-450.jpg";
  }

  // store captured values into newUser object to send to DB
  var newUser = {
    username: newUsername,
    password: newPassword,
    email: newEmail,
    photo: cloudPhoto,
    first_name: newFirstname,
    last_name: newLastname,
    location: newLocation,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  $.post("/api/signup", newUser).then(function (data) {
    if (data != 200) {
      // log/show error
    }
    console.log('user creation data:', data);
    newUserId = data.id;
    // If there's an error, handle it by throwing up a bootstrap alert
  }).catch(handleLoginErr);
};

// function for creating the favorites for the puse and post
function createfavorites() {
  ;
  var newuserId = $("#createuserId").val().trim(); // grab user input for userId
  var newfavoriteId = $("#createfavoriteId").val().trim();

  var favorites = {
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: newuserId,
    favoriteId: newfavoriteId,
  }
  $.post("/api/favorites", favorites).then(function (data) {
    if (data != 200) {
      // log/show error
    }
    // If there's an error, handle it by throwing up a bootstrap alert
  }).catch(handleLoginErr);
}

/////////////////////////////////////////////////////////////////
// ON CLICK ACTIONS                                            //
/////////////////////////////////////////////////////////////////

// when user CLICKS ABOUT navlink
$("#about-link").click(function (event) {
  $("html,body").animate({
    scrollTop: $("#about").offset().top
  }, "slow");
});


// when user CLICKS LOGIN navlink
$("#login-button").click(function (event) {
  loginAction();
  $("#username").val("");
  $("#password").val("");
});


// when user CLICKS SIGN UP button
$(".signup-button").on("click", function () {
  // grabs users input and prevents clicking outside modal
  event.preventDefault();
  $('#modal1').modal({ backdrop: 'static', keyboard: false })
  // grabs user input
});


// when user CLICKS CREATE ACCOUNT button on modal 1
$("#createAccount-button").click(function (event) {
  // event.preventDefault();
  $('#modal2').modal({ backdrop: 'static', keyboard: false }) // can't click outside modal to close
  $('#modal1').modal('hide'); // hides first modal (to not overlap)
  createAccount();
  $("#createFirstname").val("");
  $("#createLastname").val("");
  $("#createUsername").val("");
  $("#createPassword").val("");
  $("#createEmail").val("");
  $("#createLocation").val("");
});


// when user CLICKS SUBMIT BUTTON on SURVEY modal 2
$("#submitButton").on("click", function () { // submit button on survey modal
  // grabs user input, prevents being able to click outside of modal, and hides modal one
  event.preventDefault();
  $('#modal2').modal({ backdrop: 'static', keyboard: false })
  $('#modal1').modal('hide');
  // grabs user input and converts to coorosponding variable
  var topicQuestion1 = $("#topicQuestion").val();
  var subQuestion1 = $("#subQuestion").val();
  var remoteQuestion1 = $("#remoteQuestion").val();
  if (remoteQuestion1 === 'Yes') {
    remoteQuestion1 = true;
  }
  else {
    remoteQuestion1 = false;
  }
  var inPerson1 = $("#inPerson").val();
  if (inPerson1 === 'Yes') {
    inPerson1 = true;
  }
  else {
    inPerson1 = false;
  }

  var timeQuestion1 = $("#timeQuestion").val();
  var daysOfWeek1 = [];
  // cycles through each check box and grabs the value if checked
  $.each($("input[name='daysOfWeek']:checked"), function () {
    daysOfWeek1.push($(this).val());
  });
  var usernameInput1 = $("#recipient-name").val();
  var passwordInput1 = $("#userPassword").val();
  var emailInput1 = $("#userEmail").val();
  var profilePictureInput1 = $("#userPictureInput").val();

  // store captured values into newSurvey object to send to DB
  var newSurvey = {
    studytopic: topicQuestion1.toLowerCase(),
    subtopic: subQuestion1.toLowerCase(),
    preftime: timeQuestion1.toLowerCase(),
    prefday: daysOfWeek1.map(str => str.toLowerCase()).join(", "),
    meetvirtual: remoteQuestion1,
    meetIP: inPerson1,
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: newUserId
  }

  $.post("/api/submitSurvey", newSurvey).then(function (data) {
    console.log(data);
    if (data != 200) {
      // log/show error
      console.log("this is the conlog", $(this))
    }
    // If there's an error, handle it by throwing up a bootstrap alert
  })

});

// TODO: The below options don't map to the seeded data (see seedSurvey.js)
// TODO: Look at line 199, we could map the values
// when TOPICS are TOGGLED
$(document).ready(function () {
  $("#topicQuestion").change(function () {

    if ($(this)[0].value === "Math") {
      $("#subQuestion").empty();
      $("#subQuestion").append("   <option>Algebra</option>")
      $("#subQuestion").append("   <option>Calculus</option>")
      $("#subQuestion").append("   <option>Geometry</option>")
      $("#subQuestion").append("   <option>Number Theory</option>")
      $("#subQuestion").append("   <option value='diffeq'>Differential Equations</option>")
    } else if ($(this)[0].value === "Science") {
      $("#subQuestion").empty();
      $("#subQuestion").append("   <option>Physics</option>")
      $("#subQuestion").append("   <option>Biology</option>")
      $("#subQuestion").append("   <option>Chemistry</option>")
      $("#subQuestion").append("   <option>Astronomy</option>")
      $("#subQuestion").append("   <option>Geology</option>")
      $("#subQuestion").append("   <option>Botany</option>")
    } else if ($(this)[0].value === "Law") {
      $("#subQuestion").empty();
      $("#subQuestion").append("   <option>Torts</option>")
      $("#subQuestion").append("   <option>Criminal Law</option>")
      $("#subQuestion").append("   <option>Constitutional Law</option>")
      $("#subQuestion").append("   <option>Real Property</option>")
      $("#subQuestion").append("   <option>Contracts</option>")
      $("#subQuestion").append("   <option>Wills and Trusts</option>")
      $("#subQuestion").append("   <option>Choice of Law</option>")
    } else if ($(this)[0].value === "Coding") {
      $("#subQuestion").empty();
      $("#subQuestion").append("   <option>Java</option>")
      $("#subQuestion").append("   <option>Javascript</option>")
      $("#subQuestion").append("   <option>C++</option>")
      $("#subQuestion").append("   <option>Ruby</option>")
      $("#subQuestion").append("   <option>Python</option>")
      $("#subQuestion").append("   <option>C Sharp</option>")
      $("#subQuestion").append("   <option>SQL</option>")
      $("#subQuestion").append("   <option>Perl</option>")
    } else if ($(this)[0].value === "English") {
      $("#subQuestion").empty();
      $("#subQuestion").append("   <option>Writing</option>")
      $("#subQuestion").append("   <option>Classics</option>")
      $("#subQuestion").append("   <option>Fantasy</option>")
      $("#subQuestion").append("   <option>Historical Fiction</option>")
      $("#subQuestion").append("   <option>Differential Equations</option>")
    } else if ($(this)[0].value === "Exercise Sciences") {
      $("#subQuestion").empty();
      $("#subQuestion").append("   <option>Kinesiology</option>")
      $("#subQuestion").append("   <option>Fitness Training</option>")
      $("#subQuestion").append("   <option>Coaching</option>")
      $("#subQuestion").append("   <option>Physical Therapy</option>")
      $("#subQuestion").append("   <option>Research</option>")
    } else if ($(this)[0].value === "Engineering") {
      $("#subQuestion").empty();
      $("#subQuestion").append("   <option>Mechanical</option>")
      $("#subQuestion").append("   <option>Electrical</option>")
      $("#subQuestion").append("   <option>Civil</option>")
      $("#subQuestion").append("   <option>Computer</option>")
    } else if ($(this)[0].value === "Business") {
      $("#subQuestion").empty();
      $("#subQuestion").append("   <option>Accounting</option>")
      $("#subQuestion").append("   <option>Entrepreneurship</option>")
      $("#subQuestion").append("   <option>Tax</option>")
      $("#subQuestion").append("   <option>Corporate Governance</option>")
      $("#subQuestion").append("   <option>Marketing</option>")
    }
  })
});


// when user CLICKS FAVORITE STAR button
$(".favoriteButton").click(function (event) { // when favorite button (class) is clicked
  $(this).removeClass("far fa-star");
  $(this).addClass("fas fa-star");
  console.log($(this).data("id"));
  $.ajax(
    "/api/updateFavorite", {
      type: "post",
      data: { id: $(this).data("id") } // targets specific button clicked with that ID
    }).then(function (data) {
   
    })
});



/////////////////////////////////////////////////////////////////
// CLOUDINARY THINGS                                           //
/////////////////////////////////////////////////////////////////
// creates widget w/ relative name/preset keys
var myWidget = cloudinary.createUploadWidget({
  cloudName: 'studybuddy123',
  uploadPreset: 'yrwer6bi'
}, (error, result) => {
  if (!error && result && result.event === "success") {
    // logs the results of sending image to cloudinary
    console.log('Done! Here is the image info: ', result.info.url);
    let pictureImage = result.info.url
    console.log(result.info.url)
    // updates hidden input with response url
    $("#cloudUrl").val(pictureImage)
  }
});
// opens widget when click upload button
document.getElementById("upload_widget").addEventListener("click", function () {
  myWidget.open();
}, false);




