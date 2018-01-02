/**
 * client window functions
 */

var client_window;

var global_time = 90 * 60; // in seconds
var timer_global_running = false;
var global_timer_interval;
var current_time = 5 * 60;
var timer_current_running = false;
var current_timer_interval;
var cocus_time;
var timer_cocus_running = false;
var cocus_timer_interval;
var team1, team2;
var collection;
var preview_interval;
var teams; // set of all teams and colors
var impro;


function master_add_impro_list() {
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

    // Ask confirm before leaving the page
    $(window).bind('beforeunload', function () {
        return 'Cette fermeture engendrera aussi celle de la fenêtre de score';
    });

    $(window).bind('unload', function () {
        client_window.close()
    })

    // retrieves collection of improvisation from a json file
    $('#collection_input').change(function (event) {
        var tmppath = URL.createObjectURL(event.target.files[0]);

        $.getJSON(tmppath, function (data) {
            collection = data;
            master_add_impro_list();
        });
    });

    $.ajax({
        url: 'client.html',
        success: function (html) {
            client_window.document.write(html);
            client_init(client_window);
        },
        async: false
    });

    $.getJSON('data/teams.json', function (data) {
        teams = data;
        Object.keys(teams).forEach((team) => {
            $('#team_name_list').append('<option value="' + team + '">');
        });
    });

    $('#team1_name').change(function () {
        $('#team1_color_bg').val(teams[this.value].background);
        $('#team1_color_border').val(teams[this.value].border);
    });

    $('#team2_name').change(function () {
        $('#team2_color_bg').val(teams[this.value].background);
        $('#team2_color_border').val(teams[this.value].border);
    });

    $('#teams_confirm').click(function () {
        team1.update();
        team2.update();
    });
    /*
     $('#teams_mirror').click(function () {
     var mirror = true;
     return function(e) {
     if (mirror) {
     $('#team1').insertAfter('#team2');
     } else {
     $('#team2').insertAfter('#team1');
     }
     mirror = !mirror;
     };
     }());*/

    $('#team1_score_low').click(team1.scoreLow);

    $('#team1_score_up').click(team1.scoreUp);

    $('#team2_score_low').click(team2.scoreLow);

    $('#team2_score_up').click(team2.scoreUp);

    $('#team1_error_up').click(team1.errorUp);

    $('#team1_error_down').click(team1.errorDown);

    $('#team2_error_up').click(team2.errorUp);

    $('#team2_error_down').click(team2.errorDown);

    $('#impro_reset').click(impro.reset);

    $('#impro_name').click(impro.update);

    $('#confirm_impro_from_list').click(function () {
        const theme = document.getElementById('select_impro').value;
        const saved_impro = collection.find((imp) => imp.theme === theme);
        if (saved_impro) {
            $('#number_of_players').val(saved_impro.number_of_players);
            $('#theme_title').val(saved_impro.theme);
            $('#category').val(saved_impro.category);
            $('#impro_type').val(saved_impro.impro_type);
            impro.update();
            $('#timer_current_m').val(Math.floor(saved_impro.duration / 60));
            $('#timer_current_s').val(saved_impro.duration % 60);
            setCurrentTimer(saved_impro.duration);
            //$('#timer_current_show').html("Durée — "+convertTime(current_time,false));
        }
    });

    $('#timer_global_set').click(setGlobalTimer);

    $('.timer_global_start').click(function () {
        if (timer_global_running)
            stopGlobalTimer();
        else if (global_time > 0)
            startGlobalTimer();
    });

    $('#timer_current_toggle').click(function () {
        if (timer_current_running) {
            stopCurrentTimer();
            $(this).html("Lancer");
        } else {
            if (current_time > 0) {
                if (!timer_global_running)
                    $('#timer_alert').slideDown();
                startCurrentTimer();
                $(this).html("Pause");
            }
        }
    });

    $('#navbar_timer_button').click(toggleCocusTimer);

    $('#width_slider').change(function () {
        $(client_window.document.body).find('#content').css('width', $(this).val() + 'vw');
    });
    $('#height_slider').change(function () {
        $(client_window.document.body).find('#content').css('height', $(this).val() + 'vh');
    });
    $('#set_mirror_mode').click(function () {
        var order = this.checked ? 3 : 1;
        $(client_window.document.body).find('#team1').css('order', order);
        $(client_window.document.body).find('#team2').css('order', 3 - order);
    });
    $('#toggle_preview').click(function () {
        if (this.checked) {
            preview_interval = setInterval(function () {
                html2canvas(client_window.document.body, {
                    onrendered: function (canvas) {
                        /*canvas.height = (3/4) * $('#sidebar-wrapper').width()*/
                        ;
                        var oldCanvas = canvas.toDataURL("image/png");
                        var img = new Image();
                        img.src = oldCanvas;
                        // img.style.width = $('#sidebar-wrapper').width();
                        img.onload = function () {
                            canvas.getContext('2d').drawImage(img, 0, 0);
                            $('#preview').html(img);
                        }
                    }
                });
            }, 1000);
        } else {
            clearInterval(preview_interval);
            $('#preview').html("Cochez la prévisualisation dans les paramètres");
        }
    });

    $("#toggle_sidebar").click(function () {
        $("#wrapper").toggleClass("active");
    });

    $('#font_size').change(function () {
        console.log(this);
        console.log(this.value);
        impro.dom_theme.css('font-size', this.value + "em");
    })
}

