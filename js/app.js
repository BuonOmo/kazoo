/**
 * Main functions and variables
 */

$(document).ready(function () {
    $('#toggle_client').click(function() {
       $('#client_controls').slideDown();
       $(this).slideUp();
       master_init();
    });
});
