/**
 * Main functions and variables
 */

 /******************************* Sidebar *******************************/
 /*Menu-toggle*/
 // TODO add a menu button
 $("#menu-toggle").click(function(e) {
     e.preventDefault();
     $("#wrapper").toggleClass("active");
 });


$(document).ready(function () {
  $('#toggle_client').click(function() {
    $('#client_controls').slideDown();
    $('#jumbotron').slideUp();
    $("#wrapper").toggleClass("active");
    master_init();
  });
});
