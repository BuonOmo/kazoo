/**
 * client window functions
 */

var client_window;

var global_time; // in seconds
var timer_global_running = false;
var timer_interval;

var team1_score = 0;
var team2_score = 0;

var team1_errors = 0;
var team2_errors = 0;

function master_init() {
    client_window = window.open();    

    $.get('client.html', function (html) {
                client_window.document.write(html);
                client_init(client_window);
            }, 'html');

    $('#teams_name').click(function () {
        setTeams();
    });

    $('#team1_score_up').click(function () {
        scoreUp(1);
    });

    $('#team2_score_up').click(function () {
        scoreUp(2);
    });

    $('#team1_error').click(function () {
        gameError(1);
    });

    $('#team2_error').click(function () {
        gameError(2);
    });

    $('#timer_global_set').click(setGlobalTimer);

    $('#timer_global_start')
            .click(function () {
                if (timer_global_running)
                    stopGlobalTimer();
                else
                    startGlobalTimer();
            });
    $('#width_slider').change(function () {
        setWidth($(this).val());
    });
    $('#height_slider').change(function () {
        setHeight($(this).val());
    });
}

function client_init() {
    client_window = $(client_window.document.body);
    
    /*
     client_window.find('#team2_errors .circle:last').on('animationstart', function () {
     client_window.find('#team2_errors .circle').slice(0,2).removeclass('error').addclass('error');
     });
     */

    client_window.find('#team2_errors .circle:last').on('animationend', function () {
        client_window.find('#team2_errors .circle').removeClass('error');
        scoreUp(1);
        team2_errors = 0;
    });

    client_window.find('#team1_errors .circle:last').on('animationend', function () {
        client_window.find('#team1_errors .circle').removeClass('error');
        scoreUp(2);
        team1_errors = 0;
    });
}

function setTeams() {
    client_window
            .find('#team1_name')
            .html($('#team1_name').val());
    client_window
            .find('#team2_name')
            .html($('#team2_name').val());
}

function scoreUp(team_number) {
    client_window.find('#team' + team_number + '_score').html((team_number === 1) ? ++team1_score : ++team2_score);
}

function gameError(team_number) {

    if (team_number === 1) {
        team1_errors++;
        $('#team1_errors').text(team1_errors);

        client_window.find('#team1_errors .circle').slice(0, team1_errors).addClass('error');
    } else {
        team2_errors++;
        $('#team2_errors').text(team2_errors);
        client_window
                .find('#team2_errors .circle')
                .slice(0, team2_errors)
                .addClass('error');
    }
}

function setGlobalTimer() {
    global_time = $('#timer_global').val();
    client_window
            .find('#timer_global')
            .html(convertTime(global_time));
}

function startGlobalTimer() {

    timer_interval = setInterval(function () {
        timer_global_running = true;
        client_window
                .find('#timer_global')
                .html(convertTime(--global_time));
        if (global_time <= 0) {
            stopGlobalTimer();
        }
    }, 1000);
}

function stopGlobalTimer() {
    clearInterval(timer_interval);
    timer_global_running = false;
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

function setWidth(width) {
    client_window
            .find('#content')
            .css('width', width + 'vw');
}

function setHeight(height) {
    client_window
            .find('#content')
            .css('height', height + 'vh');
}