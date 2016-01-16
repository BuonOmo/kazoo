var client_window;

var global_time; // in seconds
var timer_global_running = false;

var team1_score = 0;
var team2_score = 0;

var team1_errors = 0;
var team2_errors = 0;

$(document)
  .ready(function() {
    client_window = window.open();

    $.get('client.html',
      function(html) {
        client_window.document.write(html);
      }, 'html');

    $('#teams_name').click(function() {
      setTeams();
    });

    $('#team1_score_up').click(function() {
      scoreUp(1);
    });

    $('#team2_score_up').click(function() {
      scoreUp(2);
    });

    $('#team1_error').click(function() {
      gameError(1);
    });

    $('#team2_error').click(function() {
      gameError(2);
    });

    $('#timer_global_set').click(function() {
      setGlobalTimer();
    });

    $('#timer_global_start').click(function() {
      startGlobalTimer();
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

function scoreUp(team_number) {
  $(client_window.document.body)
    .find('#team' + team_number + '_score')
    .html((team_number == 1) ? ++team1_score : ++team2_score);
}

function gameError(team_number) {

  if (team_number == 1) {
    if (++team1_errors >= 3) {
      scoreUp(2);
      team1_errors = 0;
      $(client_window.document.body)
        .find('#team1_errors .circle')
        .removeClass('error')
    }
    $(client_window.document.body)
      .find('#team1_errors .circle')
      .slice(0, team1_errors)
      .addClass('error');
  } else {
    if (++team2_errors >= 3) {
      scoreUp(1);
      team2_errors = 0;
      $(client_window.document.body)
        .find('#team2_errors .circle')
        .removeClass('error')
    }
    $(client_window.document.body)
      .find('#team2_errors .circle')
      .slice(0, team2_errors)
      .addClass('error');
  }
}

function setGlobalTimer() {
  global_time = $('#timer_global').val();
  $(client_window.document.body)
    .find('#timer_global')
    .html(convertTime(global_time));
}

function startGlobalTimer() {
  if (!timer_global_running) {
    var timer_interval = setInterval(function() {
      timer_global_running = true;
      $(client_window.document.body)
        .find('#timer_global')
        .html(convertTime(--global_time));
      if (global_time <= 0) {
        clearInterval(timer_interval);
        timer_global_running = false;
      }
    }, 1000);
  }
}

function convertTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ':' + seconds;
}
