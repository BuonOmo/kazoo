/*
 * impro object
 */

class Impro {

    constructor (dom_category, dom_number_of_players, dom_theme, dom_type) {
        this.dom_category = dom_category;
        this.dom_number_of_players = dom_number_of_players;
        this.dom_theme = dom_theme;
        this.dom_type = dom_type;
    }

    setCategory (category) {
        this.dom_category.html(category);
    };

    setNumberOfPlayers (number_of_players) {
        this.dom_number_of_players.html(number_of_players);
    };

    setTheme (theme) {
        const more = 18,
            fontSize = (2 * (18 + more) / (theme.length + more)), // 18 caractères
            fontSize_em = (fontSize > 2) ? "2em" : fontSize + "em";
        this.dom_theme.css('font-size', fontSize_em);
        this.dom_theme.html(theme);
        return fontSize;
    };

    setType (type) {
        this.dom_type.html(type);
    };
}

