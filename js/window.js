/**
 * client window functions
 */

var client_window;

var global_time; // in seconds
var timer_global_running = false;
var global_timer_interval;
var current_timer_interval;
var current_time;
var timer_current_running = false;

var team1, team2;

function master_init() {
    client_window = window.open();

    $.get('client.html', function (html) {
        client_window.document.write(html);
        client_init(client_window);
    }, 'html');

    $('#teams_name').click(function () {
        team1.setName($('#team1_name').val());
        team2.setName($('#team2_name').val());
    });

    $('#team1_score_up').click(function () {
        team1.scoreUp();
    });

    $('#team2_score_up').click(function () {
        team2.scoreUp();
    });

    $('#team1_error').click(function () {
        team1.error();
    });

    $('#team2_error').click(function () {
        team2.error();
    });

    $('#impro_name').click(function () {
        impro.setTheme($('#theme_title').val());
        impro.setCategory($('#category').val());
        impro.setType($('#impro_type').val());
        impro.setNumberOfPlayers($('#number_of_players').val());
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

    $('#width_slider').change(function () {
        $(client_window.document.body).find('#content').css('width', $(this).val() + 'vw');
    });
    $('#height_slider').change(function () {
        $(client_window.document.body).find('#content').css('height', $(this).val() + 'vh');
    });
}

function client_init() {

    /*
     client_window.find('#team2_errors .circle:last').on('animationstart', function () {
     client_window.find('#team2_errors .circle').slice(0,2).removeclass('error').addclass('error');
     });
     */

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
    });

    team2.dom_error_circles.slice(-1).on('animationend', function () {
        team2.dom_error_circles.removeClass('error');
        team2.errors = 0;
        team1.scoreUp();
    });
}

function setGlobalTimer() {
    global_time = $('#timer_global').val();
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
    current_time = $('#timer_current').val();
    $(client_window.document.body)
            .find('#timer_current')
            .html(convertTime(--current_time));
}

function startCurrentTimer() {

    current_timer_interval = setInterval(function () {
        timer_current_running = true;
        $(client_window.document.body)
                .find('#timer_current')
                .html(convertTime(--current_time));
        if (current_time <= 0) {
            stopcurrentTimer();
        }
    }, 1000);
}

function stopCurrentTimer() {
    clearInterval(current_timer_interval);
    timer_current_running = false;
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