function client_init() {
    const client_body = client_window.document.body;
    team1 = createTeam({
        client_dom: {
            name: $(client_body).find('#team1_name'),
            score: $(client_body).find('#team1_score'),
            error_circles: $(client_body).find('#team1_errors .circle')
        },
        dom: {
            name: $('#team1_name'),
            background: $('#team1_color_bg'),
            border: $('#team1_color_border'),
            score: $('#team1_score'),
            error_circles: $('#team1_errors').find('.circle')
        }
    });
    team2 = createTeam({
        client_dom: {
            name: $(client_body).find('#team2_name'),
            score: $(client_body).find('#team2_score'),
            error_circles: $(client_body).find('#team2_errors .circle')
        },
        dom: {
            name: $('#team2_name'),
            background: $('#team2_color_bg'),
            border: $('#team2_color_border'),
            score: $('#team2_score'),
            error_circles: $('#team2_errors').find('.circle')
        }
    });

    impro = createImpro({
        dom: {
            theme: $('#theme_title'),
            category: $('#category'),
            type: $('#impro_type'),
            players: $('#number_of_players')
        },
        client_dom: {
            category: $(client_body).find('#category'),
            players: $(client_body).find('#number_of_players'),
            theme: $(client_body).find('#theme_title'),
            type: $(client_body).find('#impro_type')
        }
    });

    $(team1.last_error_circle).on('animationend', function () {
        team1.removeErrors();
        team2.scoreUp();
    });

    $(team2.last_error_circle).on('animationend', function () {
        team2.removeErrors();
        team1.scoreUp();
    });
}

function setGlobalTimer() {
    var h = parseInt($('#timer_global_h').val())
    var m = parseInt($('#timer_global_m').val())
    var s = parseInt($('#timer_global_s').val())
    global_time = h * 3600 + m * 60 + s;
    $(client_window.document.body)
        .find('#timer_global')
        .html(convertTime(global_time));
    $('#timer_global_show').html("Timer global  — " + convertTime(global_time, false));
}

function startGlobalTimer() {
    global_timer_interval = setInterval(function () {
        timer_global_running = true;
        $(client_window.document.body)
            .find('#timer_global')
            .html(convertTime(--global_time));
        $('#timer_global_show').html("Timer global  — " + convertTime(global_time, false));
        if (global_time <= 0) {
            stopGlobalTimer();
        }
    }, 1000);
}

function stopGlobalTimer() {
    clearInterval(global_timer_interval);
    timer_global_running = false;
    if (global_time > 0) {
        $('#timer_global_show').html("Timer global  — " + convertTime(global_time, false));
    } else {
        $('#timer_global_show').html("Timer global");
    }
}

function setCurrentTimer(time) {
    if (typeof(time) === 'string') {
        $('#timer_current_m').val((time - time % 60) / 60);
        $('#timer_current_s').val(time % 60);
        current_time = time;
    } else {
        var m = parseInt($('#timer_current_m').val());
        var s = parseInt($('#timer_current_s').val());
        current_time = m * 60 + s;
    }
    $(client_window.document.body)
        .find('#timer_current')
        .html(convertTime(current_time));
    $('#timer_current_show').html("Durée — " + convertTime(current_time, false));
}

function startCurrentTimer() {
    current_timer_interval = setInterval(function () {
        // Only start current_timer if there is time left
        if (current_time > 0) {
            timer_current_running = true;
            $(client_window.document.body)
                .find('#timer_current')
                .html(convertTime(--current_time));
            $('#timer_current_show').html("Durée — " + convertTime(current_time, false));
        }

        // Once the current timer is over, stop it
        if (current_time <= 0) {
            stopCurrentTimer();
        }
    }, 1000);
}

function stopCurrentTimer() {
    clearInterval(current_timer_interval);
    if (current_time > 0) {
        $('#timer_current_show').html("Durée — " + convertTime(current_time, false));
    } else {
        $('#timer_current_show').html("Courant");
    }
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

function togglePreview() {
    preview_interval = setInterval(function () {
        $('#preview').html($(client_window.document.body).find('#content')[0]);
    }, 1000);
}

function convertTime(time, showZeros) {
    var zeros = (typeof(showZeros) === 'boolean') ? showZeros : true;
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor(time / 60) - 60 * hours;
    var seconds = time % 60;
    if (minutes < 10 && (zeros || hours)) {
        minutes = "0" + minutes;
    }
    if (seconds < 10 && (zeros || minutes || hours )) {
        seconds = "0" + seconds;
    }
    if (hours) {
        return hours + ':' + minutes + ':' + seconds;
    }
    if (zeros || minutes) {
        return minutes + ':' + seconds;
    }
    return seconds;
}
