/*
 * impro object
 */

function Impro(dom_category, dom_number_of_players, dom_theme, dom_type) {

    this.dom_category = dom_category;
    this.dom_number_of_players = dom_number_of_players;
    this.dom_theme = dom_theme;
    this.dom_type = dom_type;

    this.setCategory = function(category) {
        this.dom_category.html(category);
    };

    this.setNumberOfPlayers = function(number_of_players) {
        this.dom_number_of_players.html(number_of_players);
    };

    this.setTheme = function(theme) {
        this.dom_theme.html(theme);
    };

    this.setType = function(type) {
        this.dom_type.html(type);
    };
}
