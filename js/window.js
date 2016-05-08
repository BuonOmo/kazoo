/**
 * client window functions
 */

var client_window;

var global_time; // in seconds
var timer_global_running = false;
var global_timer_interval;
var current_time;
var timer_current_running = false;
var current_timer_interval;
var cocus_time;
var timer_cocus_running = false;
var cocus_timer_interval;
var team1, team2;
var collection;

function master_add_impro_list()
{
    var impro_list = document.getElementById('impro_list');

    // clear former content, to avoid reloading the app
    impro_list.innerHTML = "";
    var newOption;
    for (var i in collection) {
        newOption = document.createElement('option');
        newOption.value = collection[i].theme;
        impro_list.appendChild(newOption);
    }
}

function master_init() {
  client_window = window.open();


  // retrieves collection of improvisation from a json file
  $('#collection_input').change( function (event) {
    var tmppath = URL.createObjectURL(event.target.files[0]);

    $.getJSON(tmppath, function(data) {
        collection = data;
        master_add_impro_list();
    });
  })

  $.get('client.html', function (html) {
      client_window.document.write(html);
      client_init(client_window);
  }, 'html');

  $('#teams_name').click(function () {
    team1.setName($('#team1_name').val());
    team2.setName($('#team2_name').val());
  });

  $('#team1_score_low').click(function () {
    team1.scoreLow();
    $('#team1_score').val(team1.score);
  });

  $('#team1_score_up').click(function () {
    team1.scoreUp();
    $('#team1_score').val(team1.score);
  });

  $('#team2_score_low').click(function () {
    team2.scoreLow();
    $('#team2_score').val(team2.score);
  });

  $('#team2_score_up').click(function () {
    team2.scoreUp();
    $('#team2_score').val(team2.score);
  });

  $('#team1_error_up').click(function () {
    $('#team1_errors').children()[team1.errors%3+1].firstChild.classList.add('error');
    team1.error();
  });

  $("#team1_error_down").click(function () {
    $('#team1_errors').children()[(team1.errors-1)%3 + 1].firstChild.classList.remove("error");
    team1.removeError();
  });

  /**
   * reset on last error.
   */
  $("#team1_errors>div>.circle:last").on('animationend', function (){
      $('#team1_errors>div>.error').removeClass('error');
  })

  $('#team2_error_up').click(function () {
    $('#team2_errors').children()[team2.errors%3+1].firstChild.classList.add('error');
    team2.error();
  });

  $("#team2_error_down").click(function () {
    $('#team2_errors').children()[(team2.errors-1)%3 + 1].firstChild.classList.remove("error");
    team2.removeError();
  });

  /**
   * reset on last error.
   */
  $("#team2_errors>div>.circle:last").on('animationend', function (){
      $('#team2_errors>div>.error').removeClass('error');
  })

  $('#impro_name').click(function () {
      impro.setTheme($('#theme_title').val());
      impro.setCategory($('#category').val());
      impro.setType($('#impro_type').val());
      impro.setNumberOfPlayers($('#number_of_players').val());
  });

  $('#confirm_impro_from_list').click(function () {
      var theme = document.getElementById('select_impro').value;
      console.log(theme);
      var i;
      for (i = 0; i < collection.length; i++) {
          if (collection[i].theme == theme)
          {
              break;
          }
      }
      impro.setTheme          (collection[i].theme);
      impro.setCategory       (collection[i].category);
      impro.setType           (collection[i].impro_type);
      impro.setNumberOfPlayers(collection[i].number_of_players);
      setCurrentTimer         (collection[i].duration);
      document.getElementById('number_of_players').value = collection[i].number_of_players;
      document.getElementById('theme_title').value       = collection[i].theme;
      document.getElementById('category').value          = collection[i].category;
      document.getElementById('impro_type').value        = collection[i].impro_type;
  });

  $('#timer_global_set').click(setGlobalTimer);

  $('#timer_global_start').click(function () {
      if (timer_global_running)
          stopGlobalTimer();
      else
          startGlobalTimer();
  });

  $('#timer_current_set').click(setCurrentTimer);

  $('#timer_current_start').click(function () {
      if (timer_current_running)
          stopCurrentTimer();
      else
          startCurrentlTimer();
  });

  $('#navbar_timer_button').click(toggleCocusTimer);

  $('#width_slider').change(function () {
      $(client_window.document.body).find('#content').css('width', $(this).val() + 'vw');
  });
  $('#height_slider').change(function () {
      $(client_window.document.body).find('#content').css('height', $(this).val() + 'vh');
  });
}

