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



// $(".country").on("click", function () {  // on click of gif image, make state switch

//   var state = $(this).attr("data-state"); // var storing image's current state

//   if (state === "still") { // if current state is set to still
//       var animate = $(this).attr("data-animate"); // var storing image's data-animate URL
//       $(this).attr("src", animate); // change image's src attr to its animate attr
//       $(this).attr("data-state", "animate"); // change image's current state to animate

//   } else { // else if current state is set to animate
//       var still = $(this).attr("data-still"); // var storing image's data-still URL
//       $(this).attr("src", still); // change image's src attr to its still attr
//       $(this).attr("data-state", "still"); // change image's current state to still
//   }
// });





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
