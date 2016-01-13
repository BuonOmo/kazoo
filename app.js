var client_window;

$(document)
  .ready(function() {
    console.log('start');
    client_window = window.open();

    $.get('client.html',
      function(html) {
        client_window.document.write(html);
      }, 'html');

    // example of content update
    setInterval(function() {
      update('#team1_name');
    }, 100);
  });

function update(id) {
  $(client_window.document.body).find(id).html($(id).val());
}
