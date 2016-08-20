/*
 * team object
 */

function createTeam(dom) {
    'use strict';
    let score = 0;
    let errors = 0;

    const setName = function (name) {
        dom.name.html(name);
        const fontSize = Math.min(1.5 * 16 / (name.length + 8), 1.7) + 'em';
        dom.name.css('font-size', fontSize);
    };

    const setBackground = function (color) {
        dom.score.css('background-color', color);
    };

    const setBorder = function (color) {
        dom.score.css('border', '4px solid' + color);
        dom.score.css('color', color);
    };

    const scoreUp = function () {
        score += 1;
        dom.score.html(score);
    };

    const scoreLow = function () {
        score -= 1;
        dom.score.html(score);
    };

    const errorUp = function () {
        errors += 1;
        dom.error_circles.slice(0, errors).addClass('error');
    };

    const errorDown = function () {
        errors -= 1;
        dom.error_circles[errors % 3].classList.remove('error');
    };

    return {
        dom,
        setName,
        setBackground,
        setBorder,
        scoreUp,
        scoreLow,
        errorUp,
        errorDown
    };
}
