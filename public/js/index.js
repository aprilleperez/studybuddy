function loginAction() {
  // NEED THESE VARS TO PASS THROUGH AUTHENTICATION
  username = $("#username").val().trim(); // grab user input for username
  password = $("#password").val().trim(); // grab user input for password
  alert(username + password);

};

function createAccount() {
  // NEED THESE VARS TO STORE INTO DB
  // Capture values from form field
  newUsername = $("#createUsername").val().trim(); // grab user input for username
  newPassword = $("#createPassword").val().trim(); // grab user input for password
  newEmail = $("#createEmail").val().trim(); // grab user input for password

  // store captured values into newUser object NEED TO FIX
  // newUser = {
  //   username: newUsername,
  //   password: newPassword,
  //   email: newEmail,
  //   photo: example-photo
  // }
};

////////////////////////////////////////////
// ON CLICK ACTIONS                       //
////////////////////////////////////////////

// when user CLICKS LOGIN button
$("#login-button").click(function (event) {
  loginAction();
  $("#username").val("");
  $("#password").val("");
});

// when user CLICKS CREATE ACCOUNT button
$("#createAccount-button").click(function (event) {
  // event.preventDefault();
  $('#modal2').modal({ backdrop: 'static', keyboard: false })
  $('#modal1').modal('hide');
  createAccount();
  $("#createUsername").val("");
  $("#createPassword").val("");
  $("#createEmail").val("");
});

// var favorited = false;

$("#favorite").click(function (event) {
  // alert("this was clicked");
  // $("#favorite").toggleClass("change_me fas fa-star");
  // favorited = true;
  $("#favorite").removeClass("far fa-star");
  $("#favorite").addClass("fas fa-star");
});




// $(".createAccount-button").on("click", function () {
//   event.preventDefault();
//   $('#modal2').modal({ backdrop: 'static', keyboard: false })
//   $('#modal1').modal('hide');
// });


$(".signup-button").on("click", function () {
  // grabs users input and prevents clicking outside modal
  event.preventDefault();
  $('#modal1').modal({ backdrop: 'static', keyboard: false })
  // grabs user input

});



$("#submitButton").on("click", function () {
  // grabs user input, prevents being able to click outside of modal, and hides modal one
  event.preventDefault();
  $('#modal2').modal({ backdrop: 'static', keyboard: false })
  $('#modal1').modal('hide');
  // grabs user input and converts to corrosponding variable
  var topicQuestion1 = $("#topicQuestion").val();
  var subQuestion1 = $("#subQuestion").val();
  var remoteQuestion1 = $("#remoteQuestion").val();
  var inPerson1 = $("#inPerson").val();
  var zipCode1 = $("#zipCode").val();
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

  console.log(topicQuestion1)
  console.log(subQuestion1)
  console.log(remoteQuestion1)
  console.log(inPerson1)
  console.log(zipCode1)
  console.log(timeQuestion1)
  console.log(daysOfWeek1)
  console.log(usernameInput1)
  console.log(passwordInput1)
  console.log(emailInput1)
  console.log(profilePictureInput1)

});

$(document).ready(function () {
  $("#topicQuestion").change(function () {

    if ($(this)[0].value === "Math") {
      $("#subQuestion").empty();
      $("#subQuestion").append("   <option>Algebra</option>")
      $("#subQuestion").append("   <option>Calculus</option>")
      $("#subQuestion").append("   <option>Geometry</option>")
      $("#subQuestion").append("   <option>Number Theory</option>")
      $("#subQuestion").append("   <option>Differential Equations</option>")
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

})

var myWidget = cloudinary.createUploadWidget({
  cloudName: 'studdybudy',
  uploadPreset: 'pwzfgaip'
}, (error, result) => {
  if (!error && result && result.event === "success") {
    console.log('Done! Here is the image info: ', result.info);
  }
}
)

document.getElementById("upload_widget").addEventListener("click", function () {
  myWidget.open();
}, false);










// when user CLICKS ABOUT navlink  --> NEED TO FIX SCROLL FX
$("#about-link").click(function (event) {
  $("html,body").animate({ // animate page to scroll to about section
    scrollTop: $("#about").offset().top
  }, "slow");
});













// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
