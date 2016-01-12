var client_window;

$(document)
  .ready(function() {
    console.log('start');
    client_window = window.open();

    $.get('client.html', function(html) {
      console.log(html);
      client_window.document.write(html);
    }, 'html');

    setInterval(update, 100);
  });

function update() {
  $(client_window.document.body).find('.timer').html($('.timer .edit').val());
  $(client_window.document.body)
    .find('.team1 .name')
    .html($('.team1 .name .edit').val());
  $(client_window.document.body)
    .find('.team1 .score')
    .html($('.team1 .score .edit').val());
  $(client_window.document.body)
    .find('.team2 .name')
    .html($('.team2 .name .edit').val());
  $(client_window.document.body)
    .find('.team2 .score')
    .html($('.team2 .score .edit').val());
}
