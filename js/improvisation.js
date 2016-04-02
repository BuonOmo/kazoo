/*
 * impro object
 */

function Impro(dom_category, dom_number_of_players, dom_theme) {

    this.dom_category = dom_category;
    this.dom_number_of_players = dom_number_of_players;
    this.dom_theme = dom_theme;

    this.setCategory = function(category) {
        this.dom_category.html(category);
    };

    this.setNumberOfPlayers = function(number_of_players) {
        this.dom_number_of_players.html(number_of_players);
    };

    this.setTheme = function(theme) {
        this.dom_theme.html(theme);
    };
}
