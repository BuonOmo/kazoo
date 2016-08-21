/**
 * Controls Team display in both windows
 * spec {
 *  dom {theme, category, type, players},
 *  client_dom {theme, category, type, players}
 * }
 */

function createImpro(spec) {
    'use strict';
    const {dom, client_dom} = spec;

    const setCategory = function (category) {
        client_dom.category.html(category);
    };

    const setPlayers = function (number_of_players) {
        client_dom.players.html(number_of_players);
    };

    const setTheme = function (theme) {
        const more = 18;
        const fontSize = Math.min(2, (2 * (18 + more) / (theme.length + more)));
        // 18 caractères
        client_dom.theme.css('font-size', fontSize + 'em');
        client_dom.theme.html(theme);
        return fontSize;
    };

    const setType = function (type) {
        client_dom.type.html(type);
    };

    const update = function () {
        setType(dom.type.val());
        const font_size = setTheme(dom.theme.val());
        setCategory(dom.category.val());
        setPlayers(dom.players.val());
        $('#font_size').val(font_size.toFixed(1));
        // document.getElementById('font_size').value = Math.round(10*impro.setTheme($('#theme_title').val()))/10 ;
        setCurrentTimer();
    };

    const reset = function () {
        dom.theme.val('');
        dom.category.val('');
        dom.type.val('');
        dom.players.val('');
        update();
    };

    return {
        update,
        reset
    };
}
