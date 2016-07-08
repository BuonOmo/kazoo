/*
 * team object
 */

class Team {

    constructor (dom_name, dom_score, dom_error_circles) {
        this.score = 0;
        this.errors = 0;

        this.dom_name = dom_name;
        this.dom_score = dom_score;
        this.dom_error_circles = dom_error_circles;
    }

    setName (name) {
        this.dom_name.html(name);
        let fontSize = (1.5 * 16 / (name.length + 8));
        fontSize = (fontSize > 1.7) ? "1.7em" : fontSize + "em";
        this.dom_name.css('font-size', fontSize);
    };

    setBackground (color) {
      this.dom_score.css('background-color',color);
    }

    setBorder (color) {
      this.dom_score.css('border','4px solid'+color);
      this.dom_score.css('color',color);
    }

    scoreUp () {
        this.dom_score.html(++this.score);
    };

    scoreLow () {
        this.dom_score.html(--this.score);
    };

    setScore (score) {
        this.dom_score.html(score);
        this.score = score;
    };

    error () {
        this.dom_error_circles.slice(0, ++this.errors).addClass('error');
    };

    removeError () {
      this.errors--;
      this.dom_error_circles[this.errors%3].classList.remove('error');
    }
}
