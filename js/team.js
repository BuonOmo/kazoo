/*
 * team object
 */

function Team(dom_name, dom_score, dom_error_circles) {
    this.score = 0;
    this.errors = 0;

    this.dom_name = dom_name;
    this.dom_score = dom_score;
    this.dom_error_circles = dom_error_circles;

    this.setName = function(name) {
        this.dom_name.html(name);
        var fontSize = (1.5 * 16 / (name.length + 8));
        fontSize = (fontSize > 1.7) ? "1.7em" : fontSize + "em";
        this.dom_name.css('font-size', fontSize);
    };

    this.setBackground = function(color) {
      this.dom_score.css('background-color',color);
    }

    this.setBorder = function(color) {
      this.dom_score.css('border','4px solid'+color);
      this.dom_score.css('color',color);
    }

    this.scoreUp = function() {
        this.dom_score.html(++this.score);
    };

    this.scoreLow = function() {
        this.dom_score.html(--this.score);
    };

    this.setScore = function(score) {
        this.dom_score.html(score);
        this.score = score;
    };

    this.error = function() {
        this.dom_error_circles.slice(0, ++this.errors).addClass('error');
    };

    this.removeError = function() {
      this.errors--;
      this.dom_error_circles[this.errors%3].classList.remove('error');
    }
}
