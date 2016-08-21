/*
 * team object
 */

function createTeam(spec) {
    'use strict';
    let score = 0;
    let errors = 0;

    const setName = function (name) {
        spec.client_dom.name.html(name);
        const fontSize = Math.min(1.5 * 16 / (name.length + 8), 1.7) + 'em';
        spec.dom.name.css('font-size', fontSize);
    };

    const setBackground = function (color) {
        spec.client_dom.score.css('background-color', color);
    };

    const setBorder = function (color) {
        spec.client_dom.score.css('border', '4px solid' + color);
        spec.dom.score.css('color', color);
    };

    const update = function () {
        setName(spec.dom.name.val());
        setBackground(spec.dom.background.val());
        setBorder(spec.dom.border.val());
    };

    const scoreUp = function () {
        score += 1;
        spec.dom.score.val(score);
        spec.client_dom.score.html(score);
    };

    const scoreLow = function () {
        score -= 1;
        spec.dom.score.val(score);
        spec.client_dom.score.html(score);
    };

    const errorUp = function () {
        if (errors <= 3) {
            errors += 1;
        }
        spec.client_dom.error_circles.slice(0, errors).addClass('error');
        spec.dom.error_circles.slice(0, errors).addClass('error');
    };

    const errorDown = function () {
        if (errors > 0) {
            errors -= 1;
        }
        spec.dom.error_circles.slice(errors).removeClass('error');
        spec.client_dom.error_circles.slice(errors).removeClass('error');
    };

    const removeErrors = function () {
        errors = 0;
        spec.dom.error_circles.removeClass('error');
        spec.client_dom.error_circles.removeClass('error');
    };

    return {
        last_error_circle: spec.client_dom.error_circles[2],
        update,
        scoreUp,
        scoreLow,
        errorUp,
        errorDown,
        removeErrors
    };
}
