/**
 * Main functions and variables
 */

$(document).ready(function () {
  $('#toggle_client').click(function() {
    $('#client_controls').slideDown();
    $('#jumbotron').slideUp();
    $("#wrapper").toggleClass("active");
    master_init();
  });
});
