/**
 * team object
 *
 * Controls Team display in both windows
 *
 * spec {
 *  dom {name, score, error_circles, background, border},
 *  client_dom{name, score, error_circles}
 * }
 */

function createTeam(spec) {
    'use strict';
    let score = 0;
    let errors = 0;

    const {dom, client_dom} = spec;

    const setName = function (name) {
        client_dom.name.html(name);
        const fontSize = Math.min(1.5 * 16 / (name.length + 8), 1.7) + 'em';
        client_dom.name.css('font-size', fontSize);
    };

    const setBackground = function (color) {
        client_dom.score.css('background-color', color);
    };

    const setBorder = function (color) {
        client_dom.score.css('border', '4px solid' + color);
    };

    const update = function () {
        setName(dom.name.val());
        setBackground(dom.background.val());
        setBorder(dom.border.val());
        dom.score.val(score);
    };

    const scoreUp = function () {
        score += 1;
        dom.score.val(score);
        client_dom.score.html(score);
    };

    const scoreLow = function () {
        score -= 1;
        dom.score.val(score);
        client_dom.score.html(score);
    };

    const errorUp = function () {
        if (errors <= 3) {
            errors += 1;
        }
        client_dom.error_circles.slice(0, errors).addClass('error');
        dom.error_circles.slice(0, errors).addClass('error');
    };

    const errorDown = function () {
        if (errors > 0) {
            errors -= 1;
        }
        dom.error_circles.slice(errors).removeClass('error');
        client_dom.error_circles.slice(errors).removeClass('error');
    };

    const removeErrors = function () {
        errors = 0;
        dom.error_circles.removeClass('error');
        client_dom.error_circles.removeClass('error');
    };

    return {
        last_error_circle: client_dom.error_circles[2],
        update,
        scoreUp,
        scoreLow,
        errorUp,
        errorDown,
        removeErrors
    };
}