function client_init() {

  team1 = new Team(
          $(client_window.document.body).find('#team1_name'),
          $(client_window.document.body).find('#team1_score'),
          $(client_window.document.body).find('#team1_errors .circle')
          );
  team2 = new Team(
          $(client_window.document.body).find('#team2_name'),
          $(client_window.document.body).find('#team2_score'),
          $(client_window.document.body).find('#team2_errors .circle')
          );

  impro = new Impro(
          $(client_window.document.body).find('#category'),
          $(client_window.document.body).find('#number_of_players'),
          $(client_window.document.body).find('#theme_title'),
          $(client_window.document.body).find('#impro_type')

          );

  team1.dom_error_circles.slice(-1).on('animationend', function () {
    team1.dom_error_circles.removeClass('error');
    team1.errors = 0;
    team2.scoreUp();
    $('#team2_score').html(team2.score);
  });

  team2.dom_error_circles.slice(-1).on('animationend', function () {
    team2.dom_error_circles.removeClass('error');
    team2.errors = 0;
    team1.scoreUp();
    $('#team1_score').html(team1.score);
  });
}

function setGlobalTimer() {
    var h = parseInt($('#timer_global_h').val())
    var m = parseInt($('#timer_global_m').val())
    var s = parseInt($('#timer_global_s').val())
    global_time = h*3600 + m*60 + s;
    $(client_window.document.body)
            .find('#timer_global')
            .html(convertTime(global_time));
}

function startGlobalTimer() {
  global_timer_interval = setInterval(function () {
    timer_global_running = true;
    $(client_window.document.body)
            .find('#timer_global')
            .html(convertTime(--global_time));
    if (global_time <= 0) {
        stopGlobalTimer();
    }
  }, 1000);
}

function stopGlobalTimer() {
  clearInterval(global_timer_interval);
  timer_global_running = false;
}

function setCurrentTimer() {
   var m = parseInt($('#timer_current_m').val())
   var s = parseInt($('#timer_current_s').val())
   current_time = m*60 + s;
   console.log(m, s, current_time)
   $(client_window.document.body)
      .find('#timer_current')
      .html(convertTime(current_time));
}

function startCurrentTimer() {
  current_timer_interval = setInterval(function () {
    timer_current_running = true;
    $(client_window.document.body)
            .find('#timer_current')
            .html(convertTime(--current_time));
    if (current_time <= 0) {
        stopCurrentTimer();
    }
  }, 1000);
}

function stopCurrentTimer() {
  clearInterval(current_timer_interval);
  timer_current_running = false;
}

function resetCocusTimer() {
  cocus_time = 20;
  $('#navbar_timer_value').html(cocus_time);
  startCocusTimer();
}

function startCocusTimer() {

  cocus_timer_interval = setInterval(function () {
    timer_cocus_running = true;
    $('#navbar_timer_value').html(--cocus_time);
    if (cocus_time <= 0) {
        stopCocusTimer();
    }
  }, 1000);
}
function toggleCocusTimer() {
  timer_cocus_running ? stopCocusTimer() : resetCocusTimer();
}

function stopCocusTimer() {
  clearInterval(cocus_timer_interval);
  timer_cocus_running = false;
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
