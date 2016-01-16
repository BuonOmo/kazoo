var client_window;

$(document)
  .ready(function() {
    console.log('start');
    client_window = window.open();

    $.get('client.html',
      function(html) {
        client_window.document.write(html);
      }, 'html');

    $('#teams button').click(function() {
      setTeams();
    });
  });

function setTeams() {
  $(client_window.document.body)
    .find('#team1_name')
    .html($('#team1_name').val());
  $(client_window.document.body)
    .find('#team2_name')
    .html($('#team2_name').val());
}

function udpateTimers() {}
