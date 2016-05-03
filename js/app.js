/**
 * Main functions and variables
 */
$(document).ready(function () {
    $('#toggle_client').click(function() {
       $('#client_controls').slideDown();
       document.getElementById('client_controls').removeAttribute('hidden');
       $('#jumbotron').slideUp();
       master_init();
    });
});
